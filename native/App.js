import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Button } from 'react-native';

import WebViewModalProvider, { WebViewModal } from "react-native-webview-modal";

export default function App() {
  const [visible, setVisible] = useState(false);
  return (
    <WebViewModalProvider>
      <View style={StyleSheet.absoluteFill}>
        <SafeAreaView />
        <Button
          title="Open"
          onPress={() => setVisible(true)}
        />
        <WebViewModal
          visible={visible}
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
hiiii
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
      </View>
    </WebViewModalProvider>
  );
}
