import { useLocation, useNavigate } from "react-router-dom"
import { CloseIcon, Images } from "../../images"
import { NavProps, navs } from "../left-bar"
import { StakingLogo } from "../left-bar/StakingLogo"
import { useCallback } from "react"

interface MenuMobileProps {
  isShow: boolean
  setIsShow: (show: boolean) => void
}

export const MenuMobile = ({isShow, setIsShow}: MenuMobileProps) => {

  const navigate = useNavigate()
  let { pathname } = useLocation();
  const activeNav = useCallback((id: string): boolean => {
    switch (true) {
      case pathname === "/":
      case pathname === "":
        return "home" === id
      case pathname.indexOf("portfolio") > -1:
        return "portfolio" === id
      case pathname.indexOf("validator") > -1:
        return "validator" === id
      default:
        return "home" === id
    }
  }, [pathname])

  const handleClick = (index: number) => {
    navigate(navs[index].link)
    setIsShow(false)
  }

  if (!isShow) return <></>
  return (
    <div className="fixed top-0 left-0 w-screen h-screen border border-border-outline bg-neutral-surface p-4 z-50">
      <div className="flex justify-between items-center"> 
        <StakingLogo />
        <button
          className="w-[44px] h-[44px] rounded-full border-[1.5px] border-border-outline flex justify-center items-center cursor-pointer"
          onClick={() => setIsShow(false)}>
          <CloseIcon />
        </button>
      </div>
      <div className="mt-[24px] w-full px-4">
        {
          navs.map((item: NavProps, index: number) => {
            return (
              <div
                className={`${activeNav(item.id) ? "bg-primary" : ""} w-full flex items-center gap-4 cursor-pointer p-6 rounded-2xl font-semibold text-base`}
                key={index}
                onClick={() => { handleClick(index) }}>
                <img src={activeNav(item.id) ? item.activeIcon : item.icon} className="w-[24px] h-[24px]" alt="_u2u" />
                <div className={`${activeNav(item.id) ? "text-neutral-surface" : "text-text-disabled"}`} >{item.name}</div>
              </div>
            )
          })
        }
      </div>
      <div className="w-full px-8 py-8 absolute bottom-0 left-0 ">
        <div className="text-sm text-text">© 2023 Unicorn Ultra (U2U). All rights reserved</div>
        <div className="flex item-center justify-between mt-4">
          <a href="https://uniultra.xyz" target="_blank" rel="noopener noreferrer">
            <div className="flex items-center w-[28px] h-[28px] justify-center">
              <img src={Images.u2uIcon} alt="u2u" />
            </div>
          </a>
          <a href="https://www.facebook.com/profile.php?id=100095507674287" target="_blank" rel="noopener noreferrer">
            <div className="flex items-center w-[28px] h-[28px] justify-center">
              <img src={Images.facebookIcon} alt="u2u" />
            </div>
          </a>
          <a href="https://www.youtube.com/@UnicornUltra" target="_blank" rel="noopener noreferrer">
            <div className="flex items-center w-[28px] h-[28px] justify-center">
              <img src={Images.youtubeIcon} alt="u2u" />
            </div>
          </a>
          <a href="https://twitter.com/uniultra_xyz" target="_blank" rel="noopener noreferrer">
            <div className="flex items-center w-[28px] h-[28px] justify-center">
              <img src={Images.twitterIcon} alt="" />
            </div>
          </a>
          <a href="https://t.me/UnicornUltra" target="_blank" rel="noopener noreferrer">
            <div className="flex items-center w-[28px] h-[28px] justify-center">
              <img src={Images.telegramIcon} alt="u2u" />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}