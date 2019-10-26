module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateEvent {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

type Event {
  id: ID!
  title: String!
  content: String!
  author: User!
  participants(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  date: DateTime!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type EventConnection {
  pageInfo: PageInfo!
  edges: [EventEdge]!
  aggregate: AggregateEvent!
}

input EventCreateInput {
  id: ID
  title: String!
  content: String!
  author: UserCreateOneWithoutMyeventsInput!
  participants: UserCreateManyWithoutEventsInput
  date: DateTime!
}

input EventCreateManyWithoutAuthorInput {
  create: [EventCreateWithoutAuthorInput!]
  connect: [EventWhereUniqueInput!]
}

input EventCreateManyWithoutParticipantsInput {
  create: [EventCreateWithoutParticipantsInput!]
  connect: [EventWhereUniqueInput!]
}

input EventCreateWithoutAuthorInput {
  id: ID
  title: String!
  content: String!
  participants: UserCreateManyWithoutEventsInput
  date: DateTime!
}

input EventCreateWithoutParticipantsInput {
  id: ID
  title: String!
  content: String!
  author: UserCreateOneWithoutMyeventsInput!
  date: DateTime!
}

type EventEdge {
  node: Event!
  cursor: String!
}

enum EventOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  content_ASC
  content_DESC
  date_ASC
  date_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EventPreviousValues {
  id: ID!
  title: String!
  content: String!
  date: DateTime!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input EventScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  date: DateTime
  date_not: DateTime
  date_in: [DateTime!]
  date_not_in: [DateTime!]
  date_lt: DateTime
  date_lte: DateTime
  date_gt: DateTime
  date_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [EventScalarWhereInput!]
  OR: [EventScalarWhereInput!]
  NOT: [EventScalarWhereInput!]
}

type EventSubscriptionPayload {
  mutation: MutationType!
  node: Event
  updatedFields: [String!]
  previousValues: EventPreviousValues
}

input EventSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EventWhereInput
  AND: [EventSubscriptionWhereInput!]
  OR: [EventSubscriptionWhereInput!]
  NOT: [EventSubscriptionWhereInput!]
}

input EventUpdateInput {
  title: String
  content: String
  author: UserUpdateOneRequiredWithoutMyeventsInput
  participants: UserUpdateManyWithoutEventsInput
  date: DateTime
}

input EventUpdateManyDataInput {
  title: String
  content: String
  date: DateTime
}

input EventUpdateManyMutationInput {
  title: String
  content: String
  date: DateTime
}

input EventUpdateManyWithoutAuthorInput {
  create: [EventCreateWithoutAuthorInput!]
  delete: [EventWhereUniqueInput!]
  connect: [EventWhereUniqueInput!]
  set: [EventWhereUniqueInput!]
  disconnect: [EventWhereUniqueInput!]
  update: [EventUpdateWithWhereUniqueWithoutAuthorInput!]
  upsert: [EventUpsertWithWhereUniqueWithoutAuthorInput!]
  deleteMany: [EventScalarWhereInput!]
  updateMany: [EventUpdateManyWithWhereNestedInput!]
}

input EventUpdateManyWithoutParticipantsInput {
  create: [EventCreateWithoutParticipantsInput!]
  delete: [EventWhereUniqueInput!]
  connect: [EventWhereUniqueInput!]
  set: [EventWhereUniqueInput!]
  disconnect: [EventWhereUniqueInput!]
  update: [EventUpdateWithWhereUniqueWithoutParticipantsInput!]
  upsert: [EventUpsertWithWhereUniqueWithoutParticipantsInput!]
  deleteMany: [EventScalarWhereInput!]
  updateMany: [EventUpdateManyWithWhereNestedInput!]
}

input EventUpdateManyWithWhereNestedInput {
  where: EventScalarWhereInput!
  data: EventUpdateManyDataInput!
}

input EventUpdateWithoutAuthorDataInput {
  title: String
  content: String
  participants: UserUpdateManyWithoutEventsInput
  date: DateTime
}

input EventUpdateWithoutParticipantsDataInput {
  title: String
  content: String
  author: UserUpdateOneRequiredWithoutMyeventsInput
  date: DateTime
}

input EventUpdateWithWhereUniqueWithoutAuthorInput {
  where: EventWhereUniqueInput!
  data: EventUpdateWithoutAuthorDataInput!
}

input EventUpdateWithWhereUniqueWithoutParticipantsInput {
  where: EventWhereUniqueInput!
  data: EventUpdateWithoutParticipantsDataInput!
}

input EventUpsertWithWhereUniqueWithoutAuthorInput {
  where: EventWhereUniqueInput!
  update: EventUpdateWithoutAuthorDataInput!
  create: EventCreateWithoutAuthorInput!
}

input EventUpsertWithWhereUniqueWithoutParticipantsInput {
  where: EventWhereUniqueInput!
  update: EventUpdateWithoutParticipantsDataInput!
  create: EventCreateWithoutParticipantsInput!
}

input EventWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  author: UserWhereInput
  participants_every: UserWhereInput
  participants_some: UserWhereInput
  participants_none: UserWhereInput
  date: DateTime
  date_not: DateTime
  date_in: [DateTime!]
  date_not_in: [DateTime!]
  date_lt: DateTime
  date_lte: DateTime
  date_gt: DateTime
  date_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [EventWhereInput!]
  OR: [EventWhereInput!]
  NOT: [EventWhereInput!]
}

input EventWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createEvent(data: EventCreateInput!): Event!
  updateEvent(data: EventUpdateInput!, where: EventWhereUniqueInput!): Event
  updateManyEvents(data: EventUpdateManyMutationInput!, where: EventWhereInput): BatchPayload!
  upsertEvent(where: EventWhereUniqueInput!, create: EventCreateInput!, update: EventUpdateInput!): Event!
  deleteEvent(where: EventWhereUniqueInput!): Event
  deleteManyEvents(where: EventWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  event(where: EventWhereUniqueInput!): Event
  events(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Event]!
  eventsConnection(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EventConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

enum Role {
  ADMIN
  USER
  GUEST
}

type Subscription {
  event(where: EventSubscriptionWhereInput): EventSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  refresh_token: ID!
  username: String!
  password: String!
  role: Role!
  createdAt: DateTime!
  updatedAt: DateTime!
  myevents(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Event!]
  events(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Event!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  refresh_token: ID!
  username: String!
  password: String!
  role: Role
  myevents: EventCreateManyWithoutAuthorInput
  events: EventCreateManyWithoutParticipantsInput
}

input UserCreateManyWithoutEventsInput {
  create: [UserCreateWithoutEventsInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneWithoutMyeventsInput {
  create: UserCreateWithoutMyeventsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutEventsInput {
  id: ID
  refresh_token: ID!
  username: String!
  password: String!
  role: Role
  myevents: EventCreateManyWithoutAuthorInput
}

input UserCreateWithoutMyeventsInput {
  id: ID
  refresh_token: ID!
  username: String!
  password: String!
  role: Role
  events: EventCreateManyWithoutParticipantsInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  refresh_token_ASC
  refresh_token_DESC
  username_ASC
  username_DESC
  password_ASC
  password_DESC
  role_ASC
  role_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  refresh_token: ID!
  username: String!
  password: String!
  role: Role!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input UserScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  refresh_token: ID
  refresh_token_not: ID
  refresh_token_in: [ID!]
  refresh_token_not_in: [ID!]
  refresh_token_lt: ID
  refresh_token_lte: ID
  refresh_token_gt: ID
  refresh_token_gte: ID
  refresh_token_contains: ID
  refresh_token_not_contains: ID
  refresh_token_starts_with: ID
  refresh_token_not_starts_with: ID
  refresh_token_ends_with: ID
  refresh_token_not_ends_with: ID
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [UserScalarWhereInput!]
  OR: [UserScalarWhereInput!]
  NOT: [UserScalarWhereInput!]
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  refresh_token: ID
  username: String
  password: String
  role: Role
  myevents: EventUpdateManyWithoutAuthorInput
  events: EventUpdateManyWithoutParticipantsInput
}

input UserUpdateManyDataInput {
  refresh_token: ID
  username: String
  password: String
  role: Role
}

input UserUpdateManyMutationInput {
  refresh_token: ID
  username: String
  password: String
  role: Role
}

input UserUpdateManyWithoutEventsInput {
  create: [UserCreateWithoutEventsInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  set: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutEventsInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutEventsInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput!
  data: UserUpdateManyDataInput!
}

input UserUpdateOneRequiredWithoutMyeventsInput {
  create: UserCreateWithoutMyeventsInput
  update: UserUpdateWithoutMyeventsDataInput
  upsert: UserUpsertWithoutMyeventsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutEventsDataInput {
  refresh_token: ID
  username: String
  password: String
  role: Role
  myevents: EventUpdateManyWithoutAuthorInput
}

input UserUpdateWithoutMyeventsDataInput {
  refresh_token: ID
  username: String
  password: String
  role: Role
  events: EventUpdateManyWithoutParticipantsInput
}

input UserUpdateWithWhereUniqueWithoutEventsInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutEventsDataInput!
}

input UserUpsertWithoutMyeventsInput {
  update: UserUpdateWithoutMyeventsDataInput!
  create: UserCreateWithoutMyeventsInput!
}

input UserUpsertWithWhereUniqueWithoutEventsInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutEventsDataInput!
  create: UserCreateWithoutEventsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  refresh_token: ID
  refresh_token_not: ID
  refresh_token_in: [ID!]
  refresh_token_not_in: [ID!]
  refresh_token_lt: ID
  refresh_token_lte: ID
  refresh_token_gt: ID
  refresh_token_gte: ID
  refresh_token_contains: ID
  refresh_token_not_contains: ID
  refresh_token_starts_with: ID
  refresh_token_not_starts_with: ID
  refresh_token_ends_with: ID
  refresh_token_not_ends_with: ID
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  myevents_every: EventWhereInput
  myevents_some: EventWhereInput
  myevents_none: EventWhereInput
  events_every: EventWhereInput
  events_some: EventWhereInput
  events_none: EventWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  username: String
}
`
      }
    