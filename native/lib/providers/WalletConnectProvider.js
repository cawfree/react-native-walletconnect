import React, { useState, useCallback, useEffect } from "react";
import { Animated, StyleSheet, Platform } from "react-native";
import { WebView } from "react-native-webview-modal";

import { WalletConnectContext, defaultContext } from "../contexts";

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
        <WebView
          originWhitelist={["*"]}
          source={{
            baseUrl: '',
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WalletConnect</title>
</head>
<body style="margin:0;padding:0;">
  <script src="https://cdn.jsdelivr.net/npm/@walletconnect/browser@1.0.0/dist/umd/index.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@walletconnect/qrcode-modal@1.2.2/dist/umd/index.min.js"></script>
  <script>
    var WalletConnect = window.WalletConnect.default;
    var WalletConnectQRCodeModal = window.WalletConnectQRCodeModal.default;
    var walletConnector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: WalletConnectQRCodeModal,
    });
    if (!walletConnector.connected) {
      // create new session
      walletConnector.createSession().then(() => {
        // get uri for QR Code modal
        var uri = walletConnector.uri;
        // display QR Code modal
        WalletConnectQRCodeModal.open(uri, () => {
          console.log('QR Code Modal closed');
        });
      });
    } else {
      walletConnector.killSession();
    }
  </script>
</body>
</html>
            `.trim(),
          }}
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
