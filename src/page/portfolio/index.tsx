import { useWeb3React } from "@web3-react/core"
import { Box, Button, MyInvestmentList, StakingCalculator, boxType, buttonScale, buttonType } from "../../components"
import { useBalance, useFetchDelegator } from "../../hooks"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import ArrowLeftIcon from "../../images/icons/arrow-left-black.png"
import { useNavigate } from "react-router-dom"
import { useValidatorStore } from "../../store"

export const Portfolio = () => {

  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { balance } = useBalance()
  const navigator = useNavigate()

  const [allValidators] = useValidatorStore(state => [
    state.allValidators
  ])


  const { delegator } = useFetchDelegator(account || "")

  const { validations, address: delegatorAddr } = useMemo(() => delegator, [delegator])

  return (
    <div className="text-left">
      <div className="text-[26px] font-semibold text-black-2">My Investment</div>
      <div className="text-base text-gray">This is the dashboard where you manage your staking portfolio</div>
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
                variant={buttonType.primary}
                scale={buttonScale.lg}
                className="border-black flex items-center gap-3 px-6"
                onClick={() => navigator("/validator")}
              >
                <span className="text-black text-base">{t('View Validator Reward')}</span>
                <img src={ArrowLeftIcon} alt="u2u" />
              </Button>
            </div>
          </div>
        </Box>
      </div>
      <div className="flex justify-center my-20">
          <StakingCalculator validators={allValidators} balance={balance} />
      </div>
    </div>
  )
}