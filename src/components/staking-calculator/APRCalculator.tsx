
import { useState } from "react"
import { Validator } from "../../types"
import { RenderNumberFormat } from "../text"

interface APRCalculatorProp {
  amount: number
  validator: Validator
}

export interface AprResult {
  _30days: number;
  _90days: number;
  _180days: number;
  _365days: number;
  _apr: number;
}

export const APRCalculator = ({ amount, validator }: APRCalculatorProp) => {

  // const { accumulateRewardPerEpoch } = useAPR()
  // const [accumulateReward, setAccumulateReward] = useState(BigNumber.from(0))
  // eslint-disable-next-line
  const [aprResult, serAprResult] = useState<AprResult>({} as AprResult)

  // useEffect(() => {
  //   (async () => {
  //     if (!validator || !validator.valId) return
  //     const _accumulateReward = await accumulateRewardPerEpoch(Number(validator.valId))
  //     setAccumulateReward(_accumulateReward)
  //   })()
  //   // eslint-disable-next-line
  // }, [validator])

  // useEffect(() => {
  //   (async () => {
  //     if (!amount || accumulateReward.isZero()) {
  //       serAprResult({} as AprResult)
  //       return;
  //     }
  //     const _amountBigNumber = BigNumber.from(ethers.utils.parseEther(amount.toString())).div(DecimalBigNumber)
  //     const _reward = accumulateReward.mul(_amountBigNumber)
  //     const _30days = _reward.mul(BigNumber.from(30 * 24 * 3600)).div(epochTime)
  //     const _90days = _reward.mul(BigNumber.from(90 * 24 * 3600)).div(epochTime)
  //     const _180days = _reward.mul(BigNumber.from(180 * 24 * 3600)).div(epochTime)
  //     const _365days = _reward.mul(BigNumber.from(365 * 24 * 3600)).div(epochTime)
  //     //  Calculate APR (%)
  //     const _apr = _365days.div(_amountBigNumber).mul(BigNumber.from(100))
  //     serAprResult({
  //       _30days: Number(ethers.utils.formatEther(_30days)),
  //       _90days: Number(ethers.utils.formatEther(_90days)),
  //       _180days: Number(ethers.utils.formatEther(_180days)),
  //       _365days: Number(ethers.utils.formatEther(_365days)),
  //       _apr: Number(ethers.utils.formatEther(_apr))
  //     })
  //   })()
  // }, [amount, accumulateReward])


  return (
    <div className="mb-6">
      <div className="flex justify-between">
        <div className="text-sm text-black">APR(%)</div>
        <div className="text-sm text-black"><RenderNumberFormat amount={aprResult._apr} className="mr-2" fractionDigits={2} /></div>
      </div>
      <div className="flex justify-between">
        <div className="text-sm text-black">30 days</div>
        <div className="text-sm text-black"><RenderNumberFormat amount={aprResult._30days} className="mr-2" fractionDigits={2} /> U2U</div>
      </div>
      <div className="flex justify-between">
        <div className="text-sm text-black">90 days</div>
        <div className="text-sm text-black"><RenderNumberFormat amount={aprResult._90days} className="mr-2" fractionDigits={2} /> U2U</div>
      </div>
      <div className="flex justify-between">
        <div className="text-sm text-black">180 days</div>
        <div className="text-sm text-black"><RenderNumberFormat amount={aprResult._180days} className="mr-2" fractionDigits={2} />U2U</div>
      </div>
      <div className="flex justify-between">
        <div className="text-sm text-black">365 days</div>
        <div className="text-sm text-black"><RenderNumberFormat amount={aprResult._365days} className="mr-2" fractionDigits={2} /> U2U</div>
      </div>
    </div>
  )
}