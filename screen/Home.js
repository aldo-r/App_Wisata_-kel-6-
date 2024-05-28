import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Button, ActivityIndicator, Appbar, Chip } from 'react-native-paper';

function Home({ navigation }) {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

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

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const filteredPlaces = places.data
        ? places.data.filter(place =>
            place.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (!selectedCategory || place.category.name === selectedCategory)
        )
        : [];

    const categories = places.data
        ? [...new Set(places.data.map(place => place.category.name))]
        : [];

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Home" />
                <Appbar.Action icon="magnify" onPress={() => setIsSearchBarVisible(!isSearchBarVisible)} />
            </Appbar.Header>
            {isSearchBarVisible && (
                <Searchbar
                    style={styles.searchbar}
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            )}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 14,
                    paddingVertical: 10,
                    paddingHorizontal: 7,
                }}
            >
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    categories.map((category, index) => (
                        <Chip
                            key={index}
                            icon="information"
                            onPress={() => handleCategorySelect(category)}
                            selected={selectedCategory === category}
                            style={[
                                styles.chip,
                                selectedCategory === category && styles.selectedChip
                            ]}
                        >
                            {category}
                        </Chip>
                    ))
                )}
            </ScrollView>
            <ScrollView style={styles.content}>
                {loading ? (
                    <ActivityIndicator animating={true} size="large" style={styles.loader} />
                ) : (
                    filteredPlaces.length > 0 ? (
                        filteredPlaces.map((place, index) => (
                            <Card key={index} style={styles.card}>
                                <Card.Cover source={{ uri: place.photo }} style={styles.cardImage} />
                                <Card.Content style={styles.cardContent}>
                                    <Title>{place.name}</Title>
                                    <Paragraph>{place.description.slice(0, 100)}....</Paragraph>
                                    <Button
                                        mode="contained"
                                        onPress={() => navigation.navigate('Details', { place })}
                                        style={styles.button}
                                    >
                                        Go to Details
                                    </Button>
                                </Card.Content>
                            </Card>
                        ))
                    ) : (
                        <Text style={styles.noPlacesText}>No places found.</Text>
                    )
                )}
            </ScrollView>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    searchbar: {
        margin: 10,
        borderRadius: 30,
    },
    chipContainer: {
        paddingHorizontal: 1,
        marginVertical: 10,
    },
    chip: {
        marginRight: 10,
        backgroundColor: '#E0E0E0',
        height: 32,
        justifyContent: 'center',
    },
    selectedChip: {
        backgroundColor: '#6200EE',
        color: '#FFFFFF',
    },
    content: {
        flex: 1,
        padding: 10,
    },
    card: {
        marginVertical: 10,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 4,
    },
    cardImage: {
        height: 150,
    },
    cardContent: {
        padding: 10,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#6200EE',
    },
    noPlacesText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#757575',
    },
    loader: {
        marginTop: 50,
    },
});
