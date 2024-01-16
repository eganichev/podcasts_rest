"use client";

import { ApolloProvider } from "@apollo/client";
import createApolloClient from "@/lib/apolloClient";
import React from "react";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (process.env.NODE_ENV === "development") {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

export default function Provider(props: { children: React.ReactNode }) {
  const apolloClient = createApolloClient();

  return (
    <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
  );
}
