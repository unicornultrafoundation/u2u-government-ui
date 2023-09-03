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

interface NavProps {
  id: string
  name: string
  icon: any
  activeIcon: any
  link: string
}

const navs: NavProps[] = [
  {
    id: "home",
    name: "Home",
    icon: homeIcon,
    activeIcon: homeActiveIcon,
    link: "/"
  }, {
    id: "portfolio",
    name: "My U2U Staking",
    icon: peopleIcon,
    activeIcon: peopleActiveIcon,
    link: "portfolio"
  }, {
    id: "validator",
    name: "Validator",
    icon: bookIcon,
    activeIcon: bookActiveIcon,
    link: "validator"
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
    <div className="px-[59px] py-[29px] w-[400px] bg-white min-h-screen border-r-2 border-lightGray">
      <StakingLogo />
      <div className="mt-[70px]">
        {
          navs.map((item: NavProps, index: number) => {
            return (
              <div
                className="flex items-center gap-2 my-3 p-3 bg-white font-semibold cursor-pointer"
                key={index}
                onClick={() => { handleClick(index) }}>
                <img src={activeNav(item.id) ? item.activeIcon : item.icon} alt="_u2u" />
                <div className={`${activeNav(item.id) ? "text-green" : "text-black-1"} text-base`} >{item.name}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}