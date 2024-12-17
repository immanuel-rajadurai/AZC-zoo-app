/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onUpdateAnimal = /* GraphQL */ `
  subscription OnUpdateAnimal($filter: ModelSubscriptionAnimalFilterInput) {
    onUpdateAnimal(filter: $filter) {
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
export const onDeleteAnimal = /* GraphQL */ `
  subscription OnDeleteAnimal($filter: ModelSubscriptionAnimalFilterInput) {
    onDeleteAnimal(filter: $filter) {
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
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag($filter: ModelSubscriptionTagFilterInput) {
    onCreateTag(filter: $filter) {
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag($filter: ModelSubscriptionTagFilterInput) {
    onUpdateTag(filter: $filter) {
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag($filter: ModelSubscriptionTagFilterInput) {
    onDeleteTag(filter: $filter) {
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateEventTag = /* GraphQL */ `
  subscription OnCreateEventTag($filter: ModelSubscriptionEventTagFilterInput) {
    onCreateEventTag(filter: $filter) {
      id
      eventID
      tagName
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateEventTag = /* GraphQL */ `
  subscription OnUpdateEventTag($filter: ModelSubscriptionEventTagFilterInput) {
    onUpdateEventTag(filter: $filter) {
      id
      eventID
      tagName
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteEventTag = /* GraphQL */ `
  subscription OnDeleteEventTag($filter: ModelSubscriptionEventTagFilterInput) {
    onDeleteEventTag(filter: $filter) {
      id
      eventID
      tagName
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateOccurrenceCounter = /* GraphQL */ `
  subscription OnCreateOccurrenceCounter(
    $filter: ModelSubscriptionOccurrenceCounterFilterInput
  ) {
    onCreateOccurrenceCounter(filter: $filter) {
      name
      count
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateOccurrenceCounter = /* GraphQL */ `
  subscription OnUpdateOccurrenceCounter(
    $filter: ModelSubscriptionOccurrenceCounterFilterInput
  ) {
    onUpdateOccurrenceCounter(filter: $filter) {
      name
      count
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteOccurrenceCounter = /* GraphQL */ `
  subscription OnDeleteOccurrenceCounter(
    $filter: ModelSubscriptionOccurrenceCounterFilterInput
  ) {
    onDeleteOccurrenceCounter(filter: $filter) {
      name
      count
      createdAt
      updatedAt
      __typename
    }
  }
`;
