import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { appConfig } from "../contants";

const httpLink = new HttpLink({ uri: appConfig.sfcSubgraph })

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
})