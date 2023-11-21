import { useCallback, useMemo, useState } from "react"
import { useClaimRewards, useDelegator, usePendingReward, useRestakeRewards } from "../../../hooks"
import { ClaimRewardsParams, Delegator, RestakeRewardsParams, Validation } from "../../../types"
import { classNames, exploreAddress, truncate } from "../../../utils"
import { LinkIcon } from "../../../images"
import { useTranslation } from "react-i18next"
import { Button, EmptyComponent, RenderNumberFormat, buttonScale, buttonType } from "../../../components"
import { toastDanger, toastSuccess } from "../../../components/toast"

export const Rewards = () => {

  const { t } = useTranslation()
  const { delegatorState } = useDelegator()
  const { validations, address } = useMemo(() => delegatorState ? delegatorState : {} as Delegator, [delegatorState])

  return (
    <div className="w-full">
      <div className="w-full mt-6 min-w-[700px]">
        {
          validations && validations.length > 0 ? validations.map((row: Validation, index: number) => {
            return (
              <div className={classNames("w-full flex px-4 py-2 items-center justify-between border border-border-outline rounded-[8px] mb-2 cursor-pointer hover:bg-neutral-surface-hover")}
                key={index}>
                <div className="flex gap-4 items-center whitespace-nowrap">
                  <img src={row.validator.avatar} className="w-[40px] h-[40px]" alt="u2u" />
                  <div className="text-left">
                    <div className="text-base font-semibold text-text">{row.validator.name}</div>
                    <a href={exploreAddress(row.validator.auth)} target="_blank" rel="noopener noreferrer" className="flex gap-1 items-center text-primary">
                      <span>{truncate({ str: row.validator.auth, headCount: 5, tailCount: 3 })}</span>
                      <LinkIcon className="stroke-primary" />
                    </a>
                  </div>
                </div>
                <div className="flex gap-8">
                  <div>
                    <div className="text-[14px] text-text-secondary whitespace-nowrap">{t("Claimable (U2U)")}</div>
                    <div className="text-base text-text text-right">
                      <RenderRewards delegator={address} validatorID={row.validator.valId} />
                    </div>
                  </div>
                  <div>
                    <RenderClaimButton validatorID={row.validator.valId} />
                  </div>
                  <div>
                    <RenderReStakeButton validatorID={row.validator.valId} />
                  </div>
                </div>
              </div>
            )
          }) : <EmptyComponent />
        }
      </div>
    </div>
  )
}

const RenderReStakeButton = ({ validatorID }: {
  validatorID: string
}) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const { restake } = useRestakeRewards()
  const onRestakedRewards = useCallback(async () => {
    if (!validatorID) return;
    const params: RestakeRewardsParams = {
      toValidatorID: Number(validatorID),
    }
    try {
      setLoading(true)
      const { status, transactionHash } = await restake(params)
      if (status === 1) {
        const msg = `Congratulation! Restake rewards success`
        toastSuccess(msg, t('Success'))
      } else {
        toastDanger('Sorry! Restake rewards failed', t('Error'))
      }
      console.log("Claim rewards tx: ", transactionHash)
    } catch (error) {
      console.log("error: ", error);
      toastDanger('Sorry! Restake rewards failed', t('Error'))
    }
    setLoading(false)
    // eslint-disable-next-line 
  }, [validatorID, t])
  return (
    <Button
      className="whitespace-nowrap"
      loading={loading}
      scale={buttonScale.sm}
      variant={buttonType.secondary}
      onClick={onRestakedRewards}>{t("Re-stake")}</Button>
  )
}

const RenderClaimButton = ({ validatorID }: {
  validatorID: string
}) => {
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)
  const { claimRewards } = useClaimRewards()

  const onClaimedRewards = useCallback(async () => {
    if (!validatorID) return;
    const params: ClaimRewardsParams = {
      toValidatorID: Number(validatorID),
    }
    try {
      setLoading(true)
      const { status, transactionHash } = await claimRewards(params)
      if (status === 1) {
        const msg = `Congratulation! Claim rewards success`
        toastSuccess(msg, t('Success'))
      } else {
        toastDanger('Sorry! Claim rewards failed', t('Error'))
      }
      console.log("Claim rewards tx: ", transactionHash)
    } catch (error) {
      console.log("error: ", error);
      toastDanger('Sorry! Claim rewards failed', t('Error'))
    }
    setLoading(false)
    // eslint-disable-next-line 
  }, [validatorID, t])
  return (
    <Button
      loading={loading}
      scale={buttonScale.sm}
      variant={buttonType.secondary}
      onClick={onClaimedRewards}>{t("Claim")}</Button>
  )
}

const RenderRewards = ({ validatorID, delegator }: {
  validatorID: string
  delegator: string
}) => {
  const { pendingRewards } = usePendingReward(delegator, Number(validatorID))

  return (
    <div>
      <RenderNumberFormat amount={pendingRewards} fractionDigits={4} />
    </div>
  )

}