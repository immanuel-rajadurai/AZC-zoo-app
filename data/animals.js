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
  ];

  const animalData = [
    {
        "key": "1",
        "name": "Lion",
        "image": "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg",
        "species": "Panthera leo",
        "diet": "Carnivorous (Buffaloes, leopards, baby elephants)",
        "length": "0.00m",
        "height": "0.00m",
        "weightM": "0Kg",
        "weightF": "0Kg",
        "habitat": "Earth",
        "conservationStatus": "Endangered",
        "funFacts": ["Its an animal", "Its alive", "Its in this zoo", "", "", ""]
    },
    {
        "key": "2",
        "name": "Giraffe",
        "image": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Giraffe_standing.jpg",
        "species": "Giraffa camelopardalis",
        "diet": "Herbivorous (Leaves, herbs, flowers)",
        "length": "0.00m",
        "height": "0.00m",
        "weightM": "0Kg",
        "weightF": "0Kg",
        "habitat": "Earth",
        "conservationStatus": "Endangered",
        "funFacts": ["Its an animal", "Its alive", "Its in this zoo", "", "", ""]
    },
    {
        "key": "3",
        "name": "Tiger",
        "image": "https://cdn.britannica.com/83/195983-138-66807699/numbers-tiger-populations.jpg?w=800&h=450&c=crop",
        "species": "Panthera tigris",
        "diet": "Carnivorous (Monkeys, wild boar, deer)",
        "length": "0.00m",
        "height": "0.00m",
        "weightM": "0Kg",
        "weightF": "0Kg",
        "habitat": "Earth",
        "conservationStatus": "Endangered",
        "funFacts": ["Its an animal", "Its alive", "Its in this zoo", "", "", ""]
    },

    {
        "key": "5",
        "name": "Panda",
        "image": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Grosser_Panda.JPG",
        "species": "Ailuropoda melanoleuca",
        "diet": "Omnivorous (Bamboo, eggs, carrion)",
        "length": "0.00m",
        "height": "0.00m",
        "weightM": "0Kg",
        "weightF": "0Kg",
        "habitat": "Earth",
        "conservationStatus": "Endangered",
        "funFacts": ["Its an animal", "Its alive", "Its in this zoo", "", "", ""]
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