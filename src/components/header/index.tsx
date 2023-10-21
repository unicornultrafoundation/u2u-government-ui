import { useTranslation } from "react-i18next"
import { useWeb3React } from "@web3-react/core"
import { Button, buttonScale, buttonType } from "../button"
import { useAuth, useBalance } from "../../hooks"
import { exploreAddress, truncate } from "../../utils"
import { RenderNumberFormat } from "../text"
import { useNavigate } from "react-router-dom"
import { isMobile } from 'mobile-device-detect';
import { StakingLogo } from "../left-bar/StakingLogo"
import { NavProps, navs } from "../left-bar"
import { useCallback, useEffect, useRef, useState } from "react"
import { WalletLoginModal } from "../modal/WalletLoginModal"
import { ArrowDownIcon, CopyIcon, GlobeIcon, Images, LogoutIcon, OptionIcon, UserIcon, WalletIcon } from "../../images"
import { appConfig } from "../../contants"
import { useCopyToClipboard } from 'usehooks-ts'
import { toastSuccess } from "../toast"

export const Header = () => {
  const { t } = useTranslation()
  const { account, isActive } = useWeb3React()
  const { balance } = useBalance()
  const navigate = useNavigate()
  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isShowAccountDetail, setIsShowAccountDetail] = useState(false)
  const { logout } = useAuth()

  const [, copy] = useCopyToClipboard()

  const mobileMenuRef = useRef(null);
  const accountDetailsRef = useRef(null)

  const handleClick = (index: number) => {
    navigate(navs[index].link)
    setIsShowMobileMenu(false)
  }

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (mobileMenuRef.current && !(mobileMenuRef.current as any).contains(event.target)) {
        setIsShowMobileMenu(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuRef]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (accountDetailsRef.current && !(accountDetailsRef.current as any).contains(event.target)) {
        setIsShowAccountDetail(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [accountDetailsRef]);

  const handleOpenMenu = useCallback(() => {
    setIsShowMobileMenu(!isShowMobileMenu)
  }, [isShowMobileMenu])

  const connect = useCallback(async () => {
    setIsOpen(true)
  }, [])

  const onCopyAdd = useCallback(async (str: string) => {
    const c = await copy(str)
    if (c) {
      toastSuccess(t("Copied Successfully"), t('Success'))
    }
    // eslint-disable-next-line
  }, [t])

  if (isMobile) {
    return (
      <div className="w-full relative">
        {
          !isActive && (
            <div className="flex justify-center gap-4 py-2">
              <Button onClick={() => navigate("/validator/register")}>{t('Validator Register')}</Button>
              <Button variant={buttonType.secondary} onClick={() => connect()}>{t('Connect Wallet')}</Button>
            </div>
          )
        }
        <div ref={mobileMenuRef}>
          <div className="flex justify-between items-center border-y py-4 px-5">
            <div onClick={() => setIsShowMobileMenu(false)}>
              <StakingLogo />
            </div>
            <img src={Images.MenuIcon} alt="u2u" onClick={handleOpenMenu} />
          </div>
          {isShowMobileMenu &&
            <div className={`bg-white absolute w-screen left-0 ${isActive ? "top-[100px]" : "top-[150px]"}`}>
              {
                navs.map((item: NavProps, index: number) => {
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
              {isActive && <div className="text-green gap-2 my-3 p-3 px-6 text-center font-semibold cursor-pointer"
                onClick={() => {
                  logout()
                  setIsShowMobileMenu(false)
                }}>Logout</div>}
            </div>
          }
        </div>

        {
          isActive && (
            <div className="flex justify-items py-4 w-full px-5">
              <div className="flex items-center p-3 bg-[#EBFCFB] rounded-lg gap-5 text-left w-full">
                <img src={Images.MetamaskIcon} alt="u2u" className="w-[35px] h-[35px]" />
                <div>
                  <div className="text-base font-medium">
                    <RenderNumberFormat amount={balance} className="mr-2" /> U2U
                  </div>
                  <div className="text-xs text-green">
                    <a href={exploreAddress(account || "")} target="_blank" rel="noopener noreferrer">{truncate({ str: account || "" })}</a>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        <WalletLoginModal isOpenModal={isOpen} setIsOpenModal={setIsOpen} />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-end w-full py-4 gap-4 px-5">
      <Button
        variant={buttonType.secondary}
        className="font-semibold"
        scale={buttonScale.lg}
        onClick={() => navigate("/validator/register")}>
        <UserIcon className="mr-2" />
        {t('Validator Register')}
      </Button>
      {
        isActive ? (
          <div className="flex justify-end">
            <div className="flex items-center justify-between py-1 pr-4 pl-2 rounded-[45px] gap-2 text-left relative border border-border-outline min-w-[248px]">
              <div className="flex items-center gap-2">
                <img src={Images.AvatarImage} alt="u2u" className="w-[36px] h-[36px] rounded-full" />
                <div>
                  <div className="text-base text-text font-semibold">
                    {truncate({ str: account || "", headCount: 5 })}
                  </div>
                  <div className="text-xs text-text-secondary">{appConfig.networkName}</div>
                </div>
              </div>
              <ArrowDownIcon onClick={() => setIsShowAccountDetail(!isShowAccountDetail)} className="cursor-pointer" />
              {
                isShowAccountDetail &&
                <div ref={accountDetailsRef} className="absolute top-[60px] text-sm right-0 min-w-[320px] pt-2 bg-neutral-surface border border-border-outline shadow-shadow-1 rounded-[16px]">
                  <div className="text-lg font-semibold text-text-secondary px-6">{t("Connected")}</div>
                  <div className="flex items-center justify-between border-b border-border-outline pt-1 px-6 pb-3">
                    <div className="flex items-center gap-2">
                      <img src={Images.AvatarImage} alt="u2u" className="w-[36px] h-[36px] rounded-full" />
                      <div>
                        <div className="text-base text-text font-semibold">
                          {truncate({ str: account || "", headCount: 5 })}
                        </div>
                        <div className="text-xs text-text-secondary">{appConfig.networkName}</div>
                      </div>
                    </div>
                    <CopyIcon className="cursor-pointer" onClick={() => onCopyAdd(account || "")} />
                  </div>
                  <div className="py-3 px-6 border-b border-border-outline">
                    <div className="text-sm text-text-secondary">{t("Balance")}</div>
                    <div className="text-base font-semibold text-text">
                      <RenderNumberFormat amount={balance} className="mr-2" /><span>U2U</span>
                    </div>
                  </div>
                  <div className="py-3 px-6 border-b border-border-outline flex gap-4">
                    <GlobeIcon />
                    <a href={`${appConfig.explorer}address/${account}`} target="_blank" rel="noopener noreferrer">
                    <div className="text-base font-semibold text-text">{t("Explorer")}</div>
                    </a>
                  </div>
                  <div className="py-3 px-6 flex gap-4">
                    <LogoutIcon />
                    <div className="text-base font-semibold text-text cursor-pointer"
                    onClick={() => {
                      logout()
                      setIsShowAccountDetail(false)
                    }}>{t("Logout")}</div>
                  </div>
                </div>
              }
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-4">
            <Button
              className="font-semibold"
              scale={buttonScale.lg}
              variant={buttonType.primary}
              onClick={() => connect()}>
              <WalletIcon className="mr-2" />
              {t('Connect Wallet')}
            </Button>
          </div>
        )
      }
      <Button
        className="font-semibold w-[48px] h-[48px]"
        scale={buttonScale.icon}
        variant={buttonType.tertiary}>
        <OptionIcon className="fill-border-outline" />
      </Button>
      <WalletLoginModal isOpenModal={isOpen} setIsOpenModal={setIsOpen} />
    </div>
  )
}
