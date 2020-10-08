import React, { useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { WebView } from "react-native-webview-modal";

function WalletConnectWebView({
  onQRCodeModalClosed,
}) {
  const onMessage = useCallback(async ({ nativeEvent: { data } }) => {
    const { type, ...extras } = JSON.parse(data);
    if (type === "WCQRModalClosed") {
      return onQRCodeModalClosed();
    } else if (type === "error") {
      const { error } = extras;
      return Promise.reject(new Error(error));
    } else if (type === "WCConnectEvent") {
      const { payload } = extras;
      return console.warn('got connect', payload);
    } else if (type === "WCSessionUpdateEvent") {
      const { payload } = extras;
      return console.warn('got update', payload);
    } else if (type === "WCDisconnectEvent") {
      const { payload } = extras;
      return console.warn('got disconnect', payload);
    }
    return Promise.reject(new Error(`Encountered unexpected type, ${type}.`));
  }, [onQRCodeModalClosed]);
  const onError = useCallback(async ({}) => {
    onQRCodeModalClosed();
  }, [onQRCodeModalClosed]);
  const renderError = useCallback(() => (
    <View />
  ), []);
  return (
    <WebView
      originWhitelist={["*"]}
      onMessage={onMessage}
      onError={onError}
      renderError={renderError}
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
      walletConnector.on("connect", (error, payload) => {
        if (error) {
          return shouldPostMessage({ type: "error", error });
        }
        return shouldPostMessage({ type: "WCConnectEvent", payload });
      });
      walletConnector.on("session_update", (error, payload) => {
        if (error) {
          return shouldPostMessage({ type: "error", error });
        }
        return shouldPostMessage({ type: "WCSessionUpdateEvent", payload });
      });
      walletConnector.on("disconnect", (error, payload) => {
        if (error) {
          return shouldPostMessage({ type: "error", error });
        }
        shouldPostMessage({ type: "WCDisconnectEvent", payload });
      });
      walletConnector.killSession();
      walletConnector
        .createSession()
        .then(() => WalletConnectQRCodeModal.open(walletConnector.uri, () => {
          shouldPostMessage({ type: "WCQRModalClosed" });
          setTimeout(nextSession, 500);
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
