/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
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
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPlace = /* GraphQL */ `
  query GetPlace($id: ID!) {
    getPlace(id: $id) {
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
export const listPlaces = /* GraphQL */ `
  query ListPlaces(
    $filter: ModelPlaceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlaces(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        isOpen
        image
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getAnimal = /* GraphQL */ `
  query GetAnimal($id: ID!) {
    getAnimal(id: $id) {
      id
      name
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listAnimals = /* GraphQL */ `
  query ListAnimals(
    $filter: ModelAnimalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnimals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPlaceAnimal = /* GraphQL */ `
  query GetPlaceAnimal($id: ID!) {
    getPlaceAnimal(id: $id) {
      id
      placeID
      animalID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPlaceAnimals = /* GraphQL */ `
  query ListPlaceAnimals(
    $filter: ModelPlaceAnimalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlaceAnimals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        placeID
        animalID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEventPlace = /* GraphQL */ `
  query GetEventPlace($id: ID!) {
    getEventPlace(id: $id) {
      id
      placeID
      eventID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listEventPlaces = /* GraphQL */ `
  query ListEventPlaces(
    $filter: ModelEventPlaceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEventPlaces(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        placeID
        eventID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
