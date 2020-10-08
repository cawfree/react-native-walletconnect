import React, { useState, useCallback, useEffect } from "react";
import { Animated, StyleSheet, Platform, Dimensions } from "react-native";
import { nanoid } from "nanoid/non-secure";

import { WalletConnectContext, defaultContext } from "../contexts";
import { WalletConnectWebView } from "../components";

function WalletConnectProvider({
  children,
}) {
  const [id] = useState(nanoid);
  const [visible, setVisible] = useState(false);
  const [animOpacity] = useState(() => new Animated.Value(0));
  const [session, setSession] = useState([]);
  const [callbacks, setCallbacks] = useState({});

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animOpacity, {
        toValue: visible ? 1 : 0,
        useNativeDriver: Platform.OS !== "web",
        duration: 500,
      }),
    ]).start();
  }, [visible, animOpacity]);

  const createSession = useCallback(async () => {
    setVisible(true);
  }, [setVisible]);

  const onQRCodeModalClosed = useCallback(async () => {
    setVisible(false);
  }, [setVisible]);

  const onWalletConnected = useCallback(async (params) => {
    setVisible(false);
    setSession(params);
  }, [setVisible, setSession]);

  const onWalletUpdated = useCallback(async (params) => {
    console.warn('wallet was updated', params);
    setSession(params);
  }, [setVisible, setSession]);

  const onWalletDisconnected = useCallback(async (params) => {
    setSession([]);
    setVisible(false);
  }, [setSession, setVisible]);

  const onCallbacksGenerated = useCallback(({ ...callbacks }) => {
    setCallbacks(callbacks);
  }, [setCallbacks]);

  return (
    <WalletConnectContext.Provider
      value={{
        ...defaultContext,
        ...callbacks,
        createSession,
        session,
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
          id={id}
          onQRCodeModalClosed={onQRCodeModalClosed}
          onWalletConnected={onWalletConnected}
          onWalletUpdated={onWalletUpdated}
          onWalletDisconnected={onWalletDisconnected}
          onCallbacksGenerated={onCallbacksGenerated}
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
