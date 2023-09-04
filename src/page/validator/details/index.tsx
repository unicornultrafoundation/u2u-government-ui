import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom"
import { useBalance, useFetchValidator } from "../../../hooks";
import { useMemo } from "react";
import { bigFormatEther, exploreAddress, shortenDisplayNumber, truncate } from "../../../utils";
import { Box, DelegationList, RenderNumberFormat, StakingCalculator } from "../../../components";
import { VALIDATOR_COMMISSION } from "../../../contants";

export const ValidatorDetails = () => {

  const { t } = useTranslation()
  const { validatorId } = useParams()
  const { balance } = useBalance()
  const { validator } = useFetchValidator(Number(validatorId))
  const {
    name,
    valId,
    auth,
    totalStakedAmount,
    votingPower,
    delegations
  } = useMemo(() => validator, [validator])

  if (!validator) return <></>

  return (
    <div>
      <div className="flex flex-wrap justify-between text-left">
        <div>
          <div className="text-[26px] text-black-2">{t('Validator detail')}</div>
          <div className="text-[32px] text-black font-bold">{name}</div>
        </div>
        <div>
          <div className="text-base text-gray">Validator ID</div>
          <div className="text-base text-green font-bold">{valId}</div>
          <div className="text-base text-gray">Validator Auth</div>
          <div className="text-base text-green font-bold">
            <a href={exploreAddress(auth)} target="_blank" rel="noopener noreferrer">{truncate({ str: auth })}</a>
          </div>
        </div>
      </div>
      <Box className="flex items-center justify-around gap-12 mt-4">
        <div className="mx-4">
          <div className="text-xs text-gray">{t('Commission %')}</div>
          <div className="text-base text-black font-bold">{VALIDATOR_COMMISSION}</div>
        </div>
        <div className="mx-4">
          <div className="text-xs text-gray">{t('Total Stake Amount (U2U)')}</div>
          <div className="text-base text-black font-bold">
            {totalStakedAmount ? shortenDisplayNumber(bigFormatEther(totalStakedAmount)) : 0}
          </div>
        </div>
        <div className="mx-4">
          <div className="text-xs text-gray">{t('Voting Power (%)')}</div>
          <div className="text-base text-black font-bold">
            <RenderNumberFormat amount={(votingPower)} className="mr-2" fractionDigits={2} />
          </div>
        </div>
        <div className="mx-4">
          <div className="text-xs text-gray">{t('Total Delegator')}</div>
          <div className="text-base text-black font-bold">{delegations ? delegations?.length : 0}</div>
        </div>
        <div className="mx-4">
          <div className="text-xs text-gray">{t('Status')}</div>
          <div className="text-base text-black font-bold">NaN</div>
        </div>
        <div className="mx-4">
          <div className="text-xs text-gray">{t('Uptime (%)')}</div>
          <div className="text-base text-black font-bold">NaN</div>
        </div>
      </Box>
      <div className="mt-16 flex justify-center">
        <StakingCalculator balance={balance} validators={[validator]} />
      </div>
      <div className="mt-16 text-left">
        <div className="text-[26px] text-black-2 mb-6">{t('Delegators')}</div>
        {
          delegations && delegations.length > 0 ? <DelegationList delegations={delegations} /> : <></>
        }
      </div>
    </div>
  )
}