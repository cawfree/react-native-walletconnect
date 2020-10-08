import React, { useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { WebView } from "react-native-webview-modal";

function WalletConnectWebView({
  onQRCodeModalClosed,
}) {
  const onMessage = useCallback(async ({ nativeEvent: { data } }) => {
    const { type, ...extras } = JSON.parse(data);
    if (type === "WCQRModalClosed") {
      return onQRCodeModalClosed();
    }
    return Promise.reject(new Error(`Encountered unexpected type, ${type}.`));
  }, [onQRCodeModalClosed]);
  return (
    <WebView
      originWhitelist={["*"]}
      onMessage={onMessage}
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
    var shouldPostMessage = (data) => {
      return window.ReactNativeWebView.postMessage(JSON.stringify(data));
    };
    var WalletConnect = window.WalletConnect.default;
    var WalletConnectQRCodeModal = window.WalletConnectQRCodeModal.default; 

    function nextSession() {
      var walletConnector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org",
        qrcodeModal: WalletConnectQRCodeModal,
      });
      walletConnector.killSession();
      walletConnector
        .createSession()
        .then(() => WalletConnectQRCodeModal.open(walletConnector.uri, () => {
          shouldPostMessage({
            type: "WCQRModalClosed",
          });
          nextSession();
        }));
    }

    nextSession();
  </script>
</body>
</html>
        `.trim(),
      }}
    />
  );
}

WalletConnectWebView.propTypes = {
  onQRCodeModalClosed: PropTypes.func.isRequired,
};

WalletConnectWebView.defaultProps = {};

export default WalletConnectWebView;
