import { useTranslation } from "react-i18next";
import { Button, RenderNumberFormat } from "../../components";
import { useMemo } from "react";
import { bigFormatEther, shortenDisplayNumber } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useEpochStore, useStakingStore } from "../../store";
import { Images } from "../../images";
import { EstimateRewards } from "./EstimateRewards";
import { isMobile } from 'mobile-device-detect';

export const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const [stakingStats, totalSupply] = useStakingStore(state => [
    state.stakingStats,
    state.totalSupply
  ])
  const [lastEpoch] = useEpochStore(state => [
    state.lastEpoch
  ])
  const { epochRewards } = useMemo(() => lastEpoch, [lastEpoch])
  const { totalStaked } = useMemo(() => stakingStats, [stakingStats])

  const stakingRatio = useMemo(() => {
    try {
      return  Number(bigFormatEther(totalStaked)) / Number(totalSupply) * 100
    } catch (error) {
      return 0
    }
  }, [totalSupply, totalStaked])

  if (isMobile) {
    return (
      <div className="pt-4 px-4">
        <div className="bg-gradient-primary px-4 rounded-[12px]">
          <div className="w-full py-3 flex justify-around flex-wrap gap-6">
            <div className="">
              <div className="text-xs text-neutral">{t('Total Supply (U2U)')}</div>
              <div className="text-lg text-neutral font-semibold">9B U2U</div>
            </div>
            <div className="">
              <div className="text-xs text-neutral">{t('Epoch Reward (U2U)')}</div>
              <div className="text-lg text-neutral font-semibold">
                <RenderNumberFormat amount={epochRewards ? bigFormatEther(epochRewards) : 0} className="mr-2" fractionDigits={2} />
              </div>
            </div>
            <div className="">
              <div className="text-xs text-neutral">{t('Total staked (U2U)')}</div>
              <div className="text-lg text-neutral font-semibold">
                {shortenDisplayNumber(bigFormatEther(totalStaked))}
              </div>
            </div>
            <div className="">
              <div className="text-xs text-neutral">{t('Circulating Supply (U2U)')}</div>
              <div className="text-lg text-neutral font-semibold">
                {shortenDisplayNumber(totalSupply)}
              </div>
            </div>
            <div className="">
              <div className="text-xs text-neutral">{t('Staking Ratio (%)')}</div>
              <div className="text-lg text-neutral font-semibold">
                <RenderNumberFormat amount={stakingRatio} className="mr-2" fractionDigits={2} />
              </div>
            </div>
            <div className="">
              <div className="text-xs text-neutral">{t('Market Cap (USD)')}</div>
              <div className="text-lg text-neutral font-semibold">-</div>
            </div>
            <div className="">
              <div className="text-xs text-neutral">{t('Staked value (USD)')}</div>
              <div className="text-lg text-neutral font-semibold">
                -
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-[64px]">
          <EstimateRewards />
        </div>
        <div className="w-full text-left px-8 mt-[64px]">
          <div className="text-text-title text-[24px] font-semibold">{t('Earn rewards while staking U2U network')}</div>
          <div className="text-sm text-text-secondary mt-2">{t('Participate in staking to secure U2U network and earn U2U tokens as a reward. To stake, you don’t need any particular hardware or device. You can do it directly from your phone or PC.')}</div>
          <div className="mt-8">
            <Button onClick={() => navigate("/staking")} className="rounded-[44px]">{t('Stake your U2U')}</Button>
          </div>
        </div>
        <div className="px-8 my-[64px]">
          <div className="text-left">
            <div className="w-full flex gap-1 mt-4">
              <img src={Images.Staking1PNG} alt="u2u" className="w-[68px] h-[68px]" />
              <div>
                <div className="text-text-title text-lg font-semibold">{t('Validators')}</div>
                <div className="text-base text-text">{t("The Backbone of U2U's Network")}</div>
                <div className="text-xs text-text-secondary">{t("Validators are the cornerstone of U2U's network. They play a pivotal role in U2U distributed network by processing transactions and realtime participating in consensus mechanisms. This active involvement contributes significantly to making U2U the most censorship-resistant and one of the highest-performing blockchain networks in the world.")}</div>
              </div>
            </div>
            <div className="w-full flex gap-1 mt-4">
              <img src={Images.Staking2PNG} alt="u2u" className="w-[68px] h-[68px]" />
              <div>
                <div className="text-text-title text-lg font-semibold">{t('Delegators')}</div>
                <div className="text-base text-text">{t("Powering Network Validation")}</div>
                <div className="text-xs text-text-secondary">{t("Delegators play a vital role in the validation process and are duly rewarded for their contribution to securing the network. Their role involves staking U2U Token by delegating them to validator nodes, thus fortifying the network's reliability and integrity.")}</div>
              </div>
            </div>
            <div className="w-full flex gap-1 mt-4">
              <img src={Images.Staking3PNG} alt="u2u" className="w-[68px] h-[68px]" />
              <div>
                <div className="text-text-title text-lg font-semibold">{t('Epoch Rewards')}</div>
                <div className="text-base text-text">{t("Fostering Network Security")}</div>
                <div className="text-xs text-text-secondary">{t("Epoch rewards represent a critical component of our network. These rewards are drawn from our reserve and serve as a strong incentive for validators to join us in safeguarding the network. The rewards are distributed at the end of each epoch, and each epoch spans a duration of 7 minutes.")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-6">
      <div className="bg-gradient-primary">
        <div className="w-full py-3 px-[41px] flex justify-around flex-wrap gap-6">
          <div className="">
            <div className="text-base text-neutral font-semibold">{t('Total Supply (U2U)')}</div>
            <div className="text-2xl text-neutral font-bold">9B U2U</div>
          </div>
          <div className="">
            <div className="text-base text-neutral font-semibold">{t('Epoch Reward (U2U)')}</div>
            <div className="text-2xl text-neutral font-bold">
              <RenderNumberFormat amount={epochRewards ? bigFormatEther(epochRewards) : 0} className="mr-2" fractionDigits={2} />
            </div>
          </div>
          <div className="">
            <div className="text-base text-neutral font-semibold">{t('Total staked (U2U)')}</div>
            <div className="text-2xl text-neutral font-bold">
              {shortenDisplayNumber(bigFormatEther(totalStaked))}
            </div>
          </div>
          <div className="">
            <div className="text-base text-neutral font-semibold">{t('Circulating Supply (U2U)')}</div>
            <div className="text-2xl text-neutral font-bold">
              {shortenDisplayNumber(totalSupply)}
            </div>
          </div>
          <div className="">
            <div className="text-base text-neutral font-semibold">{t('Staking Ratio (%)')}</div>
            <div className="text-2xl text-neutral font-bold">
              <RenderNumberFormat amount={stakingRatio} className="mr-2" fractionDigits={2} />
            </div>
          </div>
          <div className="">
            <div className="text-base text-neutral font-semibold">{t('Market Cap (USD)')}</div>
            <div className="text-2xl text-neutral font-bold">-</div>
          </div>
          <div className="">
            <div className="ext-base text-neutral font-semibold">{t('Staked value (USD)')}</div>
            <div className="text-2xl text-neutral font-bold">
              <div className="text-2xl text-neutral font-bold">-</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex px-8 py-[145px]">
        <div className="w-6/12">
          <EstimateRewards />
        </div>
        <div className="w-6/12 text-left px-16">
          <div className="text-text-title text-5xl font-semibold">{t('Earn rewards while staking U2U network')}</div>
          <div className="font-semibold text-[18px] text-text-secondary mt-4">{t('Participate in staking to secure U2U network and earn U2U tokens as a reward. To stake, you don’t need any particular hardware or device. You can do it directly from your phone or PC.')}</div>
          <div className="mt-8">
            <Button onClick={() => navigate("/staking")} className="rounded-[44px]">{t('Stake your U2U')}</Button>
          </div>
        </div>
      </div>
      <div className="px-8 pb-16">
        <div className="px-[50px] text-left flex justify-around gap-10">
          <div className="w-4/12">
            <img src={Images.Staking1PNG} alt="u2u" className="w-[68px] h-[68px]" />
            <div className="text-text-title text-lg font-semibold">{t('Validators')}</div>
            <div className="text-base text-text">{t("The Backbone of U2U's Network")}</div>
            <div className="text-xs text-text-secondary">{t("Validators are the cornerstone of U2U's network. They play a pivotal role in U2U distributed network by processing transactions and realtime participating in consensus mechanisms. This active involvement contributes significantly to making U2U the most censorship-resistant and one of the highest-performing blockchain networks in the world.")}</div>
          </div>
          <div className="w-4/12">
            <img src={Images.Staking2PNG} alt="u2u" className="w-[68px] h-[68px]" />
            <div className="text-text-title text-lg font-semibold">{t('Delegators')}</div>
            <div className="text-base text-text">{t("Powering Network Validation")}</div>
            <div className="text-xs text-text-secondary">{t("Delegators play a vital role in the validation process and are duly rewarded for their contribution to securing the network. Their role involves staking U2U Token by delegating them to validator nodes, thus fortifying the network's reliability and integrity.")}</div>
          </div>
          <div className="w-4/12">
            <img src={Images.Staking3PNG} alt="u2u" className="w-[68px] h-[68px]" />
            <div className="text-text-title text-lg font-semibold">{t('Epoch Rewards')}</div>
            <div className="text-base text-text">{t("Fostering Network Security")}</div>
            <div className="text-xs text-text-secondary">{t("Epoch rewards represent a critical component of our network. These rewards are drawn from our reserve and serve as a strong incentive for validators to join us in safeguarding the network. The rewards are distributed at the end of each epoch, and each epoch spans a duration of 7 minutes.")}</div>
          </div>
        </div>
      </div>
    </div>
  )
}