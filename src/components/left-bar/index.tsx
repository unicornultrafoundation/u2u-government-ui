import { StakingLogo } from "./StakingLogo"
import bookIcon from "../../images/icons/book.svg"
import bookActiveIcon from "../../images/icons/book-active.svg"
import peopleIcon from "../../images/icons/people.svg"
import peopleActiveIcon from "../../images/icons/people-active.svg"
import homeIcon from "../../images/icons/home.svg"
import homeActiveIcon from "../../images/icons/home-active.svg"
import { useCallback } from "react"
import { useNavigate } from "react-router"
import { useLocation } from "react-router-dom"
import AppStore from "../../images/appstore.png"
import GgPlay from "../../images/ggplay.png"

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
    icon: homeIcon,
    activeIcon: homeActiveIcon,
    link: "/"
  }, {
    id: "portfolio",
    name: "My Staking",
    icon: peopleIcon,
    activeIcon: peopleActiveIcon,
    link: "portfolio"
  }, {
    id: "validator",
    name: "Validators",
    icon: bookIcon,
    activeIcon: bookActiveIcon,
    link: "validators"
  }
]

export const LeftBar = () => {
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
    <div className="py-[29px] w-[300px] bg-white min-h-screen border-r-2 border-lightGray fixed top-0 left-0">
      <StakingLogo />
      <div className="mt-[70px]">
        {
          navs.map((item: NavProps, index: number) => {
            return (
              <div
                className="flex items-center gap-2 my-3 p-3 bg-white font-semibold cursor-pointer ml-[40px]"
                key={index}
                onClick={() => { handleClick(index) }}>
                <img src={activeNav(item.id) ? item.activeIcon : item.icon} alt="_u2u" />
                <div className={`${activeNav(item.id) ? "text-green" : "text-black-1"} text-base`} >{item.name}</div>
              </div>
            )
          })
        }
      </div>
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <div className="text-left text-sm font-semibold mb-2">Download U2U Wallet</div>
        <div className="flex item-center gap-2 mb-6">
          <a href="https://play.google.com/store/apps/details?id=org.u2u.wallet" target="_blank" rel="noopener noreferrer">
            <img src={GgPlay} alt="u2u" />
          </a>
          <a href="https://apps.apple.com/vn/app/u2u-wallet/id6446194312" target="_blank" rel="noopener noreferrer">
            <img src={AppStore} alt="u2u" />
          </a>
        </div>
        <div className="text-left text-sm font-semibold mb-2">Find us on:</div>
        <div className="flex item-center justify-between">
          <a href="https://uniultra.xyz" target="_blank" rel="noopener noreferrer">
            <div className="w-[35px] h-[35px] rounded-lg bg-pale leading-[35px] text-green text-lg">
              <i className="fa fa fa-globe"></i>
            </div>
          </a>
          <a href="https://www.facebook.com/profile.php?id=100095507674287" target="_blank" rel="noopener noreferrer">
            <div className="w-[35px] h-[35px] rounded-lg bg-pale leading-[35px] text-green text-lg">
              <i className="fa fa-facebook"></i>
            </div>
          </a>
          <a href="https://www.youtube.com/@UnicornUltra" target="_blank" rel="noopener noreferrer">
            <div className="w-[35px] h-[35px] rounded-lg bg-pale leading-[35px] text-green text-lg">
              <i className="fa fa-youtube"></i>
            </div>
          </a>
          <a href="https://twitter.com/uniultra_xyz" target="_blank" rel="noopener noreferrer">
            <div className="w-[35px] h-[35px] rounded-lg bg-pale leading-[35px] text-green text-lg">
              <i className="fa fa-twitter"></i>
            </div>
          </a>
          <a href="https://t.me/UnicornUltra" target="_blank" rel="noopener noreferrer">
            <div className="w-[35px] h-[35px] rounded-lg bg-pale leading-[35px] text-green text-lg">
              <i className="fa fa-telegram"></i>
            </div>
          </a>
        </div>

        <div className="w-full h-[2px] bg-lightGray my-6"></div>
        <div className="text-left text-sm font-semibold pb-6">
          <div>© 2023 Unicorn Ultra (U2U).</div>
          <div>All rights reserved</div>
        </div>
      </div>
    </div>
  )
}