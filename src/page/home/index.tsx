import { useTranslation } from "react-i18next";
import { Box, Button } from "../../components";

export const Home = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Box className="flex items-center justify-center gap-12">
        <div className="mx-4">
          <div className="text-base font-medium text-gray">{t('Total Supply (U2U)')}</div>
          <div className="text-2xl text-black font-bold">10B U2U</div>
        </div>
        <div className="mx-4">
          <div className="text-base font-medium text-gray">{t('Market Cap (USD)')}</div>
          <div className="text-2xl text-black font-bold">$15.5 M</div>
        </div>
        <div className="mx-4">
          <div className="text-base font-medium text-gray">{t('Circulating Supply (U2U)')}</div>
          <div className="text-2xl text-black font-bold">2B U2U</div>
        </div>
        <div className="mx-4">
          <div className="text-base font-medium text-gray">{t('Epoch Reward (U2U)')}</div>
          <div className="text-2xl text-black font-bold">$1.5 M</div>
        </div>
      </Box>
      <Box className="flex items-start justify-center gap-16 mt-10" variant="transparent">
        <div>
          <div className="font-bold text-base text-gray">Total staked amount (U2U)</div>
          <div className="font-bold text-black text-[40px]">12,056,750</div>
          <div className="text-lg font-semibold text-gray">Stake Ratio: <span className="text-black">70%</span></div>
        </div>
        <div>
          <div className="font-bold text-base text-gray">Total staked market value (USD)</div>
          <div className="font-bold text-black text-[40px]">$123,123</div>
        </div>
      </Box>
      <Box variant="gradient">
        <div className="py-[32px]">
          <div className="text-[26px] text-black-2 text-center">Validators form the backbone of U2U’s network.</div>
          <div className="text-base text-gray text-center">By processing transactions and participating in consensus, each validator helps make U2U the most censorship resistant and highest-performance blockchain network in the world.</div>

          <div className="text-2xl text-gray text-center mt-10">Epoch Reward</div>
          <div className="text-base text-gray text-center">Reward from the Reserve to incentivize Validators to join us in securing the network. This reward will be distributed at end of Epoch, which last 24h each</div>

          <div className="text-2xl text-gray text-center mt-10">Delegators</div>
          <div className="text-base text-gray text-center">Delegators are rewarded for helping to validate the network. They do this by delegating their stake to validator nodes. </div>
          <div className="mt-10">
            <Button>Become a Validator</Button>
          </div>
        </div>
      </Box>
    </div>
  )
}