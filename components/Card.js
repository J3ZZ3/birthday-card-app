import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ViewShot from 'react-native-view-shot';

const Card = React.forwardRef(({ cardColor, decoration, recipientName, message }, ref) => (
  <ViewShot ref={ref} options={{ format: 'png', quality: 0.9 }} style={[styles.card, { backgroundColor: cardColor }]}>
    <Text style={styles.cardText}>{decoration}</Text>
    <Text style={styles.cardText}>{`Happy Birthday, ${recipientName}!`}</Text>
    <Text style={styles.cardMessage}>{message}</Text>
    <Text style={styles.cardText}>{decoration}</Text>
  </ViewShot>
));

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: "#ff69b4",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginTop: 20,
  },
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff69b4",
    textAlign: "center",
  },
  cardMessage: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default Card;
