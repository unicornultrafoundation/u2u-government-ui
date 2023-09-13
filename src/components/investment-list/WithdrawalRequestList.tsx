import { useTranslation } from "react-i18next";
import { WithdrawParams, WithdrawalRequest } from "../../types";
import { bigFormatEther, dateToUTCString, exploreTransaction, millisecondToDay, nowTime, truncate } from "../../utils";
import { Button, buttonScale } from "../button";
import { Tbody, Td, Th, Thead } from "../table"
import { RenderNumberFormat } from "../text";
import { useFetchWithdrawRequest, useWidthdraw } from "../../hooks";
import { useCallback, useEffect, useState } from "react";
import { toastDanger, toastSuccess } from "../toast";
import { TableLimit } from "../../contants";
import { ChangePageParams, Pagination } from "../pagination";


interface Header {
  name: string;
  subName?: string
}

const headers: Header[] = [
  {
    name: "WrID"
  },
  {
    name: "Unbonded Amount",
    subName: "(U2U)"
  },
  {
    name: "Withdrawable",
  },
  {
    name: "Withdrawal Amount",
    subName: "(U2U)"
  },
  {
    name: "Withdrawal Tx",
    subName: "(U2U)"
  },
  {
    name: "Actions"
  }
]

interface WithdrawalRequestListProps {
  delegator: string
  valId: number
}

export const WithdrawalRequestList = ({
  delegator,
  valId
}: WithdrawalRequestListProps) => {
  const { t } = useTranslation()
  const [skip, setSkip] = useState(0)
  const { withdraw } = useWidthdraw()
  const { wr: withdrawalRequests } = useFetchWithdrawRequest(delegator, valId, skip)

  const [clientRecords, setClientRecord] = useState<WithdrawalRequest[]>([])

  const onChangePage = async (params: ChangePageParams) => {
    let _skip = params.page ? params.page - 1 : 0
    setSkip(_skip)
  }
  

  useEffect(() => {
    if (withdrawalRequests && withdrawalRequests.length > 0) {
      if (withdrawalRequests.length > TableLimit) {
        setClientRecord(withdrawalRequests.slice(skip, skip + TableLimit))
      } else {
        setClientRecord(withdrawalRequests)
      }
    }
  }, [withdrawalRequests, skip])



  const onWithdraw = useCallback(async (valId: number, wrId: number) => {
    if (!valId || !wrId) return;
    const params: WithdrawParams = {
      toValidatorID: valId,
      wrID: wrId
    }
    try {
      const { status, transactionHash } = await withdraw(params)
      if (status === 1) {
        const msg = `Congratulation! Withdraw success`
        toastSuccess(msg, t('Success'))
      } else {
        toastDanger('Sorry! Withdraw failed', t('Error'))
      }
      console.log("Withdraw tx: ", transactionHash)
    } catch (error) {
      console.log("error: ", error);
      toastDanger('Sorry! Withdraw failed', t('Error'))
    }
    // eslint-disable-next-line 
  }, [t])

  if (clientRecords.length === 0) return <></>

  return (
    <div className="w-full overflow-x-auto">
      <div className="text-[26px] mb-4">{`${t('Withdraw Requested')}`}</div>
      <table className="w-full mb-4">
        <Thead>
          <tr>
            {
              headers.map((header: Header, index: number) => {
                return (
                  <Th index={index} length={headers.length} key={index}>
                    <div className={`${index === headers.length - 1 ? "text-right" : ""}`}>
                      <div className={`text-base font-normal`}>{header.name}</div>
                      {
                        header.subName ? <div className="text-xs text-gray font-light">{header.subName}</div> : <></>
                      }
                    </div>
                  </Th>
                )
              })
            }
          </tr>
        </Thead>
        <Tbody>
          {
            clientRecords.map((row: WithdrawalRequest, index: number) => {
              return (
                <tr key={index}>
                  <Td index={index} className={`${index === clientRecords.length - 1 ? "rounded-bl-lg" : ""}`}>
                    <div className="text-green">
                      <a href={exploreTransaction(row.undelegateHash)} target="_blank" rel="noopener noreferrer">{row.wrId}
                      </a>
                    </div>
                    <div className="whitespace-nowrap">{dateToUTCString(row.unbondTime)}</div> 
                  </Td>
                  <Td index={index} className="text-base font-medium">
                    <RenderNumberFormat amount={bigFormatEther(row.unbondingAmount)} />
                  </Td>
                  <Td index={index} className="text-base font-medium">
                    {nowTime() < row.withdrawalAbleTime ? millisecondToDay(row.withdrawalAbleTime - nowTime()) : '0s'}
                  </Td>
                  <Td index={index} className="text-base font-medium">
                    <RenderNumberFormat amount={bigFormatEther(row.withdrawalAmount)} />
                  </Td>
                  <Td index={index} className="text-base font-medium">
                    {row.withdrawalTime > 0 && (
                      <>
                        <div className="text-green">
                          <a href={exploreTransaction(row.withdrawalHash)} target="_blank" rel="noopener noreferrer">{truncate({ str: row.withdrawalHash })}</a>
                        </div>
                        <div className="whitespace-nowrap">{dateToUTCString(row.withdrawalTime)}</div> 
                      </>
                    )
                    }
                  </Td>

                  <Td index={index} className={`${index === clientRecords.length - 1 ? "rounded-br-lg" : ""} text-right text-base font-medium`}>
                    {
                      row.withdrawable && !row.withdrawal && <Button onClick={() => onWithdraw(Number(row.validatorId), Number(row.wrId))} scale={buttonScale.sm}>{t('Withdraw')}</Button>
                    }
                  </Td>
                </tr>
              )
            })
          }
        </Tbody>
      </table>
      <Pagination
        limit={TableLimit}
        total={withdrawalRequests.length}
        onChangePage={onChangePage}
      />
    </div>
  )
}