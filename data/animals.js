const animals = [
    {
      key: "1",
      name: 'Hippopotamus',
      species: 'Hippopotamus amphibius',
      coordinates: { latitude: 51.535121, longitude: -0.154131 },
      image: require("../assets/amimalicons/hippo.png"),
      facts: 'Hippos are the third largest  land mammal after elephants and rhinos.\n\nHippos are found in Savannahs!\n\nOther Facts'
    },
    {
      key: "2",
      name: 'Tiger',
      species: 'Panthera tigris',
      coordinates: { latitude: 51.535121, longitude: -0.1547 },
      image: require("../assets/amimalicons/tiger.png"),
      facts: 'Tigers are the largest wild cats in the world.\n\nTigers are apex predators!\n\nOther facts\n\nOther facts\n\nOther facts\n\nOther facts\n\nOther facts\n\nOther facts\n\nOther facts'
    },
    {
      key:"3",
      name: 'Giraffe',
      species: 'Giraffa camelopardalis',
      coordinates: { latitude: 51.5355, longitude: -0.155 },
      image: require("../assets/amimalicons/giraffe.png"),
      facts: 'Giraffes are the tallest mammals on Earth.\n\nGiraffes are herbivores!\n\nOther facts'
    },
    {
      key:"4",
      name: 'Building',
      species: 'None',
      coordinates: { latitude: 51.5345, longitude: -0.15455 },
      image: require("../assets/amimalicons/3d-house.png"),
      facts: 'Giraffes are the tallest mammals on Earth.\n\nGiraffes are herbivores!\n\nOther facts'
    },
  ];

  const animalData = [
    {
        "id": "1",
        "name": "Lion",
        "scientificName": "Panthera leo",
        "habitat": "Savannas, grasslands, dense scrub, and open woodlands",
        "diet": "Carnivorous (Buffaloes, zebras, wildebeests, baby elephants)",
        "behaviour": "Social animals, live in prides, cooperative hunters",
        "weightMale": "190-225 Kg",
        "weightFemale": "120-150 Kg",
        "image": "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg",
        "conservationStatus": "Vulnerable",
        "funFacts": "It's an animal; It's alive; It's in this zoo",
        "createdAt": "2024-10-24T00:00:00Z",
        "updatedAt": "2024-10-24T00:00:00Z"
    },
    {
        "id": "2",
        "name": "Giraffe",
        "scientificName": "Giraffa camelopardalis",
        "habitat": "Savannas, grasslands, and open woodlands",
        "diet": "Herbivorous (Leaves, shrubs, fruits, and flowers)",
        "behaviour": "Gentle and social, live in loose herds, non-territorial",
        "weightMale": "1,200-1,500 Kg",
        "weightFemale": "700-900 Kg",
        "image": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Giraffe_standing.jpg",
        "conservationStatus": "Vulnerable",
        "funFacts": "It's an animal; It's alive; It's in this zoo",
        "createdAt": "2024-10-24T00:00:00Z",
        "updatedAt": "2024-10-24T00:00:00Z"
    },
    {
        "id": "3",
        "name": "Tiger",
        "scientificName": "Panthera tigris",
        "habitat": "Forests, grasslands, mangrove swamps",
        "diet": "Carnivorous (Deer, wild boar, water buffalo, smaller mammals)",
        "behaviour": "Solitary and territorial, often hunt alone at night",
        "weightMale": "180-310 Kg",
        "weightFemale": "100-160 Kg",
        "image": "https://cdn.britannica.com/83/195983-138-66807699/numbers-tiger-populations.jpg?w=800&h=450&c=crop",
        "conservationStatus": "Endangered",
        "funFacts": "It's an animal; It's alive; It's in this zoo",
        "createdAt": "2024-10-24T00:00:00Z",
        "updatedAt": "2024-10-24T00:00:00Z"
    },
    {
        "id": "5",
        "name": "Panda",
        "scientificName": "Ailuropoda melanoleuca",
        "habitat": "Temperate broadleaf and mixed forests with dense bamboo growth",
        "diet": "Omnivorous (Bamboo, eggs, carrion)",
        "behaviour": "Solitary, mostly active in the morning and evening, spends most of the day feeding",
        "weightMale": "85-125 Kg",
        "weightFemale": "70-100 Kg",
        "image": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Grosser_Panda.JPG",
        "conservationStatus": "Vulnerable",
        "funFacts": "It's an animal; It's alive; It's in this zoo",
        "createdAt": "2024-10-24T00:00:00Z",
        "updatedAt": "2024-10-24T00:00:00Z"
    }
  ];


  const animalImages = {
    lion: require('../assets/amimalicons/lion.png'),
    giraffe: require('../assets/amimalicons/giraffe.png'),
    tiger: require('../assets/amimalicons/tiger.png'),
    monkey: require('../assets/amimalicons/monkey.png'),
    panda: require('../assets/amimalicons/panda.png'),
    camel: require('../assets/amimalicons/camel.png'),
    hawk: require('../assets/amimalicons/hawk.png'),
    hippo: require('../assets/amimalicons/hippo.png'),
    llama: require('../assets/amimalicons/llama.png'),
  };

// export {animals, animalData, animalImages};

export default animals;
export {animalData, animalImages};