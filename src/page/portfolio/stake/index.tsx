import { useMemo, useState } from "react"
import { TabOption } from "../../../components"
import { classNames } from "../../../utils"
import { StakeForm } from "./StakeForm"
import { LockForm } from "./LockForm"
import { UnStakeForm } from "./UnStakeForm"
import { Rewards } from "./Rewards"
import { isMobile } from 'mobile-device-detect';
import { useTranslation } from "react-i18next"

const tabs: TabOption[] = [
  {
    key: "stake",
    label: "Stake"
  },
  {
    key: "lock",
    label: "Lock"
  },
  {
    key: "unstake",
    label: "Unstake"
  },
  {
    key: "rewards",
    label: "Rewards"
  }
]

export const StakingContainer = () => {

  const { t } = useTranslation()

  const [activeTab, setActiveTab] = useState(tabs[0].key)
  const activeTabIndex = useMemo(() => {
    return tabs.findIndex(tab => tab.key === activeTab)
  }, [activeTab])

  const handleChangeTab = (tab: TabOption) => {
    setActiveTab(tab.key)
  }

  const renderTab = useMemo(() => {
    switch (activeTab) {
      case "stake":
       return <StakeForm />
      case "lock":
        return <LockForm />
      case "unstake": 
        return <UnStakeForm />
      case "rewards": 
        return <Rewards />
      default:
        return <></>
    }
  }, [activeTab])

  return (
    <div>
      <div className="w-full grid grid-cols-12 pb-6 overflow-x-auto">
          {
            tabs.map((item: TabOption, index: number) => {
              return (
                <div key={index} className={classNames(isMobile ? "col-span-6 mb-2" : "col-span-3", index < 3 && "border-r border-border-outline")} onClick={() => handleChangeTab(item)}>
                  <div className={classNames("text-[20px] font-bold cursor-pointer", index === activeTabIndex ? "text-text" : "text-text-disabled")}>{t(item.label)}</div>
                </div>
              )
            })
          }
      </div>
      <div className="w-full w-full overflow-x-auto">
            {renderTab}
          </div>
    </div>
  )
}