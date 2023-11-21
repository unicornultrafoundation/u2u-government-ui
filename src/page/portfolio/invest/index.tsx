import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { classNames} from "../../../utils";
import {  TabOption } from "../../../components";
import { Locked } from "./Locked";
import { Staked } from "./Staked";

const tabs: TabOption[] = [
  {
    key: "staked",
    label: "Staked"
  },
  {
    key: "locked",
    label: "Locked"
  }
]

export const MyInvestment = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(tabs[0].key)
  const activeTabIndex = useMemo(() => {
    return tabs.findIndex(tab => tab.key === activeTab)
  }, [activeTab])
  const handleChangeTab = (tab: TabOption) => {
    setActiveTab(tab.key)
  }

  return (
    <div className="text-left">
      <div className="text-[24px] text-text font-bold">{t("My Investment")}</div>
      <div className="mt-8 flex gap-6">
        {
          tabs.map((item: TabOption, index: number) => {
            return (
              <div
                onClick={() => handleChangeTab(item)}
                className={classNames("text-base font-semibold cursor-pointer", index === activeTabIndex ? "text-primary" : "text-text-disabled")}
                key={index}>{t(item.label)}</div>
            )
          })
        }
      </div>
      {
        activeTab === "locked" ? <Locked /> : <Staked />
      }
    </div>
  )
}