import { ReactNode, useEffect } from "react"
import { LeftBar } from "../left-bar"
import { Header } from "../header"
import { useAuth } from "../../hooks";
import { connectorLocalStorageKey } from "../../contants";
import { ConnectorNames } from "../../utils";

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
      <LeftBar></LeftBar>
      <div className="w-full px-5">
        <Header />
        <div className="py-6">{children}</div>
      </div>
    </div>
  )
}