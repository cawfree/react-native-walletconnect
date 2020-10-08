import { useContext } from "react";

import { WalletConnectContext } from "../contexts";

export default function useWalletConnect() {
  return useContext(WalletConnectContext);
}
