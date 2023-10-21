import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom"
import { useBalance, useFetchValidator } from "../../../hooks";
import { useMemo } from "react";
import { bigFormatEther, exploreAddress, shortenDisplayNumber, truncate } from "../../../utils";
import { Box, LineChart, RenderNumberFormat, StakingCalculator } from "../../../components";
import { VALIDATOR_COMMISSION } from "../../../contants";
import { isMobile } from "mobile-device-detect";
import { Tooltip } from "react-tooltip";
import InfoIcon from "../../../images/icons/info.svg"
import { ListOfValidator } from "./list";
import { Images } from "../../../images";

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
    active,
    votingPower,
    totalDelegator,
    apr
  } = useMemo(() => validator, [validator])

  if (!validator) return <></>

  return (
    <div className="py-6">
      <div className="w-full bg-gradient-3 py-4 px-[74px] flex justify-between">
        <div className="flex gap-4">
          <img src={Images.U2ULogoPNG} alt="u2u" className="w-[48px] h-[48px]" />
          <div className="text-left">
            <div className="text-text-secondary text-sm">{t("Validator")}</div>
            <div className="flex gap-4">
              <div className="text-lg text-text font-semibold">{name}</div>
              <div>
                {!!active ? <div className="text-xs text-neutral px-3 text-center bg-success rounded-[40px] h-[20px] leading-5">{t("Active")}</div> :
                  <div className="text-xs text-neutral px-3 text-center bg-neutral-surface-disabled rounded-[40px] h-[20px] leading-5">{t("Deactive")}</div>}
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-neutral-surface rounded-[16px]">
          <div className="flex justify-between items-center gap-10 mb-2">
            <div className="flex gap-1 items-center">
              <img src={Images.CoinsPNG} alt="u2u" className="w-[24px]" />
              <div className="text-base font-semibold text-text-secondary">{t("Total Staked Amount")}</div>
            </div>
            <div className="flex gap-1 items-center">
              <div className="font-semibold text-lg text-text">
                <RenderNumberFormat amount={bigFormatEther(totalStakedAmount || 0) || 0} fractionDigits={0} />
              </div>
              <img src={Images.U2ULogoPNG} alt="u2u" className="w-[24px] h-[24px]" />
            </div>
          </div>
          <div className="flex justify-between items-center gap-10">
            <div className="flex gap-2 items-center">
              <div className="text-base text-text-secondary">{t("Validator Auth")}</div>
              <div className="text-base font-semibold text-primary">
                <a href={exploreAddress(auth)} target="_blank" rel="noopener noreferrer">{truncate({ str: auth, headCount: 5, tailCount: 3 })}</a>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-base text-text-secondary">{t("Validator ID")}</div>
              <div className="text-base font-semibold text-primary">
                {valId}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 mt-8">
        <div className="w-full grid grid-cols-12 gap-4">
          <div className="col-span-2 border border-border-ountline rounded-2xl p-4 pl-6 bg-neutral-surface shadow-2">
            <div className="text-left">
              <div className="text-sm text-text">{t('Commission')}</div>
              <div className="text-primary font-semibold text-lg">15 %</div>
            </div>
            <div className="flex justify-end">
              <img src={Images.Staking4PNG} alt="u2u" className="w-[80px] height-[105px]" />
            </div>
          </div>
          <div className="col-span-2 border border-border-ountline rounded-2xl p-4 pl-6 bg-neutral-surface shadow-2">
            <div className="text-left">
              <div className="text-sm text-text">{t('APR')}</div>
              <div className="text-primary font-semibold text-lg">
                <RenderNumberFormat amount={apr} className="mr-2" fractionDigits={2} />
              </div>
            </div>
            <div className="flex justify-end">
              <img src={Images.Staking4PNG} alt="u2u" className="w-[80px] height-[105px]" />
            </div>
          </div>
          <div className="col-span-2 border border-border-ountline rounded-2xl p-4 pl-6 bg-neutral-surface shadow-2">
            <div className="text-left">
              <div className="text-sm text-text">{t('Voting Power')}</div>
              <div className="text-primary font-semibold text-lg">
                <RenderNumberFormat amount={(Number(votingPower) / 10000)} fractionDigits={2} /><span className="ml-2">%</span>
              </div>
            </div>
            <div className="flex justify-end">
              <img src={Images.Staking5PNG} alt="u2u" className="w-[80px] height-[105px]" />
            </div>
          </div>
          <div className="col-span-2 border border-border-ountline rounded-2xl p-4 pl-6 bg-neutral-surface shadow-2">
            <div className="text-left">
              <div className="text-sm text-text">{t('Delegators')}</div>
              <div className="text-primary font-semibold text-lg">
                {totalDelegator}
              </div>
            </div>
            <div className="flex justify-end">
              <img src={Images.Staking6PNG} alt="u2u" className="w-[80px] height-[105px]" />
            </div>
          </div>
          <div className="col-span-4 border border-border-ountline rounded-2xl p-4 pb-0 bg-neutral-surface shadow-2">
            <div className="text-left">
              <div className="text-sm text-text">{t('Validators Rewards')}</div>
              <div className="text-primary font-semibold text-lg">
                {/* <RenderNumberFormat amount={allValidators && allValidators[0] ? allValidators[0].apr : 0} className="mr-2" fractionDigits={2} /> */}
              </div>
            </div>
            <LineChart />
          </div>
        </div>
        <div className="w-full grid grid-cols-12 gap-8 mt-8">
          <div className="col-span-5">
            <div className="w-full flex justify-end">
              <StakingCalculator balance={balance} validators={[validator]} />
            </div>
          </div>
          <div className="col-span-7">
            <ListOfValidator
              valId={Number(valId)}
              totalDelegator={totalDelegator}
            />
          </div>
        </div>
        {
          !isMobile ? (
            <div>
              {/* <div className="flex flex-wrap justify-between text-left">
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
              </Box> */}
            </div>
          ) : (
            <div className="text-left bg-light-1 rounded-lg pb-4">
              {/* <div className="px-4 py-6">
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
                <div className="text-base font-medium">{totalDelegator}</div>
              </div>
              <div className="flex items-center justify-between px-4 py-4">
                <div className="text-base text-gray">{t('Status')}</div>
                <div className="text-white flex items-center mt-1">
                  {!!active ? <div className="text-xs w-[60px] text-center bg-green rounded-xl py-1">Active</div> : <div className="text-xs text-center w-[70px] bg-error rounded-xl py-1">Deactive</div>}
                </div>
              </div> */}
            </div>
          )
        }

        {/* <div className="mt-16 flex justify-center">
          <StakingCalculator balance={balance} validators={[validator]} />
        </div>
        <div className="mt-16 text-left">
          <ListOfValidator
            valId={Number(valId)}
            totalDelegator={totalDelegator}
          />
        </div> */}
      </div>

      <Tooltip anchorSelect="#validator-commission" place="top">
        Commission for Validator from Delegators
      </Tooltip>
    </div>
  )
}