import { ethers } from "ethers"
import { simpleRpcProvider } from "./web3Providers"
import { STAKING_CONTRACT_ADDRESS, U2U_STAKING_ABI } from "../contants"

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getStakingContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(U2U_STAKING_ABI, STAKING_CONTRACT_ADDRESS, signer)
}
