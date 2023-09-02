import { BigNumber, ethers } from "ethers";
export const Zero_Bi = BigNumber.from(0)

export const bigFormatEther = (n: BigNumber | number | string) => {
  return ethers.utils.formatEther(n)
}