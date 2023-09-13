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
        <div className="flex item-center gap-4 mb-6">
          <a href="https://play.google.com/store/apps/details?id=org.u2u.wallet" target="_blank" rel="noopener noreferrer">
            <img src={GgPlay} alt="u2u" />
          </a>
          <a href="https://apps.apple.com/vn/app/u2u-wallet/id6446194312" target="_blank" rel="noopener noreferrer">
            <img src={AppStore} alt="u2u" />
          </a>
        </div>
        <div className="text-left text-sm font-semibold mb-2">Find us on:</div>
        <div className="flex item-center gap-4">
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