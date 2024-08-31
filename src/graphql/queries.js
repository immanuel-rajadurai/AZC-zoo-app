/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
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
        eventPlaceId
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
        placeAnimalId
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
