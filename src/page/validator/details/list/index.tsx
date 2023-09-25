import { DelegationList, TabOption, TabsCard, ValidatorEpochs } from "../../../../components"
import { Delegation } from "../../../../types"

const tabs: TabOption[] = [
  {
    key: "delegators",
    label: "Delegators"
  },
  {
    key: "epoches",
    label: "Epoches"
  }
]
interface ListOfValidatorProps {
  delegations: Delegation[] | undefined
  valId: number
  totalDelegator: number
}
export const ListOfValidator = ({
  delegations,
  valId,
  totalDelegator
}: ListOfValidatorProps) => {
  
  return (
    <div>
      <TabsCard tabs={tabs}>
        <div>
          {
            delegations && delegations.length > 0 ? <DelegationList validationId={Number(valId)} totalDelegator={totalDelegator} /> : <></>
          }
        </div>
        <div><ValidatorEpochs validationId={valId} /></div>
      </TabsCard>

    </div>
  )
}