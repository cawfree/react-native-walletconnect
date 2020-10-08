import React, { useState, useCallback, useEffect } from "react";
import { Animated, StyleSheet, Platform } from "react-native";

import { WalletConnectContext, defaultContext } from "../contexts";
import { WalletConnectWebView } from "../components";

function WalletConnectProvider({
  children,
}) {
  const [visible, setVisible] = useState(false);
  const [animOpacity] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animOpacity, {
      toValue: visible ? 1 : 0,
      useNativeDriver: Platform.OS !== "web",
      duration: 500,
    }).start();
  }, [visible, animOpacity]);

  const connect = useCallback(async () => {
    setVisible(true);
  }, [setVisible]);

  return (
    <WalletConnectContext.Provider
      value={{
        ...defaultContext,
        connect,
      }}
    >
      {children}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { opacity: animOpacity },
        ]}
        pointerEvents={visible ? "auto" : "none"}
      >
        <WalletConnectWebView
        />
      </Animated.View>
    </WalletConnectContext.Provider>
  );
}

WalletConnectProvider.propTypes = {};
WalletConnectProvider.defaultProps = {
  ...defaultContext,
};

export default WalletConnectProvider;
