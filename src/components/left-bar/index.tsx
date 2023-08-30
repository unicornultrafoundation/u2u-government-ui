import { StakingLogo } from "./staking-logo"
import bookIcon from "../../images/icons/book.svg"
import bookActiveIcon from "../../images/icons/book-active.svg"
import peopleIcon from "../../images/icons/people.svg"
import peopleActiveIcon from "../../images/icons/people-active.svg"
import homeIcon from "../../images/icons/home.svg"
import homeActiveIcon from "../../images/icons/home-active.svg"
import { useState } from "react"
import { useNavigate } from "react-router"

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
    id: "u2u_staking",
    name: "My U2U Staking",
    icon: peopleIcon,
    activeIcon: peopleActiveIcon,
    link: "/portfolio"
  }, {
    id: "validator",
    name: "Validator",
    icon: bookIcon,
    activeIcon: bookActiveIcon,
    link: "validator"
  }
]

export const LeftBar = () => {
  const [navActive, setNavActive] = useState<NavProps>(navs[0])
  const navigate = useNavigate()
  const handleClick = (index: number) => {
    setNavActive(navs[index])
    navigate(navs[index].link)
  }
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
               onClick={() => {handleClick(index)}}>
                <img src={item.id === navActive.id ? item.activeIcon : item.icon} alt="_u2u" />
                <div className={`${item.id === navActive.id ? "text-green" : "text-black-1"} text-base`} >{item.name}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}