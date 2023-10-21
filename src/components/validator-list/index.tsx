import { Validator } from "../../types"

interface ValidatorListProps {
  validators: Validator[]
}
interface Header {
  name: string;
}

const headers: Header[] = [
  {
    name: "Validator"
  },
  {
    name: "Staked Amount (U2U)",
  },
  {
    name: "APR (%)"
  },
  {
    name: "Voting Power (%)"
  },
  {
    name: "Delegators"
  },
  {
    name: "Status"
  }
]
export const ValidatorList = ({
  validators
}: ValidatorListProps) => {
  if (validators.length === 0) return <></>
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-y border-border-outline">
            {
              headers.map((header: Header, index: number) => {
                return (
                  <th key={index} className="py-6">
                    <div className={``}>
                      <div className={`text-base text-text-secondary`}>{header.name}</div>
                    </div>
                  </th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            validators.length > 0 && validators.map((row: Validator, index: number) => {
              return (
                <tr key={index}>
                  <td className={`text-green`}>
                    {/* <a href={exploreAddress(row.delegatorAddress)} target="_blank" rel="noopener noreferrer">{truncate({ str: row.delegatorAddress })}</a> */}
                  </td>
                  <td  className="text-right text-base font-medium">
                    {/* <RenderNumberFormat amount={bigFormatEther(row.stakedAmount)} fractionDigits={2} /> */}
                  </td>
                  <td className={`text-right font-medium`}>
                    {/* <RenderNumberFormat amount={bigFormatEther(row.totalClaimedRewards)} fractionDigits={2} /> */}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {/* <Pagination
        limit={TableLimit}
        total={totalDelegator}
        onChangePage={onChangePage}
      /> */}
    </div>
  )
}