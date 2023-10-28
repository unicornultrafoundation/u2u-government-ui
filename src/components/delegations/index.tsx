import { useState } from "react";
import { Delegation } from "../../types";
import { bigFormatEther, exploreAddress, truncate } from "../../utils";
import { ChangePageParams, Pagination } from "../pagination";
import { RenderNumberFormat } from "../text";
import { useFetchDelegations } from "../../hooks";
import { TableLimit } from "../../contants";
import { useTranslation } from "react-i18next";


interface DelegationListProps {
  validationId: number,
  totalDelegator: number
}

export const DelegationList = ({ validationId, totalDelegator }: DelegationListProps) => {

  const { t } = useTranslation()

  const [skip, setSkip] = useState(0)
  const { delegations } = useFetchDelegations(validationId, skip)

  const onChangePage = async (params: ChangePageParams) => {
    let _skip = params.page ? params.page - 1 : 0
    setSkip(_skip)
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-y border-border-outline text-text-secondary font-medium">
            <th className="py-6 text-left px-6 font-medium whitespace-nowrap">{t("Address")}</th>
            <th className="py-6 text-right font-medium whitespace-nowrap">{t("Staked (U2U)")}</th>
            <th className="py-6 text-right font-medium px-6 whitespace-nowrap">{t("Claimed Rewards (U2U)")}</th>
          </tr>
        </thead>
        <tbody>
          {
            delegations.length > 0 && delegations.map((row: Delegation, index: number) => {
              return (
                <tr key={index} className="border-y border-border-outline font-semibold hover:bg-neutral-surface-hover cursor-pointer">
                  <td className="text-base font-semibold text-primary py-4 text-left px-6">
                    <a href={exploreAddress(row.delegatorAddress)} target="_blank" rel="noopener noreferrer">{truncate({ str: row.delegatorAddress })}</a>
                  </td>
                  <td className="text-base font-semibold text-text py-4 text-right">
                    <RenderNumberFormat amount={bigFormatEther(row.stakedAmount)} fractionDigits={2} />
                  </td>
                  <td className="text-base font-semibold text-text py-4 text-right px-6">
                  <RenderNumberFormat amount={bigFormatEther(row.totalClaimedRewards)} fractionDigits={2} />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <Pagination
        limit={TableLimit}
        total={totalDelegator}
        onChangePage={onChangePage}
      />
    </div>
  )
}