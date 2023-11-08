import { useNavigate } from "react-router-dom"
import { Images } from "../../images"

export const StakingLogo = () => {
  const navigate = useNavigate()
  return (
    <div className="py-4 px-[22px] flex items-center justify-center gap-1 cursor-pointer" onClick={() => navigate("")}>
      <img src={Images.StakingLogoPNG} alt="u2u" className="w-full" />
    </div>
  )
}