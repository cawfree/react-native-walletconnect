# react-native-walletconnect
⚛️ 👛 This is an unofficial package which supports integrating [**WalletConnect**](https://walletconnect.org/) with [**React Native**](https://reactnative.dev) without requiring linking. This is basically achieved using a [**WebView**](https://github.com/react-native-webview/react-native-webview).

If your project supports using [**Native Modules**](), I strongly recommend you use the official [**@walletconnect/react-native**](https://github.com/WalletConnect/walletconnect-monorepo/) library.

Compatible with [**Android**](https://engineering.fb.com/developer-tools/react-native-for-android-how-we-built-the-first-cross-platform-react-native-app/), [**iOS**](https://reactnative.dev/), [**Web**](https://github.com/necolas/react-native-web) and [**Expo**](https://expo.io).

## Features
  - Supports the **complete** WalletConnect [**Client Interface**](https://docs.walletconnect.org/client-api).
  - **Persists** connected wallets between executions.

## Getting Started

Using [**Yarn**](https://yarnpkg.com):

```bash
yarn add react-native-webview react-native-walletconnect
```

## Usage

First you need to wrap the graphical root of your application with the [`<WalletConnectProvider />`](./src/providers/WalletConnectProvider.js). Once this is done, you can make a call to the [`useWalletConnect`](./src/hooks/useWalletConnect.js) [**hook**](https://reactjs.org/docs/hooks-intro.html) to utilize the complete WalletConnect Client API within your app.

```javascript
import React from "react";
import { SafeAreaView, Button } from "react-native";

import WalletConnectProvider, { useWalletConnect } from "react-native-walletconnect";

const WalletConnectExample = () => {
  const {
    createSession,
    killSession,
    session,
    signTransaction,
  } = useWalletConnect();
  const hasWallet = !!session.length;
  return (
    <>
      {!hasWallet && (
        <Button title="Connect" onPress={createSession} />
      )}
      {!!hasWallet && (
        <Button
          title="Sign Transaction"
          onPress={() => signTransaction({
            from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3",
            to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359",
            data: "0x",
            gasPrice: "0x02540be400",
            gas: "0x9c40",
            value: "0x00", 
            nonce: "0x0114",
          })}
        />
      )}
      {!!hasWallet && (
        <Button
          title="Disconnect"
          onPress={killSession}
        />
      )}
    </>
  );
};

export default function App() {
  return (
    <WalletConnectProvider>
      <WalletConnectExample />
    </WalletConnectProvider>
  );
}
```

### `useWalletConnect`

The [`useWalletConnect`](./src/hooks/useWalletConnect.js) hook provides the following functionality:
  - [`createSession`](https://docs.walletconnect.org/client-api#create-new-session-session_request)
    - Requests the creation of a new session via the presentation of the [**QR Modal**]().
  - [`killSession`](https://docs.walletconnect.org/client-api#kill-session-disconnect)
    - Terminates the active session, equivalent to logging out.
  - [`sendTransaction`](https://docs.walletconnect.org/client-api#send-transaction-eth_sendtransaction)
    - Makes an [**Ethereum**](https://ethereum.org) transaction.
  - [`signTransaction`](https://docs.walletconnect.org/client-api#sign-transaction-eth_signtransaction)
    - Signs an Ethereum transaction, but does not send it.
  - [`signPersonalMessage`](https://docs.walletconnect.org/client-api#sign-personal-message-personal_sign)
    - Signs a personal message.
  - [`signMessage`](https://docs.walletconnect.org/client-api#sign-message-eth_sign)
    - Signs an arbitrary message.
  - [`signTypedData`](https://docs.walletconnect.org/client-api#sign-typed-data-eth_signtypeddata)
    - Signs [**Typed Data**](https://github.com/uport-project/eth-typed-data).
  - [`sendCustomRequest`](https://docs.walletconnect.org/client-api#send-custom-request)
    - Sends a custom request.
  - `session`
    - Returns an array of the active session. These are the connected wallets with details such as `address`es and `chain`s they are assigned to.

## License
[**MIT`**](./LICENSE)`
