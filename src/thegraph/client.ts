import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { CHAIN_SUBGRAPH_URL } from "../contants";

const httpLink = new HttpLink({ uri: CHAIN_SUBGRAPH_URL })

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
})