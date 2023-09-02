import DesktopLogo from "../../images/u2u-logo.png"


export const StakingLogo = () => {
  return (
    <div className="flex items-center justify-center gap-1">
      <img src={DesktopLogo} alt="_u2u" />
      <div className="text-green text-[27px] font-semibold">U2U</div>
      <div className="text-black text-[27px]">Staking</div>
    </div>
  )
}