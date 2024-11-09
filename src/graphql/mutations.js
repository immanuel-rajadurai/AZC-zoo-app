/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      email
      firstName
      lastName
      optedIn
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      email
      firstName
      lastName
      optedIn
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      email
      firstName
      lastName
      optedIn
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPlace = /* GraphQL */ `
  mutation CreatePlace(
    $input: CreatePlaceInput!
    $condition: ModelPlaceConditionInput
  ) {
    createPlace(input: $input, condition: $condition) {
      id
      name
      description
      isOpen
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePlace = /* GraphQL */ `
  mutation UpdatePlace(
    $input: UpdatePlaceInput!
    $condition: ModelPlaceConditionInput
  ) {
    updatePlace(input: $input, condition: $condition) {
      id
      name
      description
      isOpen
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePlace = /* GraphQL */ `
  mutation DeletePlace(
    $input: DeletePlaceInput!
    $condition: ModelPlaceConditionInput
  ) {
    deletePlace(input: $input, condition: $condition) {
      id
      name
      description
      isOpen
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createAnimal = /* GraphQL */ `
  mutation CreateAnimal(
    $input: CreateAnimalInput!
    $condition: ModelAnimalConditionInput
  ) {
    createAnimal(input: $input, condition: $condition) {
      id
      name
      scientificName
      habitat
      diet
      behaviour
      weightMale
      weightFemale
      image
      conservationStatus
      funFacts
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateAnimal = /* GraphQL */ `
  mutation UpdateAnimal(
    $input: UpdateAnimalInput!
    $condition: ModelAnimalConditionInput
  ) {
    updateAnimal(input: $input, condition: $condition) {
      id
      name
      scientificName
      habitat
      diet
      behaviour
      weightMale
      weightFemale
      image
      conservationStatus
      funFacts
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteAnimal = /* GraphQL */ `
  mutation DeleteAnimal(
    $input: DeleteAnimalInput!
    $condition: ModelAnimalConditionInput
  ) {
    deleteAnimal(input: $input, condition: $condition) {
      id
      name
      scientificName
      habitat
      diet
      behaviour
      weightMale
      weightFemale
      image
      conservationStatus
      funFacts
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPlaceAnimal = /* GraphQL */ `
  mutation CreatePlaceAnimal(
    $input: CreatePlaceAnimalInput!
    $condition: ModelPlaceAnimalConditionInput
  ) {
    createPlaceAnimal(input: $input, condition: $condition) {
      id
      placeID
      animalID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePlaceAnimal = /* GraphQL */ `
  mutation UpdatePlaceAnimal(
    $input: UpdatePlaceAnimalInput!
    $condition: ModelPlaceAnimalConditionInput
  ) {
    updatePlaceAnimal(input: $input, condition: $condition) {
      id
      placeID
      animalID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePlaceAnimal = /* GraphQL */ `
  mutation DeletePlaceAnimal(
    $input: DeletePlaceAnimalInput!
    $condition: ModelPlaceAnimalConditionInput
  ) {
    deletePlaceAnimal(input: $input, condition: $condition) {
      id
      placeID
      animalID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createEventPlace = /* GraphQL */ `
  mutation CreateEventPlace(
    $input: CreateEventPlaceInput!
    $condition: ModelEventPlaceConditionInput
  ) {
    createEventPlace(input: $input, condition: $condition) {
      id
      placeID
      eventID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEventPlace = /* GraphQL */ `
  mutation UpdateEventPlace(
    $input: UpdateEventPlaceInput!
    $condition: ModelEventPlaceConditionInput
  ) {
    updateEventPlace(input: $input, condition: $condition) {
      id
      placeID
      eventID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEventPlace = /* GraphQL */ `
  mutation DeleteEventPlace(
    $input: DeleteEventPlaceInput!
    $condition: ModelEventPlaceConditionInput
  ) {
    deleteEventPlace(input: $input, condition: $condition) {
      id
      placeID
      eventID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createEventTag = /* GraphQL */ `
  mutation CreateEventTag(
    $input: CreateEventTagInput!
    $condition: ModelEventTagConditionInput
  ) {
    createEventTag(input: $input, condition: $condition) {
      id
      eventID
      tagName
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEventTag = /* GraphQL */ `
  mutation UpdateEventTag(
    $input: UpdateEventTagInput!
    $condition: ModelEventTagConditionInput
  ) {
    updateEventTag(input: $input, condition: $condition) {
      id
      eventID
      tagName
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEventTag = /* GraphQL */ `
  mutation DeleteEventTag(
    $input: DeleteEventTagInput!
    $condition: ModelEventTagConditionInput
  ) {
    deleteEventTag(input: $input, condition: $condition) {
      id
      eventID
      tagName
      createdAt
      updatedAt
      __typename
    }
  }
`;
