import { useTranslation } from "react-i18next"
import { Validator, WithdrawParams, WithdrawalRequest } from "../../../types"
import { Images, LinkIcon } from "../../../images"
import { bigFormatEther, exploreTransaction, truncate } from "../../../utils"
import { Button, ChangePageParams, Pagination, RenderNumberFormat, buttonScale, buttonType } from "../../../components"
import { useCallback, useEffect, useMemo, useState } from "react"
import { TableLimit } from "../../../contants"
import { toastDanger, toastSuccess } from "../../../components/toast"
import { useWidthdraw } from "../../../hooks"
import { useValidatorStore } from "../../../store"
import { useNavigate } from "react-router-dom"

interface WithdrawCompletedProps {
  wr: WithdrawalRequest[]
}

export const WithdrawCompleted = ({ wr }: WithdrawCompletedProps) => {
  const { t } = useTranslation()
  const { withdraw } = useWidthdraw()

  const [skip, setSkip] = useState(0)
  const total = useMemo(() => { return wr.length || 0 }, [wr])
  const [clientRecords, setClientRecord] = useState<WithdrawalRequest[]>([])
  const onChangePage = async (params: ChangePageParams) => {
    let _skip = params.page ? params.page - 1 : 0
    setSkip(_skip)
  }

  useEffect(() => {
    if (wr && wr.length > 0) {
      if (wr.length > TableLimit) {
        setClientRecord(wr.slice(skip, skip + TableLimit))
      } else {
        setClientRecord(wr)
      }
    }
  }, [wr, skip])

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

  if (!clientRecords) return <></>
  return (
    <div className="w-full overflow-x-auto mt-4">
      <table className="w-full">
        <thead>
          <tr className="border-y border-border-outline text-text-secondary font-medium">
            <th className="py-6 text-left px-6 font-medium whitespace-nowrap">{t("WrID")}</th>
            <th className="py-6 text-left font-medium whitespace-nowrap">{t("Validators")}</th>
            <th className="py-6 text-right font-medium px-6 whitespace-nowrap">{t("Withdrawal amount (U2U)")}</th>
            <th className="py-6 text-right font-medium px-6 whitespace-nowrap">{t("Action")}</th>
          </tr>
        </thead>
        <tbody>
          {
            clientRecords.map((row: WithdrawalRequest, index: number) => {
              return (
                <tr key={index} className="border-y border-border-outline font-semibold hover:bg-neutral-surface-hover">
                  <td className="text-base font-bold text-primary py-3 text-left px-6">
                    {row.wrId}
                  </td>
                  <td className="text-base font-semibold text-text py-3 text-right ">
                    <RenderValidator validatorId={Number(row.validatorId)} />
                  </td>
                  <td className="text-base font-semibold text-text py-3 text-right px-6">
                    <RenderNumberFormat amount={bigFormatEther(row.withdrawalAmount)} />
                  </td>
                  <td className="text-base font-semibold text-primary py-3 text-right px-6 whitespace-nowrap flex gap-1 items-center justify-end">
                    {
                      row.withdrawable && !row.withdrawal ? <Button onClick={() => onWithdraw(Number(row.validatorId), Number(row.wrId))} variant={buttonType.secondary} scale={buttonScale.sm}>{t('Withdraw')}</Button> : (
                        <a href={exploreTransaction(row.withdrawalHash)} className="flex gap-1 items-center justify-end" target="_blank" rel="noopener noreferrer">
                          <span>{truncate({ str: row.withdrawalHash, headCount: 5, tailCount: 3 })}</span>
                          <LinkIcon className="stroke-primary" />
                        </a>
                      )
                    }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <Pagination
        limit={TableLimit}
        total={total}
        onChangePage={onChangePage}
      />
    </div>
  )

}


const RenderValidator = ({ validatorId }: {
  validatorId: number
}) => {
  const navigate = useNavigate()

  const [validator, setValidator] = useState<Validator | undefined>(undefined)
  const [allValidators] = useValidatorStore(state => [
    state.allValidators
  ])
  useEffect(() => {
    if (allValidators && !validator) {
      const _index = allValidators.findIndex((val: Validator) => Number(val.valId) === validatorId);
      if (_index > -1) {
        setValidator(allValidators[_index])
      }
    }
  }, [allValidators, validatorId, validator])

  return (
    <div className="flex gap-4 items-center whitespace-nowrap">
      <img src={validator ? validator.avatar : Images.U2ULogoPNG} alt="u2u" className="w-[40px] h-[40px]" />
      <div className="text-left cursor-pointer" onClick={() => navigate(`${validator ? `/validator/${validator.valId}` : ""}`)}>
        {validator ? validator.name : `Validator ${validatorId}`}
        {validator && validator.auth && 
        <div className="flex gap-1 items-center text-text-secondary text-sm">
          <span>{truncate({ str: validator.auth, headCount: 5, tailCount: 3 })}</span>
        </div>}
      </div>
    </div>
  )
}