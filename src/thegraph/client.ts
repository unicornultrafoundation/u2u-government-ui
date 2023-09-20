import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { appConfig } from "../contants";

const httpLink = new HttpLink({ uri: appConfig.sfcSubgraph })

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
})

const httpStakingLink = new HttpLink({ uri: appConfig.stakingGraphql })

export const apolloStakingClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpStakingLink,
})

const httpU2UNetworkLink = new HttpLink({ uri: appConfig.u2uNetworkSubgraph })

export const apolloU2UNetworkClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpU2UNetworkLink,
})


