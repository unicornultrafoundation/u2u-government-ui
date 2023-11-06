import { useTranslation } from "react-i18next"
import { useFetchStakingTxs } from "../../hooks"
import { useEffect, useState } from "react"
import { useWeb3React } from "@web3-react/core"
import { ChangePageParams, Pagination } from "../../components/pagination"
import { TableLimit } from "../../contants"
import { StakingTransaction, Validator } from "../../types"
import { Images, LinkIcon } from "../../images"
import { exploreTransaction, millisecondToHMS, truncate } from "../../utils"
import { useValidatorStore } from "../../store"
import { useNavigate } from "react-router-dom"
import { EmptyComponent } from "../../components"

export const TxHistory = () => {

  const { account } = useWeb3React()
  const { t } = useTranslation()
  const [skip, setSkip] = useState(0)
  const { txs, total } = useFetchStakingTxs(account || "", skip)

  const onChangePage = async (params: ChangePageParams) => {
    let _skip = params.page ? params.page - 1 : 0
    setSkip(_skip)
  }

  const renderTxType = (type: number) => {
    switch (type) {
      case 1:
        return "Create Validator"
      case 2:
        return "Delegate"
      case 3:
        return "Undelegate"
      case 4:
        return "Withdrawn"
      case 5:
        return "Claim Rewards"
      case 6:
        return "Restake"
      case 7:
        return "Lock"
      case 8:
        return "Unlock"
    }
  }

  return (
    <div className="text-left">
      <div className="text-[24px] text-text font-bold">{t("History")}</div>
      {
        txs.length > 0 ? (
          <div className="w-full overflow-x-auto mt-4">
            <table className="w-full">
              <thead>
                <tr className="border-y border-border-outline text-text-secondary font-medium">
                  <th className="py-6 text-left px-6 font-medium whitespace-nowrap">{t("Type")}</th>
                  <th className="py-6 text-left font-medium whitespace-nowrap">{t("Validator")}</th>
                  <th className="py-6 text-right font-medium px-6 whitespace-nowrap">{t("Transaction")}</th>
                  <th className="py-6 text-right font-medium px-6 whitespace-nowrap">{t("Age")}</th>
                </tr>
              </thead>
              <tbody>
                {
                  txs.map((row: StakingTransaction, index: number) => {
                    return (
                      <tr key={index} className="border-y border-border-outline font-semibold hover:bg-neutral-surface-hover">
                        <td className="text-base font-bold text-text py-3 text-left px-6">
                          {renderTxType(row.type)}
                        </td>
                        <td className="text-base font-semibold text-text py-3 text-right ">

                          <RenderValidator validatorId={row.validator} />
                        </td>
                        <td className="text-base font-semibold text-primary py-3 text-right px-6 min-w-[220px]">
                          <a href={exploreTransaction(row.txHash)} target="_blank" rel="noopener noreferrer" className="flex gap-1 items-center justify-end">
                            <span>{truncate({ str: row.txHash, headCount: 5, tailCount: 3 })}</span>
                            <LinkIcon className="stroke-primary" />
                          </a>
                        </td>
                        <td className="text-base font-semibold text-text py-3 text-right px-6 whitespace-nowrap">
                          {millisecondToHMS(row.age)}
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
        ) : <EmptyComponent />
      }
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