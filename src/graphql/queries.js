/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($email: String!) {
    getUser(email: $email) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $email: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        email
        firstName
        lastName
        optedIn
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
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
export const getTag = /* GraphQL */ `
  query GetTag($name: String!) {
    getTag(name: $name) {
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTags = /* GraphQL */ `
  query ListTags(
    $name: String
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTags(
      name: $name
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        name
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEventTag = /* GraphQL */ `
  query GetEventTag($id: ID!) {
    getEventTag(id: $id) {
      id
      eventID
      tagName
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listEventTags = /* GraphQL */ `
  query ListEventTags(
    $filter: ModelEventTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEventTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        eventID
        tagName
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getOccurrenceCounter = /* GraphQL */ `
  query GetOccurrenceCounter($name: String!) {
    getOccurrenceCounter(name: $name) {
      name
      count
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listOccurrenceCounters = /* GraphQL */ `
  query ListOccurrenceCounters(
    $name: String
    $filter: ModelOccurrenceCounterFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listOccurrenceCounters(
      name: $name
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        name
        count
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
