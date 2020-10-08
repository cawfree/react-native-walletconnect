import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Image, Text, Button } from "react-native";
import { useSplitStyles } from "react-native-split-styles";

import TextPreset from "react-native-split-styles/dist/presets/Text";

import { useWalletConnect } from "../hooks";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
  }, 
  icon: {
    borderRadius: 5,
    height: 48,
    width: 48,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: { flex: 1 },
});

function Wallet({
  style,
  peerMeta: { name, icons: [uri] },
  accounts,
}) {
  const { signTransaction } = useWalletConnect();
  const [textStyle, extraStyles] = useSplitStyles(style, TextPreset);
  const fontSize = (textStyle.fontSize || 30) * 0.5;
  return (
    <View style={[styles.container, StyleSheet.flatten(extraStyles)]}>
      <View style={styles.row}>
        <View style={styles.text}>
          <Text style={textStyle} children={name} />
          {accounts.map((address, i) => (
            <Text
              key={i}
              style={[textStyle, { fontSize, opacity: 0.3 }]}
              children={address}
              numberOfLines={1}
            />
          ))} 
        </View>
        <Image
          style={styles.icon}
          source={{ uri }}
        />
      </View>
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
    </View>
  );
}

Wallet.propTypes = {
  style: PropTypes.shape({}),
  peerMeta: PropTypes.shape({
    description: PropTypes.string,
    icons: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  accounts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Wallet.defaultProps = {
  style: {},
};

export default Wallet;
