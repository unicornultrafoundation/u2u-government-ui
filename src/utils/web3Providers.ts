import { ethers } from "ethers";
import { appConfig } from "../contants";

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(appConfig.rpc)