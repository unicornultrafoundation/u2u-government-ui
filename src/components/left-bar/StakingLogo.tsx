import { useNavigate } from "react-router-dom"
import DesktopLogo from "../../images/u2u-logo.png"


export const StakingLogo = () => {
  const navigate = useNavigate()
  return (
    <div className="py-4 px-[22px] flex items-center justify-center gap-1 cursor-pointer" onClick={() => navigate("")}>
      <img src={DesktopLogo} alt="_u2u" />
      <div className="text-green text-[25.3px] font-bold">U2U</div>
      <div className="text-black text-[25.3px]">Staking</div>
    </div>
  )
}