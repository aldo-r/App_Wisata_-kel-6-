import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Button, ActivityIndicator, Chip } from 'react-native-paper';

function Home({ navigation }) {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const getPlaces = async () => {
        try {
            const response = await fetch("https://dewalaravel.com/api/places");
            const placesData = await response.json();
            setPlaces(placesData);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getPlaces();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filteredPlaces = places.data
        ? places.data.filter(place =>
            place.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    return (
        <ScrollView style={styles.container}>
            <Searchbar
                style={styles.searchbar}
                placeholder="Search"
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <View style={styles.content}>
                {loading ? (
                    <ActivityIndicator animating={true} />
                ) : (
                    filteredPlaces.length > 0 ? (
                        filteredPlaces.map((place, index) => (
                            <Card key={index} style={styles.card}>
                                <Card.Cover source={{ uri: place.photo }} />
                                <Card.Content style={{ padding: 7 }}>
                                    <Title>{place.name}</Title>
                                    <Paragraph>{place.description.slice(0, 100)}....</Paragraph>
                                    <Button
                                        mode="contained"
                                        onPress={() => navigation.navigate('Details', { place })}
                                        style={{marginTop:10}}
                                    >
                                        Go to Details
                                    </Button>
                                </Card.Content>
                            </Card>
                        ))
                    ) : (
                        <Text>No places found.</Text>
                    )
                )}
            </View>
        </ScrollView>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    searchbar: {
        marginBottom: 10,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        marginVertical: 10,
        width: '100%',
    },
});
