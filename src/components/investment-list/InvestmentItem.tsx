import { useTranslation } from "react-i18next"
import { ClaimRewardsParams, RestakeRewardsParams, Validation } from "../../types"
import { Box } from "../box"
import { useCallback, useMemo, useState } from "react"
import { bigFormatEther, truncate } from "../../utils"
import ArrowIcon from "../../images/icons/arrow-left.png"
import { RenderNumberFormat } from "../text"
import { Button, buttonType } from "../button"
import { UndelegateComponent } from "./action/Undelegate"
import { useClaimRewards, useFetchWithdrawRequest, useRestakeRewards } from "../../hooks"
import { WithdrawalRequestList } from "./WithdrawalRequestList"
import { toastDanger, toastSuccess } from "../toast"

interface InvestmentItemProps {
  validation: Validation
  delegator: string
}

export const InvestmentItem = ({
  validation,
  delegator
}: InvestmentItemProps) => {
  const { t } = useTranslation()
  const {
    validator,
    stakedAmount
  } = useMemo(() => validation, [validation])  
  const {
    name,
    auth,
    valId
  } = useMemo(() => validator, [validator])
  const [isOpenUndelegateModal, setIsOpenUndelegateModal] = useState(false)
  const { wr: withdrawalRequests } = useFetchWithdrawRequest(delegator, Number(valId))
  const {claimRewards} = useClaimRewards()
  const { restake } = useRestakeRewards()

  const onClaimedRewards = useCallback(async () => {
    if (!valId) return;
    const params: ClaimRewardsParams = {
      toValidatorID: Number(valId),
    }
    try {
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
    // eslint-disable-next-line 
  }, [valId, t])

  const onRestakedRewards = useCallback(async () => {
    if (!valId) return;
    const params: RestakeRewardsParams = {
      toValidatorID: Number(valId),
    }
    try {
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
              <div className="text-sm font-bold text-green">{truncate({ str: auth })}</div>
            </div>
            <div className="flex items-center cursor-pointer">
              <span className="text-green text-sm">{t('View Detail')}</span>
              <img src={ArrowIcon} alt="u2u" className="w-[20px] h-[20px]" />
            </div>
          </div>
        </Box>
        <Box className="max-w-[400px] py-6 px-10">
          <div className="text-lg text-gray">{t('Staked (U2U)')}</div>
          <div className="flex justify-between mt-4">
            <div className="text-lg text-black font-medium">
              <RenderNumberFormat amount={bigFormatEther(stakedAmount)} className="mr-2" fractionDigits={2} />
            </div>
            <div>
              <Button onClick={() => setIsOpenUndelegateModal(true)} variant={buttonType.transparent}>{t('Undelegate')}</Button>
            </div>
          </div>
        </Box>

        <Box className="max-w-[400px] py-6 px-10 text-center">
          <div className="text-gray text-xl">{t('Claimable (U2U)')}</div>
          <div className="text-black text-xl font-medium">NaN</div>
          <div className="grid grid-cols-2 mt-10 gap-4">
            <Button variant={buttonType.transparent} onClick={() => onClaimedRewards()}>{t('Claim')}</Button>
            <Button onClick={() => onRestakedRewards()}>{t('Re-Stake')}</Button>
          </div>
        </Box>

      </div>
      {
        withdrawalRequests && withdrawalRequests.length > 0 ? (
          <div className="mt-4">
          <WithdrawalRequestList  withdrawalRequests={withdrawalRequests}/>
          </div>
        ) : <></>
      }
      <UndelegateComponent
        validation={validation}
        isOpenModal={isOpenUndelegateModal}
        setIsOpenModal={setIsOpenUndelegateModal}
      />
    </div>
  )
}