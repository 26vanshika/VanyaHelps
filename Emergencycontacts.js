import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Linking } from 'react-native';

// function to store contacts

const storeContacts = async (contacts) => {
    try {
      const jsonValue = JSON.stringify(contacts);
      await AsyncStorage.setItem('emergencyContacts', jsonValue);
    } catch (error) {
      console.error('Error storing contacts:', error);
    }
  };

  // function to retrieve contacts

  const getContacts = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('emergencyContacts');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Error retrieving contacts:', error);
      // Handle potential errors (e.g., return an empty array)
    }
  };


const AddContactScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [category, setCategory] = useState(''); // Optional for contact category

  const handleSaveContact = async () => {
    // Basic validation (optional)
    if (!name || !phoneNumber) {
      alert('Please enter a name and phone number');
      return;
    }

    const newContact = {
      name,
      phoneNumber,
      category, // Include category if used
    };

    try {
      // Get existing contacts (or an empty array)
      const contacts = await getContacts();

      // Add the new contact to the list
      contacts.push(newContact);

      // Store the updated contact list in AsyncStorage
      await storeContacts(contacts);

      // Clear input fields and optionally navigate back
      setName('');
      setPhoneNumber('');
      setCategory(''); // Clear category if used
      navigation.goBack(); // Assuming navigation prop is passed

    } catch (error) {
      console.error('Error saving contact:', error);
      alert('An error occurred while saving the contact'); // Inform user
    }
  };

  useEffect(() => {
    getContacts(); // Fetch contacts on component mount
  }, []);

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`); // Dial the phone number
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCall(item.phoneNumber)}>
      <View style={styles.contactItem}>
        <Text style={styles.contactName}>{item.name}</Text>
        {item.category && <Text style={styles.contactCategory}>({item.category})</Text>}
      </View>
    </TouchableOpacity>
  );

  // Functions to store and retrieve contacts are assumed to be defined elsewhere (see previous discussions)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Emergency Contact</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad" // Optional keyboard type for phone numbers
      />
      <TextInput
        style={styles.input} // Adjust styling if needed for category
        placeholder="Category (Optional)"
        value={category}
        onChangeText={setCategory}
      />

      <Button title="Save Contact" onPress={handleSaveContact} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginBottom: 10,
  },
});

export default AddContactScreen;

  