import React, { useCallback, useEffect, useState } from "react";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

function App() {
  const [connector] = useState(() => new WalletConnect({
    bridge: "https://bridge.walletconnect.org",
    qrcodeModal: QRCodeModal,
  }));
  const onConnect = useCallback((error, payload) => {
    if (error) {
      throw error;
    }
    // Get provided accounts and chainId
    const { accounts, chainId } = payload.params[0];
  }, []);
  const onSessionUpdate = useCallback((error, payload) => {
    if (error) {
      throw error;
    }
    // Get updated accounts and chainId
    const { accounts, chainId } = payload.params[0];
  }, []);
  const onDisconnect = useCallback((error, payload) => {
    if (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    if (!connector.connected) {
      connector.createSession();
    }
    /* init */
    connector.on("connect", onConnect);
    connector.on("session_update", onSessionUpdate);
    connector.on("disconnect", onDisconnect);
  }, [connector, onConnect, onSessionUpdate, onDisconnect]);
  return (
    <div
      children="hello, world..."
    />
  );
}

export default App;
