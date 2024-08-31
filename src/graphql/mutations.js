/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
      id
      name
      description
      place {
        id
        name
        description
        isOpen
        image
        createdAt
        updatedAt
        placeAnimalId
        __typename
      }
      image
      createdAt
      updatedAt
      eventPlaceId
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
      place {
        id
        name
        description
        isOpen
        image
        createdAt
        updatedAt
        placeAnimalId
        __typename
      }
      image
      createdAt
      updatedAt
      eventPlaceId
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
      place {
        id
        name
        description
        isOpen
        image
        createdAt
        updatedAt
        placeAnimalId
        __typename
      }
      image
      createdAt
      updatedAt
      eventPlaceId
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
      animal {
        id
        name
        image
        createdAt
        updatedAt
        __typename
      }
      image
      createdAt
      updatedAt
      placeAnimalId
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
      animal {
        id
        name
        image
        createdAt
        updatedAt
        __typename
      }
      image
      createdAt
      updatedAt
      placeAnimalId
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
      animal {
        id
        name
        image
        createdAt
        updatedAt
        __typename
      }
      image
      createdAt
      updatedAt
      placeAnimalId
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
      image
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
      image
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
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
