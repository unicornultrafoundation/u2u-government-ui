import { ethers } from "ethers";
import { NODE_RPC } from "../contants";

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(NODE_RPC)