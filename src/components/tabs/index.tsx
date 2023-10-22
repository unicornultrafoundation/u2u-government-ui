import React, { useMemo, useState } from "react"
import { classNames } from "../../utils"

export interface TabOption {
  key: string
  label: string
}

interface TabsCardProps {
  tabs: TabOption[]
  children?: React.ReactNode
  defaultTab?: TabOption[]
  onChangeTab?: (tab: TabOption) => void
}

export const TabsCard = ({
  tabs,
  defaultTab,
  children,
  onChangeTab
}: TabsCardProps) => {

  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.key || '')

  const activeTabIndex = useMemo(() => {
    return tabs.findIndex(tab => tab.key === activeTab)
  }, [activeTab, tabs])

  const handleChangeTab = (tab: TabOption) => {
    setActiveTab(tab.key)
    onChangeTab && onChangeTab(tab)
  }

  if (tabs.length === 0) return <></>

  return (
    <div>
      <div className="flex gap-6 mb-6">
        {
          tabs.map((tab: TabOption, index: number) => {
            return (
              <div
                key={index}
                className={classNames("text-[24px] font-bold cursor-pointer", tab.key === activeTab ? "text-primary" : "text-text-disabled")}
                onClick={() => handleChangeTab(tab)}
              >
                <div className="">
                  {tab.label}
                </div>
              </div>
            )
          })
        }
      </div>
        {
          (() => {
            if (!Array.isArray(children)) {
              return children
            }
            return children.map((child, index) => {
              if (index === activeTabIndex) {
                return <div key={index} >{child}</div>
              }
              return <div key={index}></div>
            })
          })()
        }
    </div>
  )
}