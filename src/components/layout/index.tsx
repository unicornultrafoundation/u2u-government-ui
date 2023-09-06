import { ReactNode, useEffect } from "react"
import { LeftBar } from "../left-bar"
import { Header } from "../header"
import { useAuth } from "../../hooks";
import { connectorLocalStorageKey } from "../../contants";
import { ConnectorNames } from "../../utils";
import { isMobile } from 'mobile-device-detect';

interface Props {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {

  const { login } = useAuth()
  useEffect(() => {
    const connectorID = window.localStorage.getItem(connectorLocalStorageKey);
    if (connectorID) {
      login(connectorID as ConnectorNames)
    }
    // eslint-disable-next-line
  }, [])
  return (
    <div className="flex">
      {!isMobile && <LeftBar />}
      <div className="w-full">
        <div className="w-full">
          <Header />
        </div>
        <div className="px-5">
          <div className="p-8 pb-10">{children}</div>
        </div>
      </div>
    </div>
  )
}