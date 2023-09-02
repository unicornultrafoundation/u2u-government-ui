import { Validation } from "../../types"
import { InvestmentItem } from "./InvestmentItem"
interface MyInvestmentListProps {
  validations: Validation[]
}

export const MyInvestmentList = ({ validations }: MyInvestmentListProps) => {
  if (validations.length === 0) return <></>
  return (
    <div>
      {
        validations.map((v: Validation, index: number) => {
          return (
            <div className="mt-10" key={index}>
              <InvestmentItem validation={v} />
              <div className="w-full h-[1px] bg-light mt-10"></div>
            </div>
          )
        })
      }
    </div>
  )
}