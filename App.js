import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('Details')}>go to Details</Button>
    </View>
  );
}
function Details() {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
    </View>
  );
}
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
