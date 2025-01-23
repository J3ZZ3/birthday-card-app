import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function BirthdayCardScreen() {
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(16);

  const colors = ['#000000', '#FF0000', '#0000FF', '#008000', '#FFA500'];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
    });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {/* Header Decoration */}
        <MaterialIcons name="cake" size={64} color="#FF69B4" style={styles.icon} />

        {/* Recipient Name Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter recipient's name"
          value={recipientName}
          onChangeText={setRecipientName}
        />

        {/* Birthday Message */}
        <TextInput
          style={[
            styles.messageInput,
            { color: textColor, fontSize: fontSize }
          ]}
          multiline
          placeholder="Write your birthday message here"
          value={message}
          onChangeText={setMessage}
        />

        {/* Text Formatting Controls */}
        <View style={styles.controls}>
          <Text style={styles.controlTitle}>Customize Your Message:</Text>
          
          {/* Color Selection */}
          <View style={styles.colorPicker}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[styles.colorButton, { backgroundColor: color }]}
                onPress={() => setTextColor(color)}
              />
            ))}
          </View>

          {/* Font Size Controls */}
          <View style={styles.fontControls}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setFontSize(Math.max(12, fontSize - 2))}
            >
              <Text>A-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setFontSize(Math.min(32, fontSize + 2))}
            >
              <Text>A+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Decoration */}
        <MaterialIcons name="celebration" size={64} color="#FFD700" style={styles.icon} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  icon: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    height: 150,
    textAlignVertical: 'top',
  },
  controls: {
    marginVertical: 10,
  },
  controlTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  colorPicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  fontControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    width: 40,
    alignItems: 'center',
  },
});