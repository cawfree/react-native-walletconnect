import React from "react";

import { WalletConnectProvider } from "../providers";

export default function withWalletConnect(Component) {
  function ComponentWithWalletConnect({ ...props }) {
    return (
      <WalletConnectProvider>
        <Component {...props} />
      </WalletConnectProvider>
    );
  }
  return ComponentWithWalletConnect;
}
