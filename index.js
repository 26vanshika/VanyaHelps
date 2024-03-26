import React from 'react';
import { View, Text } from 'react-native';
import { AppRegistry } from 'react-native';
import App from './App'; // Adjust path if needed

AppRegistry.registerComponent('main', () => App);



const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello from your Emergency Contact App!</Text>
    </View>
  );
};

export default App;
