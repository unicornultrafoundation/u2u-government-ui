import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { WithdrawalRequest } from "../../../types";
import { classNames} from "../../../utils";
import {  TabOption } from "../../../components";
import { WithdrawPending } from "./Pending";
import { WithdrawCompleted } from "./Completed";
import { useDelegatorStore } from "../../../store";

const tabs: TabOption[] = [
  {
    key: "pending",
    label: "Pending"
  },
  {
    key: "completed",
    label: "Completed"
  }
]

export const WithdrawalList = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(tabs[0].key)
  const activeTabIndex = useMemo(() => {
    return tabs.findIndex(tab => tab.key === activeTab)
  }, [activeTab])
  const handleChangeTab = (tab: TabOption) => {
    setActiveTab(tab.key)
  }

  const [withdrawalRequests] = useDelegatorStore(state => [
    state.withdrawalRequests
  ])

  const wrPending = useMemo(() => {
    if (withdrawalRequests && withdrawalRequests.length > 0) {
      return withdrawalRequests.filter((item: WithdrawalRequest) => !item.withdrawable)
    }
    return []
  }, [withdrawalRequests])

  const wrCompleted = useMemo(() => {
    if (withdrawalRequests && withdrawalRequests.length > 0) {
      return withdrawalRequests.filter((item: WithdrawalRequest) => !!item.withdrawable)
    }
    return []
  }, [withdrawalRequests])

  return (
    <div className="text-left">
      <div className="text-[24px] text-text font-bold">{t("Withdraw")}</div>
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
        activeTab === "pending" ? <WithdrawPending wr={wrPending}/> : <WithdrawCompleted wr={wrCompleted}/>
      }
    </div>
  )
}