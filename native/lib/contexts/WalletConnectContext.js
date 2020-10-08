import { createContext } from "react";

const createErrorThunk = () => () => Promise.reject(
  new Error("It looks like you've forgotten to wrap your App with the <WalletConnectProvider />."),
);

export const defaultContext = Object.freeze({
  createSession: createErrorThunk(),
  killSession: createErrorThunk(),
  session: [],
  sendTransaction: createErrorThunk(),
  signTransaction: createErrorThunk(),
  signPersonalMessage: createErrorThunk(),
  signMessage: createErrorThunk(),
  signTypedData: createErrorThunk(),
  sendCustomRequest: createErrorThunk(),
});

const WalletConnectContext = createContext(defaultContext);

export default WalletConnectContext;
