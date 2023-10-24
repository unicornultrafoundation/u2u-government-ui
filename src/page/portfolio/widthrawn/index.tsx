import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFetchWithdrawRequest } from "../../../hooks";
import { WithdrawalRequest } from "../../../types";
import { classNames} from "../../../utils";
import {  TabOption } from "../../../components";
import { WithdrawPending } from "./Pending";
import { WithdrawCompleted } from "./Completed";

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

interface WithdrawalListProps {
  delegator: string
}

export const WithdrawalList = ({
  delegator,
}: WithdrawalListProps) => {
  const { t } = useTranslation()
  const { wr: withdrawalRequests } = useFetchWithdrawRequest(delegator)
  const [activeTab, setActiveTab] = useState(tabs[0].key)
  const activeTabIndex = useMemo(() => {
    return tabs.findIndex(tab => tab.key === activeTab)
  }, [activeTab])

  const handleChangeTab = (tab: TabOption) => {
    setActiveTab(tab.key)
  }

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
                key={index}>{item.label}</div>
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