import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

const animals = [
    {
        name: 'Hippopotamus',
        species: 'Hippopotamus amphibius',
        image: require("../../assets/amimalicons/hippo.png"),
        facts: 'Hippos are the third largest land mammal...',
    },
    {
        name: 'Tiger',
        species: 'Panthera tigris',
        image: require("../../assets/amimalicons/tiger.png"),
        facts: 'Tigers are the largest wild cats...\n\nMore facts\n\nMore facts\n\nMore facts\n\nMore facts\n\n\n\nMore facts',
    },
    {
        name: 'Giraffe',
        species: 'Giraffa camelopardalis',
        image: require("../../assets/amimalicons/giraffe.png"),
        facts: 'Giraffes are the tallest mammals...',
    },
];

export default function ExhibitDetails() {
    const route = useRoute();
    const router = useRouter();
    const { animalName } = route.params || {};
    const [animal, setAnimal] = useState(null);

    useEffect(() => {
        const foundAnimal = animals.find(a => a.name === animalName);
        setAnimal(foundAnimal);
    }, [animalName]);

    const handleGoHome = () => {
        router.push('/home');
    };

    if (!animal) {
        return <Text>Animal not found</Text>;
    }

    return (
      
      <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity onPress={handleGoHome} style={styles.backButton}>
                <Text style={styles.backButtonText}>← Home</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.name}>{animal.name}</Text>
                <Text style={styles.species}>{animal.species}</Text>
                <Image source={animal.image} style={styles.image} />
                <Text style={styles.facts}>{animal.facts}</Text>
                {/* Add more content here if needed */}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  safeArea: {
      flex: 1,
  },
  scrollViewContent: {
      padding: 20,
      paddingTop: 60, // To account for the back button
  },
  name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20,
  },
  species: {
      fontSize: 18,
      fontStyle: 'italic',
  },
  image: {
      width: 200,
      height: 200,
      marginVertical: 20,
      alignSelf: 'center',
  },
  facts: {
      fontSize: 16,
  },
  backButton: {
      position: 'absolute',
      top: 40,
      right: 20,
      zIndex: 10,
  },
  backButtonText: {
      fontSize: 18,
      color: 'green',
  },
});