import { useTranslation } from "react-i18next"
import { ClaimRewardsParams, RestakeRewardsParams, Validation } from "../../types"
import { Box } from "../box"
import { useCallback, useMemo, useState } from "react"
import { bigFormatEther, dateToUTCString, exploreAddress, truncate } from "../../utils"
import ArrowIcon from "../../images/icons/arrow-left.png"
import { RenderNumberFormat } from "../text"
import { Button, buttonType } from "../button"
import { UndelegateModal } from "./action/UndelegateModal"
import { useClaimRewards, useFetchLockedStake, useFetchWithdrawRequest, usePendingReward, useRestakeRewards } from "../../hooks"
import { WithdrawalRequestList } from "./WithdrawalRequestList"
import { toastDanger, toastSuccess } from "../toast"
import { useNavigate } from "react-router-dom"
import { LockStakeModal } from "./action/LockStakeModal"
import { RelockStakeModal } from "./action/RelockStakeModal"
import { UnlockStakeModal } from "./action/UnlockStakeModal"
import { BigNumber } from "ethers"

interface InvestmentItemProps {
  validation: Validation
  delegator: string
}

export const InvestmentItem = ({
  validation,
  delegator
}: InvestmentItemProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { lockedStake } = useFetchLockedStake(delegator)

  const { lockedAmount, endTime, isLockedUp } = useMemo(() => lockedStake, [lockedStake])

  const {
    validator,
    stakedAmount
  } = useMemo(() => validation, [validation])
  const {
    name,
    auth,
    valId
  } = useMemo(() => validator, [validator])

  const actualStakedAmount = useMemo(() => {
    if (stakedAmount && !stakedAmount.isZero()) {
      return stakedAmount.sub(lockedAmount || BigNumber.from(0))
    }
    return BigNumber.from(0)
  }, [stakedAmount, lockedAmount])
  
  // Local state
  const [isOpenUndelegateModal, setIsOpenUndelegateModal] = useState(false)
  const [isOpenLockStakeModal, setIsOpenLockStakeModal] = useState(false)
  const [isOpenRelockStakeModal, setIsOpenRelockStakeModal] = useState(false)
  const [isOpenUnlockStakeModal, setIsOpenUnlockStakeModal] = useState(false)
  const [isClaimRewardsLoading, setIsClaimRewardsLoading] = useState(false)
  const [isRestakeLoading, setIsRestakeLoading] = useState(false)

  const { wr: withdrawalRequests } = useFetchWithdrawRequest(delegator, Number(valId))

  const { claimRewards } = useClaimRewards()
  const { restake } = useRestakeRewards()
  const { pendingRewards } = usePendingReward(delegator, Number(valId))


  const onClaimedRewards = useCallback(async () => {
    if (!valId) return;
    const params: ClaimRewardsParams = {
      toValidatorID: Number(valId),
    }
    try {
      setIsClaimRewardsLoading(true)
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
    setIsClaimRewardsLoading(false)
    // eslint-disable-next-line 
  }, [valId, t])

  const onRestakedRewards = useCallback(async () => {
    if (!valId) return;
    const params: RestakeRewardsParams = {
      toValidatorID: Number(valId),
    }
    try {
      setIsRestakeLoading(true)
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
    setIsRestakeLoading(false)
    // eslint-disable-next-line 
  }, [valId, t])


  return (
    <div>
      <div className="flex gap-6 flex-wrap">
        <Box className="max-w-[400px] py-6 px-10">
          <div className="text-lg text-gray">{t('Validator')}</div>
          <div className="flex justify-between mt-4">
            <div>
              <div className="font-medium text-lg text-black">{name}</div>
              <div className="text-sm font-bold text-green">
                <a href={exploreAddress(auth)} target="_blank" rel="noopener noreferrer">{truncate({ str: auth })}</a>
              </div>
            </div>
            <div className="flex items-center cursor-pointer" onClick={() => navigate(`/validator/${valId}`)}>
              <span className="text-green text-sm">{t('View Detail')}</span>
              <img src={ArrowIcon} alt="u2u" className="w-[20px] h-[20px]" />
            </div>
          </div>
        </Box>
        <Box className="max-w-[400px] py-6 px-10">
          <div className="text-lg text-gray">{t('Staked (U2U)')}</div>
          <div className="flex justify-between mt-4">
            <div className="text-lg text-black font-medium">
              <RenderNumberFormat amount={actualStakedAmount && bigFormatEther(actualStakedAmount)} className="mr-2" fractionDigits={2} />
            </div>
            <div>
              <Button
                onClick={() => setIsOpenUndelegateModal(true)}
                variant={buttonType.transparent}
                className="mb-2 w-[120px]">{t('Undelegate')}
              </Button>
              {
                !isLockedUp &&
                <Button
                  className="w-[120px]"
                  onClick={() => setIsOpenLockStakeModal(true)}
                >{t('Lock Stake')}</Button>
              }
            </div>
          </div>
        </Box>

        <Box className="max-w-[400px] py-6 px-10 text-center">
          <div className="text-gray text-xl">{t('Claimable (U2U)')}</div>
          <div className="text-black text-xl font-medium">
            <RenderNumberFormat amount={pendingRewards} className="mr-2" />
          </div>
          <div className="grid grid-cols-2 mt-10 gap-4">
            <Button loading={isClaimRewardsLoading} variant={buttonType.transparent} onClick={() => onClaimedRewards()}>{t('Claim')}</Button>
            <Button loading={isRestakeLoading} onClick={() => onRestakedRewards()}>{t('Re-Stake')}</Button>
          </div>
        </Box>
        {
          isLockedUp && (
            <Box className="max-w-[400px] py-6 px-10 text-center">
              <div className="flex gap-2">
                <div className="text-gray text-base text-left">{t('Locked (U2U): ')}</div>
                <div className="text-black text-base font-medium">
                  <RenderNumberFormat amount={lockedAmount && bigFormatEther(lockedAmount)} className="mr-2" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="text-gray text-base">{t('End time: ')}</div>
                <div className="text-black text-base font-medium"> {dateToUTCString(endTime)}</div>
              </div>
              <div className="grid grid-cols-2 mt-10 gap-4">
                <Button
                  variant={buttonType.transparent} onClick={() => setIsOpenRelockStakeModal(true)}>{t('Re-Lock')}</Button>
                <Button onClick={() => setIsOpenUnlockStakeModal(true)}>{t('Un-Lock')}</Button>
              </div>
            </Box>
          )
        }

      </div>
      {
        withdrawalRequests && withdrawalRequests.length > 0 ? (
          <div className="mt-4">
            <WithdrawalRequestList withdrawalRequests={withdrawalRequests} />
          </div>
        ) : <></>
      }
      <UndelegateModal
        validation={validation}
        isOpenModal={isOpenUndelegateModal}
        setIsOpenModal={setIsOpenUndelegateModal}
        actualStakedAmount={actualStakedAmount}
      />
      <LockStakeModal
        delegator={delegator}
        validation={validation}
        isOpenModal={isOpenLockStakeModal}
        setIsOpenModal={setIsOpenLockStakeModal}
        actualStakedAmount={actualStakedAmount}
      />
      <RelockStakeModal
        delegator={delegator}
        validation={validation}
        isOpenModal={isOpenRelockStakeModal}
        setIsOpenModal={setIsOpenRelockStakeModal}
        actualStakedAmount={actualStakedAmount}
      />
      <UnlockStakeModal
        delegator={delegator}
        validation={validation}
        isOpenModal={isOpenUnlockStakeModal}
        setIsOpenModal={setIsOpenUnlockStakeModal}
        lockedStake={lockedStake} />
    </div>
  )
}