import { ReactNode } from "react"
import { LeftBar } from "../left-bar"
import { Header } from "../header"
import { classNames } from "../../utils";
import { isMobile } from 'mobile-device-detect';

interface Props {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  // const { login } = useAuth()
  // useEffect(() => {
  //   try {
  //       const connectorID = window.localStorage.getItem(connectorLocalStorageKey);
  //       if (connectorID) {
  //         (async () => {
  //           await login(connectorID as ConnectorNames)
  //         })()
  //       }
  //     } catch (error) {
  //   }
  //   // eslint-disable-next-line
  // }, [])

  return (
    <div className="flex">
      {!isMobile && <LeftBar />}
      <div className={classNames(`w-full`, !isMobile ? "ml-[270px]" : "ml-0")}>
        <div className="w-full">
          <Header />
        </div>
        <div>{children}</div>
        {/* {isMobile && <Footer />} */}
      </div>
    </div>
  )
}