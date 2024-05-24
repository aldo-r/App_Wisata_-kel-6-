import React from 'react';
import { StyleSheet, View, ScrollView, } from 'react-native';
import { Card, Title, Paragraph, Text } from 'react-native-paper';

function DetailsScreen({ route }) {
    const { place } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.container}>
                <Card.Cover source={{ uri: place.photo }} style={styles.image} />
                <Card.Content>
                    <Text style={styles.category}>{place.category.name}</Text>
                    <Title style={styles.title}>{place.name}</Title>
                    <Paragraph style={styles.paragraph}>{place.description}</Paragraph>
                </Card.Content>
            </Card>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 1,
        padding: 10,
    },
    image: {
        height: 200,
    },
    category: {
        backgroundColor: '#FFEBEE',
        color: '#D32F2F',
        padding: 5,
        borderRadius: 5,
        fontSize: 12,
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 16,
        color: '#424242',
    },
});

export default DetailsScreen;
