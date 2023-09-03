import { useTranslation } from "react-i18next";
import { WithdrawParams, WithdrawalRequest } from "../../types";
import { bigFormatEther } from "../../utils";
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
    name: "Unbonded Time",
  },
  {
    name: "Unbonded Amount",
    subName: "(U2U)"
  },
  {
    name: "Withdrawable Time",
  },
  {
    name: "Withdrawable Amount",
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
    <div>
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
                  <Td index={index} className={`text-green ${index === withdrawalRequests.length - 1 ? "rounded-bl-lg" : ""}`}>
                    {row.wrId}
                  </Td>
                  <Td index={index} className="text-base font-medium">
                    {row.unbondTime}
                  </Td>
                  <Td index={index} className="text-base font-medium">
                    <RenderNumberFormat amount={bigFormatEther(row.unbondingAmount)} />
                  </Td>
                  <Td index={index} className="text-base font-medium">
                    {row.withdrawalTime}
                  </Td>
                  <Td index={index} className="text-base font-medium">
                    <RenderNumberFormat amount={bigFormatEther(row.withdrawableAmount)} />
                  </Td>
                  <Td index={index} className="text-right text-base font-medium">
                    {
                      !row.withdrawableAmount.isZero() && <Button onClick={() => onWithdraw(Number(row.validatorId), Number(row.wrId))} scale={buttonScale.sm}>{t('Withdraw')}</Button>
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