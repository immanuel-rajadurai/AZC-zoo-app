/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
    onCreateEvent(filter: $filter) {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
    onUpdateEvent(filter: $filter) {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
    onDeleteEvent(filter: $filter) {
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
export const onCreatePlace = /* GraphQL */ `
  subscription OnCreatePlace($filter: ModelSubscriptionPlaceFilterInput) {
    onCreatePlace(filter: $filter) {
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
export const onUpdatePlace = /* GraphQL */ `
  subscription OnUpdatePlace($filter: ModelSubscriptionPlaceFilterInput) {
    onUpdatePlace(filter: $filter) {
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
export const onDeletePlace = /* GraphQL */ `
  subscription OnDeletePlace($filter: ModelSubscriptionPlaceFilterInput) {
    onDeletePlace(filter: $filter) {
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
export const onCreateAnimal = /* GraphQL */ `
  subscription OnCreateAnimal($filter: ModelSubscriptionAnimalFilterInput) {
    onCreateAnimal(filter: $filter) {
      id
      name
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAnimal = /* GraphQL */ `
  subscription OnUpdateAnimal($filter: ModelSubscriptionAnimalFilterInput) {
    onUpdateAnimal(filter: $filter) {
      id
      name
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAnimal = /* GraphQL */ `
  subscription OnDeleteAnimal($filter: ModelSubscriptionAnimalFilterInput) {
    onDeleteAnimal(filter: $filter) {
      id
      name
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePlaceAnimal = /* GraphQL */ `
  subscription OnCreatePlaceAnimal(
    $filter: ModelSubscriptionPlaceAnimalFilterInput
  ) {
    onCreatePlaceAnimal(filter: $filter) {
      id
      placeID
      animalID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePlaceAnimal = /* GraphQL */ `
  subscription OnUpdatePlaceAnimal(
    $filter: ModelSubscriptionPlaceAnimalFilterInput
  ) {
    onUpdatePlaceAnimal(filter: $filter) {
      id
      placeID
      animalID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePlaceAnimal = /* GraphQL */ `
  subscription OnDeletePlaceAnimal(
    $filter: ModelSubscriptionPlaceAnimalFilterInput
  ) {
    onDeletePlaceAnimal(filter: $filter) {
      id
      placeID
      animalID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateEventPlace = /* GraphQL */ `
  subscription OnCreateEventPlace(
    $filter: ModelSubscriptionEventPlaceFilterInput
  ) {
    onCreateEventPlace(filter: $filter) {
      id
      placeID
      eventID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateEventPlace = /* GraphQL */ `
  subscription OnUpdateEventPlace(
    $filter: ModelSubscriptionEventPlaceFilterInput
  ) {
    onUpdateEventPlace(filter: $filter) {
      id
      placeID
      eventID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteEventPlace = /* GraphQL */ `
  subscription OnDeleteEventPlace(
    $filter: ModelSubscriptionEventPlaceFilterInput
  ) {
    onDeleteEventPlace(filter: $filter) {
      id
      placeID
      eventID
      createdAt
      updatedAt
      __typename
    }
  }
`;
