import { Delegator, WithdrawalRequest } from "../../types";

export interface DelegatorStoreType {
  delegator: Delegator | undefined
  withdrawalRequests: WithdrawalRequest[]
}

export interface DelegatorStoreAction {
  updateDelegator: (del: Delegator | undefined) => void;
  updateWr: (wr: WithdrawalRequest[]) => void;
}