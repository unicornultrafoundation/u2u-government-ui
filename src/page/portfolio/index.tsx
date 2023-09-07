import { useWeb3React } from "@web3-react/core"
import { Box, Button, MyInvestmentList, StakingCalculator, boxType, buttonScale, buttonType } from "../../components"
import { useBalance, useFetchAllValidator, useFetchDelegator } from "../../hooks"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import ArrowLeftIcon from "../../images/icons/arrow-left-black.png"

export const Portfolio = () => {

  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { validators } = useFetchAllValidator()
  const { balance } = useBalance()

  const { delegator } = useFetchDelegator(account || "")

  const { validations, address: delegatorAddr } = useMemo(() => delegator, [delegator])

  return (
    <div className="text-left">
      <div className="text-[26px] font-semibold text-black-2">My Investment</div>
      <div className="text-base text-gray">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste tempora quibusdam corporis illo commodi consectetur dignissimos! Aliquam mollitia aut officiis ipsam corporis assumenda cum alias sequi dolores! Veritatis, recusandae optio!</div>
      <div>
        {
          validations && validations.length > 0 ? <MyInvestmentList validations={validations} delegator={delegatorAddr} /> : <></>
        }
      </div>
      <div className="mt-20">
        <Box variant={boxType.gradient2}>
          <div className="md:px-[90px] py-6 md:flex items-center justify-between">
            <div className="text-[26px] text-black">
              <div>The more you staking,</div>
              <div>the more rewards you get!</div>
            </div>
            <div className="mt-6 md:mt-0">
              <Button
                variant={buttonType.transparent}
                scale={buttonScale.lg}
                className="border-black flex items-center gap-3 px-6"
              >
                <span className="text-black text-base">{t('View Validator Reward')}</span>
                <img src={ArrowLeftIcon} alt="u2u" />
              </Button>
            </div>
          </div>
        </Box>
      </div>

      <div className="flex justify-center my-20">
          <StakingCalculator validators={validators} balance={balance} />
      </div>
    </div>
  )
}