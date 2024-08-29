
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
      "name": "Lion",
      "image": "lion"
    },
    {
      "name": "Giraffe",
      "image": "giraffe"
    },
    {
      "name": "Tiger",
      "image": "tiger"
    },
    {
      "name": "Monkey",
      "image": "monkey"
    },
    {
      "name": "Panda",
      "image": "panda"
    },
    {
      "name": "Camel",
      "image": "camel"
    },
    {
      "name": "Hawk",
      "image": "hawk"
    },
    {
      "name": "Hippopotamus",
      "image": "hippo"
    },
    {
      "name": "Llama",
      "image": "llama"
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