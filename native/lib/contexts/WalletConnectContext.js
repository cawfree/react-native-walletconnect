import { createContext } from "react";

export const defaultContext = Object.freeze({
  connect: () => Promise.reject(
    new Error("It looks like you've forgotten to wrap your App with the <WalletConnectProvider />."),
  ),
});

const WalletConnectContext = createContext(defaultContext);

export default WalletConnectContext;
