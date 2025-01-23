import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DecorationSelector = ({ decoration, setDecoration }) => {
  const decorations = ["🎉", "🎈", "🎁", "🍰", "🌟"];

  return (
    <View style={styles.decorationRow}>
      {decorations.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => setDecoration(item)}>
          <Text style={styles.decoration}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  decorationRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  decoration: {
    fontSize: 30,
  },
});

export default DecorationSelector;
