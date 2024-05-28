import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

const Category = ({ category, selected, onPress }) => {
    return (
        <Chip
            icon="information"
            onPress={() => onPress(category)}
            selected={selected}
            style={[
                styles.chip,
                selected && styles.selectedChip
            ]}
        >
            {category}
        </Chip>
    );
};

const styles = StyleSheet.create({
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
});

export default Category;
