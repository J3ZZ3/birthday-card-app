import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewShot from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function App() {
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [decoration, setDecoration] = useState("🎉");
  const viewShotRef = useRef(); // Reference for ViewShot

  // Function to pick an image from the gallery
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access the gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.Images],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleCardCreation = async () => {
    if (!recipientName) {
      Alert.alert('Error', 'Please enter the recipient\'s name.');
      return;
    }

    try {
      // Capture the card as an image
      const uri = await viewShotRef.current.capture();
      const fileUri = FileSystem.documentDirectory + 'birthday_card.png';

      // Move the captured image to the desired location
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      // Share the image
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error('Error capturing or sharing card:', error);
      Alert.alert('Error', 'An error occurred while creating the card. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🎂 Create Your Birthday Card 🎂</Text>

      {/* Input for recipient's name */}
      <Text style={styles.label}>Recipient's Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={recipientName}
        onChangeText={setRecipientName}
      />

      {/* Input for message */}
      <Text style={styles.label}>Message:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter your message"
        multiline
        numberOfLines={4}
        value={message}
        onChangeText={setMessage}
      />

      {/* Pick an image */}
      <Button title="Pick an Image" onPress={pickImage} />

      {/* Display selected image */}
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}

      {/* Add decoration */}
      <Text style={styles.label}>Decoration:</Text>
      <View style={styles.decorationRow}>
        {["🎉", "🎈", "🎁", "🍰", "🌟"].map((item, index) => (
          <TouchableOpacity key={index} onPress={() => setDecoration(item)}>
            <Text style={styles.decoration}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Display birthday card preview */}
      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }} style={styles.card}>
        <Text style={styles.cardText}>{decoration}</Text>
        <Text style={styles.cardText}>{`Happy Birthday, ${recipientName}!`}</Text>
        <Text style={styles.cardMessage}>{message}</Text>
        <Text style={styles.cardText}>{decoration}</Text>
      </ViewShot>

      <TouchableOpacity style={styles.button} onPress={handleCardCreation}>
        <Text style={styles.buttonText}>Create and Download Card</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
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
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginVertical: 20,
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
    backgroundColor: "#ffe4e1",
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