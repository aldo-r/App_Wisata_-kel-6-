import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function Home({ navigation }) {
  const [places, setPlaces] = useState([]);

  const getPlaces = async () => {
    const response = await fetch("https://dewalaravel.com/api/places");
    const placesData = await response.json();

    console.log(placesData);
  };
    useEffect(() => {
    getPlaces();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {places.data ? (
          places.data.map((place, index) => (
            <Card key={index} style={styles.card}>
              <Card.Cover source={{ uri: place.photo }} />
              <Card.Content style={{ padding: 7 }}>
                <Title >{place.name}</Title>
                <Paragraph> {place.description}</Paragraph>
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate('Details', { place })}
                >
                  Go to Details
                </Button>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </ScrollView>
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
