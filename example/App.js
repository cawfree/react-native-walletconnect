import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
} from "react-native";

import WalletConnectProvider, { useWalletConnect } from "react-native-walletconnect";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

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
      <View style={StyleSheet.absoluteFill}>
        <SafeAreaView />
        <View style={styles.container}>
          <WalletConnectExample />
        </View>
      </View>
    </WalletConnectProvider>
  );
}
