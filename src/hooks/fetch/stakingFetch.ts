import { ethers } from "ethers";

const getEpochAccumulatedRewardPerToken = (stakingContract: ethers.Contract, epoch: number, validatorID: number) => {
  return stakingContract.getEpochAccumulatedRewardPerToken(epoch, validatorID);
}

const getEpochReceivedStake = (stakingContract: ethers.Contract, epoch: number, validatorID: number) => {
  return stakingContract.getEpochReceivedStake(epoch, validatorID);
}

const currentEpoch = (stakingContract: ethers.Contract) => {
  return stakingContract.currentEpoch();
}

const currentEpochSnapShot = (stakingContract: ethers.Contract, epoch: number) => {
  return stakingContract.getEpochSnapshot(epoch)
}

export const StakingFetch = {
  getEpochAccumulatedRewardPerToken,
  getEpochReceivedStake,
  currentEpoch,
  currentEpochSnapShot
}
