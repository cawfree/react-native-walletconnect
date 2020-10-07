import React, { useState } from "react";
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  View,
  Button,
} from "react-native";

import WalletConnectProvider, { useWalletConnect } from "./lib";

const styles = StyleSheet.create({
  container: { flex: 1 },
});

const WalletConnectExample = () => {
  const { connect } = useWalletConnect();
  return <Button title="Connect" onPress={connect} />;
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
