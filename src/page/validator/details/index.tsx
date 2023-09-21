import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom"
import { useBalance, useFetchValidator } from "../../../hooks";
import { useMemo } from "react";
import { bigFormatEther, exploreAddress, shortenDisplayNumber, truncate } from "../../../utils";
import { Box, DelegationList, RenderNumberFormat, StakingCalculator } from "../../../components";
import { VALIDATOR_COMMISSION } from "../../../contants";
import { isMobile } from "mobile-device-detect";
import { Tooltip } from "react-tooltip";
import InfoIcon from "../../../images/icons/info.svg"

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
    delegations,
    active,
    votingPower,
    totalDelegator,
    apr
  } = useMemo(() => validator, [validator])

  if (!validator) return <></>

  return (
    <div>
      {
        !isMobile ? (
          <div>
            <div className="flex flex-wrap justify-between text-left">
              <div>
                <div className="text-[26px] text-black-2">{t('Validator Detail')}</div>
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
                <div className="text-xs text-gray">{t('APR (%)')}</div>
                <div className="text-base text-black font-bold">
                  <RenderNumberFormat amount={apr} className="mr-2" fractionDigits={2} />
                </div>
              </div>
              <div className="mx-4">
                <div className="text-xs text-gray">{t('Voting Power (%)')}</div>
                <div className="text-base text-black font-bold">
                  <RenderNumberFormat amount={(Number(votingPower) / 10000)} className="mr-2" fractionDigits={2} />
                </div>
              </div>
              <div className="mx-4">
                <div className="text-xs text-gray">{t('Total Delegator')}</div>
                <div className="text-base text-black font-bold">{totalDelegator}</div>
              </div>
              <div className="mx-4">
                <div className="text-xs text-gray">{t('Status')}</div>
                <div className="text-white flex items-center mt-1">
                  {!!active ? <div className="text-xs w-[60px] bg-green rounded-xl py-1">Active</div> : <div className="text-xs w-[70px] bg-error rounded-xl py-1">Deactive</div>}
                </div>
              </div>
              {/* <div className="mx-4">
                <div className="text-xs text-gray">{t('Uptime (%)')}</div>
                <div className="text-base text-black font-bold">NaN</div>
              </div> */}
            </Box>
          </div>
        ) : (
          <div className="text-left bg-light-1 rounded-lg pb-4">
            <div className="px-4 py-6">
              <div className="flex justify-between">
                <div>
                  <div className="text-base text-gray">{t('Validator ID')}</div>
                  <div className="text-base text-green font-bold">{valId}</div>
                </div>
                <div className="text-right">
                  <div className="text-base text-gray flex">
                    {t('Commission')}
                    <img src={InfoIcon} alt="u2u" className="mt-[-10px]" id="validator-commission" />
                  </div>
                  <div className="text-base text-black font-medium">{VALIDATOR_COMMISSION} %</div>
                </div>
              </div>
              <div className="text-base text-gray">Validator Auth</div>
              <div className="text-base text-green font-bold">
                <a href={exploreAddress(auth)} target="_blank" rel="noopener noreferrer">{truncate({ str: auth })}</a>
              </div>
              <div className="w-full h-[1px] bg-gray-1 mt-6"></div>
            </div>
            <div className="flex items-center justify-between px-4 pb-4">
              <div className="text-base text-gray">{t('APR (%)')}</div>
              <div className="text-base font-medium">
                <RenderNumberFormat amount={apr * 100} fractionDigits={2} />
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-4 bg-light-2">
              <div className="text-base text-gray">{t('Total Stake Amount (U2U)')}</div>
              <div className="text-base font-medium">
                {totalStakedAmount ? shortenDisplayNumber(bigFormatEther(totalStakedAmount)) : 0}
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-4">
              <div className="text-base text-gray">{t('Voting Power (%)')}</div>
              <div className="text-base font-medium">
                <RenderNumberFormat amount={(Number(votingPower) / 10000)} fractionDigits={2} /></div>
            </div>
            <div className="flex items-center justify-between px-4 py-4 bg-light-2">
              <div className="text-base text-gray">{t('Total Delegator')}</div>
              <div className="text-base font-medium">{delegations ? delegations?.length : 0}</div>
            </div>
            <div className="flex items-center justify-between px-4 py-4">
              <div className="text-base text-gray">{t('Status')}</div>
              <div className="text-white flex items-center mt-1">
                {!!active ? <div className="text-xs w-[60px] text-center bg-green rounded-xl py-1">Active</div> : <div className="text-xs text-center w-[70px] bg-error rounded-xl py-1">Deactive</div>}
              </div>
            </div>
            {/* <div className="flex items-center justify-between px-4 py-4 bg-light-2">
              <div className="text-base text-gray">{t('Uptime (%)')}</div>
              <div className="text-base font-medium">NaN</div>
            </div> */}
          </div>
        )
      }

      <div className="mt-16 flex justify-center">
        <StakingCalculator balance={balance} validators={[validator]} />
      </div>
      <div className="mt-16 text-left">
        <div className="text-[26px] text-black-2 mb-6 w-full">{t('Delegators')}</div>
        {
          delegations && delegations.length > 0 ? <DelegationList validationId={Number(valId)} totalDelegator={totalDelegator} /> : <></>
        }
      </div>
      <Tooltip anchorSelect="#validator-commission" place="top">
        Commission for Validator from Delegators
      </Tooltip>
    </div>
  )
}