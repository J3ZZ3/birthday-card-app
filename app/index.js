import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, ImageBackground } from "react-native";
import ViewShot from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { StatusBar } from 'react-native';
import Card from './components/Card';
import DecorationSelector from './components/DecorationSelector';
import InputField from './components/InputField';

export default function App() {
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [decoration, setDecoration] = useState("🎉");
  const [cardColor, setCardColor] = useState("#ffe4e1");
  const viewShotRef = useRef();

  const handleCardCreation = async () => {
    if (!recipientName) {
      Alert.alert('Error', 'Please enter the recipient\'s name.');
      return;
    }

    try {
      const uri = await viewShotRef.current.capture();
      const fileUri = FileSystem.documentDirectory + 'birthday_card.png';

      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error('Error capturing or sharing card:', error);
      Alert.alert('Error', 'An error occurred while creating the card. Please try again.');
    }
  };

  const handleCardClick = () => {
    const colors = [
      "#ffe4e1", "#ffcccb", "#add8e6", "#90ee90", "#ffebcd",
      "#ffb6c1", "#ffdab9", "#e6e6fa", "#f0e68c", "#f08080",
      "#fafad2", "#d3d3d3", "#ff69b4", "#ff7f50", "#ff6347",
      "#ff4500", "#ffd700", "#ffffe0", "#f5deb3", "#ffe4b5",
      "#ffe4c4", "#ff1493", "#ff8c00", "#98fb98", "#afeeee",
      "#add8e6", "#f5f5dc", "#d8bfd8", "#ffb5c5", "#f0f8ff",
      "#e0ffff",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCardColor(randomColor);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#6200ee" />
      <ImageBackground
        source={require('../assets/images/background.jpg')}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>🎂 Create Your Birthday Card 🎂</Text>

          <InputField
            label="Recipient's Name:"
            value={recipientName}
            onChangeText={setRecipientName}
          />

          <InputField
            label="Message:"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Decoration:</Text>
          <DecorationSelector decoration={decoration} setDecoration={setDecoration} />

          <TouchableOpacity onPress={handleCardClick}>
            <Card ref={viewShotRef} cardColor={cardColor} decoration={decoration} recipientName={recipientName} message={message} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleCardCreation}>
            <Text style={styles.buttonText}>Create and Download Card</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#ff69b4",
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  decorationRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  decoration: {
    fontSize: 30,
  },
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
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});