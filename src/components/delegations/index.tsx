import { Delegation } from "../../types";
import { bigFormatEther, exploreAddress, truncate } from "../../utils";
import { Tbody, Td, Th, Thead } from "../table"
import { RenderNumberFormat } from "../text";

interface Header {
  name: string;
  subName?: string
}

const headers: Header[] = [
  {
    name: "Address"
  },
  {
    name: "Staked",
    subName: "(U2U)"
  },
  {
    name: "Claimed Rewards",
    subName: "(U2U)"
  }
]

interface DelegationListProps {
  delegations: Delegation[]
}

export const DelegationList = ({ delegations }: DelegationListProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <Thead>
          <tr>
            {
              headers.map((header: Header, index: number) => {
                return (
                  <Th index={index} length={headers.length} key={index}>
                    <div className={`${index === 1 ? "text-right" : ""}`}>
                      <div className={`text-lg font-normal`}>{header.name}</div>
                      {
                        header.subName ? <div className="text-xs text-gray font-light">{header.subName}</div> : <></>
                      }
                    </div>
                  </Th>
                )
              })
            }
          </tr>
        </Thead>
        <Tbody>
          {
            delegations.map((row: Delegation, index: number) => {
              return (
                <tr key={index}>
                  <Td index={index} className={`text-green ${index === delegations.length - 1 ? "rounded-bl-lg" : ""}`}>
                    <a href={exploreAddress(row.delegatorAddress)} target="_blank" rel="noopener noreferrer">{truncate({ str: row.delegatorAddress })}</a>
                  </Td>
                  <Td index={index} className="text-right text-base font-medium">
                    <RenderNumberFormat amount={bigFormatEther(row.stakedAmount)} fractionDigits={2} />
                  </Td>
                  <Td index={index} className={`text-right font-medium ${index === delegations.length - 1 ? "rounded-br-lg" : ""}`}>
                    <RenderNumberFormat amount={bigFormatEther(row.totalClaimedRewards)} fractionDigits={2} />
                  </Td>
                </tr>
              )
            })
          }
        </Tbody>
      </table>
    </div>
  )
}