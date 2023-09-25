import React, { useMemo, useState } from "react"

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
      <div className="flex gap-6">
        {
          tabs.map((tab: TabOption, index: number) => {
            return (
              <div
                key={index}
                className="text-[26px] text-black-2 mb-6 cursor-pointer"
                onClick={() => handleChangeTab(tab)}
              >
                <div className="">
                  {tab.label}
                </div>
                {
                  tab.key === activeTab && <div className="h-[4px] bg-green mt-2"></div>
                }
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