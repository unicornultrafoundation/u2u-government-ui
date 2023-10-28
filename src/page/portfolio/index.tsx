import { TxHistory } from "./History"
import { WithdrawalList } from "./widthrawn"
import { StakingContainer } from "./stake"
import { MyInvestment } from "./invest"
import { isMobile } from 'mobile-device-detect';
import { classNames } from "../../utils";

export const Portfolio = () => {

  return (
    <div className={classNames(isMobile ? "px-4 py-6" : "px-8 py-6")}>
      <div className="w-full grid grid-cols-12 gap-6">
        <div className={classNames("py-8 px-10 border border-border-outline shadow-1 rounded-[24px]", isMobile ? "col-span-12" : "col-span-6")}>
          <StakingContainer />
        </div>
        <div className={classNames("py-8 px-10 border border-border-outline shadow-1 rounded-[24px]", isMobile ? "col-span-12" : "col-span-6")}>
          <MyInvestment />
        </div>
        <div className={classNames("py-8 px-10 border border-border-outline shadow-1 rounded-[24px]", isMobile ? "col-span-12" : "col-span-6")}>
          <TxHistory />
        </div>
          <div className={classNames("py-8 px-10 border border-border-outline shadow-1 rounded-[24px]", isMobile ? "col-span-12" : "col-span-6")}>
            <WithdrawalList />
          </div>
      </div>
    </div>
  )
}