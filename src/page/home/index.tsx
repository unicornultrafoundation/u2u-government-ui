import { useTranslation } from "react-i18next";
import { Box, Button, StakingCalculator, ValidatorList, buttonScale } from "../../components";
import { useBalance, useFetchAllValidator, useFetchStakingStats, useTotalSupply } from "../../hooks";
import { useMemo } from "react";
import { bigFormatEther, shortenDisplayNumber } from "../../utils";
// import ArrowIcon from "../../images/icons/arrow-left.png"
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { t } = useTranslation();
  const { stakingStats } = useFetchStakingStats()
  const { validators } = useFetchAllValidator()
  const { balance } = useBalance()
  const { supply } = useTotalSupply()
  const { totalStaked } = useMemo(() => stakingStats, [stakingStats])

  const navigate = useNavigate()

  return (
    <div>
      <Box className="flex items-center justify-around gap-12">
        <div className="mx-4">
          <div className="text-base font-medium text-gray">{t('Total Supply (U2U)')}</div>
          <div className="text-2xl text-black font-bold">10B U2U</div>
        </div>
        <div className="mx-4">
          <div className="text-base font-medium text-gray">{t('Market Cap (USD)')}</div>
          <div className="text-2xl text-black font-bold">NaN</div>
        </div>
        <div className="mx-4">
          <div className="text-base font-medium text-gray">{t('Circulating Supply (U2U)')}</div>
          <div className="text-2xl text-black font-bold">
            {shortenDisplayNumber(supply)}
          </div>
        </div>
        <div className="mx-4">
          <div className="text-base font-medium text-gray">{t('Epoch Reward (U2U)')}</div>
          <div className="text-2xl text-black font-bold">NaN</div>
        </div>
      </Box>
      <Box className="flex items-start justify-center gap-16 mt-10" variant="transparent">
        <div>
          <div className="font-bold text-base text-gray">Total staked amount (U2U)</div>
          <div className="font-bold text-black text-[40px]">
            {shortenDisplayNumber(bigFormatEther(totalStaked))}
          </div>
        </div>
        <div>
          <div className="font-bold text-base text-gray">Total staked market value (USD)</div>
          <div className="font-bold text-black text-[40px]">NaN</div>
        </div>
      </Box>
      <Box variant="gradient">
        <div className="py-[32px]">
          <div className="text-[26px] text-black-2 text-center">Validators form the backbone of U2U’s network.</div>
          <div className="text-base text-gray text-center">By processing transactions and participating in consensus, each validator helps make U2U the most censorship resistant and highest-performance blockchain network in the world.</div>
          <div className="text-2xl text-black-2 text-center mt-10">Delegators</div>
          <div className="text-base text-gray text-center">Delegators are rewarded for helping to validate the network. They do this by delegating their stake to validator nodes. </div>
          <div className="text-2xl text-black-2 text-center mt-10">Epoch Reward</div>
          <div className="text-base text-gray text-center">Reward from the Reserve to incentivize Validators to join us in securing the network. This reward will be distributed at end of Epoch, which last 24h each</div>
          <div className="mt-10 flex justify-center">
            <Button scale={buttonScale.lg} className="w-[500px]" onClick={() => navigate("/validator/register")}>Become a Validator</Button>
          </div>
        </div>
      </Box>
      <div className="flex justify-center mt-10">
        <StakingCalculator validators={validators} balance={balance} />
      </div>
      <div className="flex justify-between items-center mb-6 mt-10">
        <div className="text-[26px]">{`${t('Validator List')} (${stakingStats.totalValidator})`}</div>
        {/* <div className="text-base inline text-green font-medium cursor-pointer flex items-center gap-2">
          See more
          <img src={ArrowIcon} alt="u2u" />
        </div> */}
      </div>
      <div>
        <ValidatorList validators={validators} />
      </div>
    </div>
  )
}