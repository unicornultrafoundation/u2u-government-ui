import { DelegationList, TabOption, TabsCard, ValidatorEpochs } from "../../../../components"

const tabs: TabOption[] = [
  {
    key: "delegators",
    label: "Delegators"
  },
  {
    key: "rewards",
    label: "Rewards"
  }
]
interface ListOfValidatorProps {
  valId: number
  totalDelegator: number
}
export const ListOfValidator = ({
  valId,
  totalDelegator
}: ListOfValidatorProps) => {

  return (
    <div>
      <TabsCard tabs={tabs}>
        <DelegationList validationId={valId} totalDelegator={totalDelegator} />
        <ValidatorEpochs validationId={valId} />
      </TabsCard>
    </div>
  )
}