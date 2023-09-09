import U2U from "../../images/unicorn-ultra.png"
import AppStore from "../../images/appstore.png"
import GgPlay from "../../images/ggplay.png"

export const Footer = () => {
  return (
    <div>
      <div className="p-6 w-full bg-[#F4FAFA]">
        <div className="my-8">
          <img src={U2U} alt="" />
        </div>
        <div className="text-left text-sm font-semibold mb-2">Download U2U Wallet</div>
        <div className="flex item-center justify-between gap-2 mb-6">
          <img src={GgPlay} alt="u2u" className="w-6/12" />
          <img src={AppStore} alt="u2u" className="w-6/12"/>
        </div>
        <div className="text-left text-sm font-semibold mb-2">Find us on:</div>
        <div className="flex item-center justify-between">
          <div className="w-[35px] h-[35px] rounded-lg bg-pale leading-[35px] text-green text-lg">
            <i className="fa fa-facebook"></i>
          </div>
          <div className="w-[35px] h-[35px] rounded-lg bg-pale leading-[35px] text-green text-lg">
            <i className="fa fa-instagram"></i>
          </div>
          <div className="w-[35px] h-[35px] rounded-lg bg-pale leading-[35px] text-green text-lg">
            <i className="fa fa-youtube"></i>
          </div>
          <div className="w-[35px] h-[35px] rounded-lg bg-pale leading-[35px] text-green text-lg">
            <i className="fa fa-twitter"></i>
          </div>
          <div className="w-[35px] h-[35px] rounded-lg bg-pale leading-[35px] text-green text-lg">
            <i className="fa fa-telegram"></i>
          </div>
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