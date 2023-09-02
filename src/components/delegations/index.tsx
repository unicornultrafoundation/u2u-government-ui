import { Delegation } from "../../types";
import { bigFormatEther, truncate } from "../../utils";
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
    name: "Rewards",
    subName: "(U2U)"
  }
]

interface DelegationListProps {
  delegations: Delegation[]
}

export const DelegationList = ({ delegations }: DelegationListProps) => {
  return (
    <div>
      <table className="w-full">
        <Thead>
          <tr>
            {
              headers.map((header: Header, index: number) => {
                console.log(index, index, headers.length)
                return (
                  <Th index={index} length={headers.length}>
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
                <tr>
                  <Td index={index} className={`text-green ${index === delegations.length - 1 ? "rounded-bl-lg" : ""}`}>{truncate({ str: row.delegatorAddress })}</Td>
                  <Td index={index} className="text-right text-base font-medium">
                    <RenderNumberFormat amount={bigFormatEther(row.stakedAmount)} />
                  </Td>
                  <Td index={index} className={`text-right font-medium ${index === delegations.length - 1 ? "rounded-br-lg" : ""}`}>NaN</Td>
                </tr>
              )
            })
          }
        </Tbody>
      </table>
    </div>
  )
}