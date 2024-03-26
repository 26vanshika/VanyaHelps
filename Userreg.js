import React, { useState } from 'react';
import { Avatar } from 'react-native-elements';
import { StyleSheet } from 'react-native';


function UserRegistration() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        let errorMessage = null; // Initialize error message variable
        if (!username) {
            errorMessage = 'Please enter a username.';
          } else if (!email) {
            errorMessage = 'Please enter an email address.';
          } else if (!password) {
            errorMessage = 'Please enter a password.';
          } else if (password !== confirmPassword) {
            errorMessage = 'Passwords do not match.';
          }
      
          if (errorMessage) {
            Alert.alert('Registration Error', errorMessage); // Display error message using Alert
            return; // Prevent further processing if validation fails
          }


    
        
        console.log('Registering user...', username, email);
    
        // Add validation checks here (e.g., empty fields, password strength)
        // If validation passes, call a function to securely store user data (e.g., using AsyncStorage)
        // Navigate to a different screen (e.g., login screen or main app screen) after successful registration
      };
    
    return (
            <View style={styles.container}>
               <Avatar 
               rounded
               size = "large" 
               source={{ uri: 'https://placeimg.com/150/150/people' }} // Placeholder image
               onPress={() => console.log('Avatar clicked!')} // Optional onPress handler
               />
               <Text style={styles.title}>Emergency Assistance App Vanya</Text>

              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none" // Prevent automatic capitalization
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address" // Set keyboard type for email
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true} // Hide password characters
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true} // Hide password characters
              />
              {password !== confirmPassword && <Text style={styles.error}>Passwords don't match</Text>}  {/* Placeholder for error message */}
              <Button title="Register" onPress={handleRegister} />
            </View>
          );
          
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 30,
      marginBottom: 20,
    },
    input: {
      height: 40,
      width: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      padding: 8,
    },
    error: {
      color: 'red',
      marginBottom: 10,
    },
  });
  
  export default UserRegistration;
  