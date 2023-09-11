import { useTranslation } from "react-i18next"
import { Button, buttonType } from "../button"
import { useBalance } from "../../hooks"
import { exploreAddress, truncate } from "../../utils"
import { useWeb3React } from "@web3-react/core"
import MetamaskIcon from "../../images/metamask-wallet.png"
import { RenderNumberFormat } from "../text"
import { useNavigate } from "react-router-dom"
import { isMobile } from 'mobile-device-detect';
import { StakingLogo } from "../left-bar/StakingLogo"
import MenuIcon from "../../images/icons/menu-icon.svg"
import { NavProps, navs } from "../left-bar"
import { useCallback, useState } from "react"
import { WalletLoginModal } from "../modal/WalletLoginModal"

export const Header = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { balance } = useBalance()
  const navigate = useNavigate()
  const [isShow, setIsShow] = useState(false)

  const [isOpen, setIsOpen] = useState(false) 

  const handleClick = (index: number) => {
    navigate(navs[index].link)
    setIsShow(false)
  }

  const connect = useCallback(async () => {
    setIsOpen(true)
  }, [])

  if (isMobile) {
    return (
      <div className="w-full">
        {
          !account && (
            <div className="flex justify-center gap-4 py-2">
              <Button onClick={() => navigate("/validator/register")}>{t('Validator Register')}</Button>
              <Button variant={buttonType.secondary} onClick={() => connect()}>{t('Connect Wallet')}</Button>
            </div>
          )
        }
        <div className="flex justify-between items-center border-y py-4 px-5">
          <StakingLogo />
          <img src={MenuIcon} alt="u2u" onClick={() => setIsShow(!isShow)} />
        </div>
        <div className="bg-white fixed top-[100px] w-screen left-0">
          {
            isShow && navs.map((item: NavProps, index: number) => {
              return (
                <div
                  className="flex items-center gap-2 my-3 p-3 font-semibold cursor-pointer"
                  key={index}
                  onClick={() => { handleClick(index) }}>
                  <img src={item.icon} alt="_u2u" />
                  <div className={`${"text-black-1"} text-base`} >{item.name}</div>
                </div>
              )
            })
          }
        </div>
        {
          account && (
            <div className="flex justify-items py-4 w-full px-5">
              <div className="flex items-center p-3 bg-[#EBFCFB] rounded-lg gap-5 text-left w-full">
                <img src={MetamaskIcon} alt="u2u" className="w-[35px] h-[35px]" />
                <div>
                  <div className="text-base font-medium">
                    <RenderNumberFormat amount={balance} className="mr-2" /> U2U
                  </div>
                  <div className="text-xs text-green">
                    <a href={exploreAddress(account)} target="_blank" rel="noopener noreferrer">{truncate({ str: account })}</a>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        <WalletLoginModal isOpenModal={isOpen} setIsOpenModal={setIsOpen}/>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-end w-full py-4 gap-4 px-5">
      <Button className="w-[200px]" onClick={() => navigate("/validator/register")}>{t('Validator Register')}</Button>
      {
        account ? (
          <div className="flex justify-end">
            <div className="flex items-center p-3 bg-[#EBFCFB] rounded-lg gap-5 text-left">
              <img src={MetamaskIcon} alt="u2u" className="w-[35px] h-[35px]" />
              <div>
                <div className="text-base font-medium">
                  <RenderNumberFormat amount={balance} className="mr-2" /> U2U
                </div>
                <div className="text-xs text-green">
                  <a href={exploreAddress(account)} target="_blank" rel="noopener noreferrer">{truncate({ str: account })}</a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-4">
            <Button variant={buttonType.secondary} onClick={() => connect()}>{t('Connect Wallet')}</Button>
          </div>
        )
      }
      <WalletLoginModal isOpenModal={isOpen} setIsOpenModal={setIsOpen}/>
    </div>
  )
}