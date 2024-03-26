import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import firebase from 'firebase/app'; 
import { ActivityIndicator } from 'react-native';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('User logged in successfully:', userCredential.user);
      // Navigate to the main app screen (replace with your navigation logic)
    } catch (error) {
      console.error('Login error:', error);
      // Display an error message to the user (optional)
    }
    finally{
      setLoading(false)
    }
  };
  const[loading,setLoading] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency App Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
      />
      {loading && <ActivityIndicator size= "large" />}

      <Button title="Login" onPress={handleLogin}/>
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
});

export default LoginScreen;
