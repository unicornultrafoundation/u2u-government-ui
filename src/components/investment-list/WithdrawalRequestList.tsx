import { useTranslation } from "react-i18next";
import { WithdrawParams, WithdrawalRequest } from "../../types";
import { bigFormatEther, dateToUTCString, exploreTransaction, millisecondToDay, nowTime, truncate } from "../../utils";
import { Button, buttonScale } from "../button";
import { Tbody, Td, Th, Thead } from "../table"
import { RenderNumberFormat } from "../text";
import { useWidthdraw } from "../../hooks";
import { useCallback } from "react";
import { toastDanger, toastSuccess } from "../toast";


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
  withdrawalRequests: WithdrawalRequest[]
}

export const WithdrawalRequestList = ({
  withdrawalRequests
}: WithdrawalRequestListProps) => {
  const { t } = useTranslation()

  const { withdraw } = useWidthdraw()
  
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

  return (
    <div className="w-full overflow-x-auto">
      <div className="text-[26px] mb-4">{`${t('Withdraw Requested')}`}</div>
      <table className="w-full">
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
            withdrawalRequests.map((row: WithdrawalRequest, index: number) => {
              return (
                <tr key={index}>
                  <Td index={index} className={`${index === withdrawalRequests.length - 1 ? "rounded-bl-lg" : ""}`}>
                    <div className="text-green">
                      <a href={exploreTransaction(row.undelegateHash)} target="_blank" rel="noopener noreferrer">{row.wrId}
                      </a>
                    </div>
                    {dateToUTCString(row.unbondTime)}
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
                        {dateToUTCString(row.withdrawalTime)}
                      </>
                    )
                    }
                  </Td>

                  <Td index={index} className={`${index === withdrawalRequests.length - 1 ? "rounded-br-lg" : ""} text-right text-base font-medium`}>
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
    </div>
  )
}