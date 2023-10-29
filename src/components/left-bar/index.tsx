import { StakingLogo } from "./StakingLogo"
import { useCallback } from "react"
import { useNavigate } from "react-router"
import { useLocation } from "react-router-dom"
import AppStore from "../../images/appstore.png"
import GgPlay from "../../images/ggplay.png"
import { useTranslation } from "react-i18next"
import { Images } from "../../images"

export interface NavProps {
  id: string
  name: string
  icon: any
  activeIcon: any
  link: string
}

export const navs: NavProps[] = [
  {
    id: "home",
    name: "Home",
    icon: Images.homeIcon,
    activeIcon: Images.homeActiveIcon,
    link: "/"
  }, {
    id: "portfolio",
    name: "Staking",
    icon: Images.profileIcon,
    activeIcon: Images.profileActiveIcon,
    link: "portfolio"
  }, {
    id: "validator",
    name: "Validators",
    icon: Images.userIcon,
    activeIcon: Images.userActiveIcon,
    link: "validators"
  }
]

export const LeftBar = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const handleClick = (index: number) => {
    navigate(navs[index].link)
  }
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

  return (
    <div className="overflow-y-auto fixed left-0 top-0 px-8 py-2 w-[270px] bg-neutral-surface border-r-2 border-border-outline h-screen z-20">
      <StakingLogo />
      <div className="mt-[24px] pt-2 pb-8 w-full">
        {
          navs.map((item: NavProps, index: number) => {
            return (
              <div
                className={`${activeNav(item.id) ? "bg-primary" : ""} w-full flex items-center gap-4 cursor-pointer px-6 py-4 rounded-2xl font-semibold text-base`}
                key={index}
                onClick={() => { handleClick(index) }}>
                <img src={activeNav(item.id) ? item.activeIcon : item.icon} className="w-[24px] h-[24px]" alt="_u2u" />
                <div className={`${activeNav(item.id) ? "text-neutral-surface" : "text-text-disabled"}`} >{item.name}</div>
              </div>
            )
          })
        }
      </div>
      <div className="w-full rounded-[18px] bg-gradient-1 px-4 pt-8 pb-6">
        <div className="font-bold text-base text-neutral">{t('Explore U2U wallet to get more secret gift!')}</div>
        <div className="flex justify-center my-4">
          <img src={Images.layer2Image} alt="u2u" />
        </div>
        <div className="flex justify-center mt-8">
          <a href="https://play.google.com/store/apps/details?id=org.u2u.wallet" target="_blank" rel="noopener noreferrer">
            <img src={GgPlay} alt="u2u" width={180} />
          </a>
        </div>
        <div className="flex justify-center mt-2">
          <a href="https://apps.apple.com/vn/app/u2u-wallet/id6446194312" target="_blank" rel="noopener noreferrer">
            <img src={AppStore} alt="u2u" width={180} />
          </a>
        </div>
      </div>
      <div className="w-full px-4 pt-8 pb-6">
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