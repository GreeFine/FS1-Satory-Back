// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type Maybe<T> = T | undefined | null;

export interface Exists {
  event: (where?: EventWhereInput) => Promise<boolean>;
  user: (where?: UserWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  event: (where: EventWhereUniqueInput) => EventNullablePromise;
  events: (args?: {
    where?: EventWhereInput;
    orderBy?: EventOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Event>;
  eventsConnection: (args?: {
    where?: EventWhereInput;
    orderBy?: EventOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => EventConnectionPromise;
  user: (where: UserWhereUniqueInput) => UserNullablePromise;
  users: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<User>;
  usersConnection: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => UserConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createEvent: (data: EventCreateInput) => EventPromise;
  updateEvent: (args: {
    data: EventUpdateInput;
    where: EventWhereUniqueInput;
  }) => EventPromise;
  updateManyEvents: (args: {
    data: EventUpdateManyMutationInput;
    where?: EventWhereInput;
  }) => BatchPayloadPromise;
  upsertEvent: (args: {
    where: EventWhereUniqueInput;
    create: EventCreateInput;
    update: EventUpdateInput;
  }) => EventPromise;
  deleteEvent: (where: EventWhereUniqueInput) => EventPromise;
  deleteManyEvents: (where?: EventWhereInput) => BatchPayloadPromise;
  createUser: (data: UserCreateInput) => UserPromise;
  updateUser: (args: {
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
  }) => UserPromise;
  updateManyUsers: (args: {
    data: UserUpdateManyMutationInput;
    where?: UserWhereInput;
  }) => BatchPayloadPromise;
  upsertUser: (args: {
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
  }) => UserPromise;
  deleteUser: (where: UserWhereUniqueInput) => UserPromise;
  deleteManyUsers: (where?: UserWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  event: (
    where?: EventSubscriptionWhereInput
  ) => EventSubscriptionPayloadSubscription;
  user: (
    where?: UserSubscriptionWhereInput
  ) => UserSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type Role = "ADMIN" | "USER" | "GUEST";

export type EventOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "title_ASC"
  | "title_DESC"
  | "content_ASC"
  | "content_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type UserOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "refresh_token_ASC"
  | "refresh_token_DESC"
  | "username_ASC"
  | "username_DESC"
  | "password_ASC"
  | "password_DESC"
  | "role_ASC"
  | "role_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export interface UserUpdateWithoutMyeventsDataInput {
  refresh_token?: Maybe<ID_Input>;
  username?: Maybe<String>;
  password?: Maybe<String>;
  role?: Maybe<Role>;
  events?: Maybe<EventUpdateManyWithoutParticipantsInput>;
}

export type EventWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
}>;

export interface UserCreateManyWithoutEventsInput {
  create?: Maybe<UserCreateWithoutEventsInput[] | UserCreateWithoutEventsInput>;
  connect?: Maybe<UserWhereUniqueInput[] | UserWhereUniqueInput>;
}

export interface EventUpdateWithWhereUniqueWithoutAuthorInput {
  where: EventWhereUniqueInput;
  data: EventUpdateWithoutAuthorDataInput;
}

export interface UserCreateWithoutEventsInput {
  id?: Maybe<ID_Input>;
  refresh_token: ID_Input;
  username: String;
  password: String;
  role?: Maybe<Role>;
  myevents?: Maybe<EventCreateManyWithoutAuthorInput>;
}

export interface EventUpdateWithoutParticipantsDataInput {
  title?: Maybe<String>;
  content?: Maybe<String>;
  author?: Maybe<UserUpdateOneWithoutMyeventsInput>;
}

export interface EventCreateManyWithoutAuthorInput {
  create?: Maybe<
    EventCreateWithoutAuthorInput[] | EventCreateWithoutAuthorInput
  >;
  connect?: Maybe<EventWhereUniqueInput[] | EventWhereUniqueInput>;
}

export interface UserSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<UserWhereInput>;
  AND?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
  OR?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
  NOT?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
}

export interface EventCreateWithoutAuthorInput {
  id?: Maybe<ID_Input>;
  title: String;
  content: String;
  participants?: Maybe<UserCreateManyWithoutEventsInput>;
}

export interface UserUpdateManyMutationInput {
  refresh_token?: Maybe<ID_Input>;
  username?: Maybe<String>;
  password?: Maybe<String>;
  role?: Maybe<Role>;
}

export interface EventUpdateInput {
  title?: Maybe<String>;
  content?: Maybe<String>;
  author?: Maybe<UserUpdateOneWithoutMyeventsInput>;
  participants?: Maybe<UserUpdateManyWithoutEventsInput>;
}

export interface UserCreateInput {
  id?: Maybe<ID_Input>;
  refresh_token: ID_Input;
  username: String;
  password: String;
  role?: Maybe<Role>;
  events?: Maybe<EventCreateManyWithoutParticipantsInput>;
  myevents?: Maybe<EventCreateManyWithoutAuthorInput>;
}

export interface UserUpdateOneWithoutMyeventsInput {
  create?: Maybe<UserCreateWithoutMyeventsInput>;
  update?: Maybe<UserUpdateWithoutMyeventsDataInput>;
  upsert?: Maybe<UserUpsertWithoutMyeventsInput>;
  delete?: Maybe<Boolean>;
  disconnect?: Maybe<Boolean>;
  connect?: Maybe<UserWhereUniqueInput>;
}

export interface UserUpdateManyDataInput {
  refresh_token?: Maybe<ID_Input>;
  username?: Maybe<String>;
  password?: Maybe<String>;
  role?: Maybe<Role>;
}

export interface EventUpdateWithoutAuthorDataInput {
  title?: Maybe<String>;
  content?: Maybe<String>;
  participants?: Maybe<UserUpdateManyWithoutEventsInput>;
}

export type UserWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
  username?: Maybe<String>;
}>;

export interface EventUpdateManyWithoutParticipantsInput {
  create?: Maybe<
    EventCreateWithoutParticipantsInput[] | EventCreateWithoutParticipantsInput
  >;
  delete?: Maybe<EventWhereUniqueInput[] | EventWhereUniqueInput>;
  connect?: Maybe<EventWhereUniqueInput[] | EventWhereUniqueInput>;
  set?: Maybe<EventWhereUniqueInput[] | EventWhereUniqueInput>;
  disconnect?: Maybe<EventWhereUniqueInput[] | EventWhereUniqueInput>;
  update?: Maybe<
    | EventUpdateWithWhereUniqueWithoutParticipantsInput[]
    | EventUpdateWithWhereUniqueWithoutParticipantsInput
  >;
  upsert?: Maybe<
    | EventUpsertWithWhereUniqueWithoutParticipantsInput[]
    | EventUpsertWithWhereUniqueWithoutParticipantsInput
  >;
  deleteMany?: Maybe<EventScalarWhereInput[] | EventScalarWhereInput>;
  updateMany?: Maybe<
    EventUpdateManyWithWhereNestedInput[] | EventUpdateManyWithWhereNestedInput
  >;
}

export interface UserUpsertWithWhereUniqueWithoutEventsInput {
  where: UserWhereUniqueInput;
  update: UserUpdateWithoutEventsDataInput;
  create: UserCreateWithoutEventsInput;
}

export interface EventUpdateWithWhereUniqueWithoutParticipantsInput {
  where: EventWhereUniqueInput;
  data: EventUpdateWithoutParticipantsDataInput;
}

export interface UserCreateOneWithoutMyeventsInput {
  create?: Maybe<UserCreateWithoutMyeventsInput>;
  connect?: Maybe<UserWhereUniqueInput>;
}

export interface EventWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  title?: Maybe<String>;
  title_not?: Maybe<String>;
  title_in?: Maybe<String[] | String>;
  title_not_in?: Maybe<String[] | String>;
  title_lt?: Maybe<String>;
  title_lte?: Maybe<String>;
  title_gt?: Maybe<String>;
  title_gte?: Maybe<String>;
  title_contains?: Maybe<String>;
  title_not_contains?: Maybe<String>;
  title_starts_with?: Maybe<String>;
  title_not_starts_with?: Maybe<String>;
  title_ends_with?: Maybe<String>;
  title_not_ends_with?: Maybe<String>;
  content?: Maybe<String>;
  content_not?: Maybe<String>;
  content_in?: Maybe<String[] | String>;
  content_not_in?: Maybe<String[] | String>;
  content_lt?: Maybe<String>;
  content_lte?: Maybe<String>;
  content_gt?: Maybe<String>;
  content_gte?: Maybe<String>;
  content_contains?: Maybe<String>;
  content_not_contains?: Maybe<String>;
  content_starts_with?: Maybe<String>;
  content_not_starts_with?: Maybe<String>;
  content_ends_with?: Maybe<String>;
  content_not_ends_with?: Maybe<String>;
  author?: Maybe<UserWhereInput>;
  participants_every?: Maybe<UserWhereInput>;
  participants_some?: Maybe<UserWhereInput>;
  participants_none?: Maybe<UserWhereInput>;
  createdAt?: Maybe<DateTimeInput>;
  createdAt_not?: Maybe<DateTimeInput>;
  createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_lt?: Maybe<DateTimeInput>;
  createdAt_lte?: Maybe<DateTimeInput>;
  createdAt_gt?: Maybe<DateTimeInput>;
  createdAt_gte?: Maybe<DateTimeInput>;
  updatedAt?: Maybe<DateTimeInput>;
  updatedAt_not?: Maybe<DateTimeInput>;
  updatedAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_lt?: Maybe<DateTimeInput>;
  updatedAt_lte?: Maybe<DateTimeInput>;
  updatedAt_gt?: Maybe<DateTimeInput>;
  updatedAt_gte?: Maybe<DateTimeInput>;
  AND?: Maybe<EventWhereInput[] | EventWhereInput>;
  OR?: Maybe<EventWhereInput[] | EventWhereInput>;
  NOT?: Maybe<EventWhereInput[] | EventWhereInput>;
}

export interface EventCreateManyWithoutParticipantsInput {
  create?: Maybe<
    EventCreateWithoutParticipantsInput[] | EventCreateWithoutParticipantsInput
  >;
  connect?: Maybe<EventWhereUniqueInput[] | EventWhereUniqueInput>;
}

export interface EventUpsertWithWhereUniqueWithoutParticipantsInput {
  where: EventWhereUniqueInput;
  update: EventUpdateWithoutParticipantsDataInput;
  create: EventCreateWithoutParticipantsInput;
}

export interface UserWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  refresh_token?: Maybe<ID_Input>;
  refresh_token_not?: Maybe<ID_Input>;
  refresh_token_in?: Maybe<ID_Input[] | ID_Input>;
  refresh_token_not_in?: Maybe<ID_Input[] | ID_Input>;
  refresh_token_lt?: Maybe<ID_Input>;
  refresh_token_lte?: Maybe<ID_Input>;
  refresh_token_gt?: Maybe<ID_Input>;
  refresh_token_gte?: Maybe<ID_Input>;
  refresh_token_contains?: Maybe<ID_Input>;
  refresh_token_not_contains?: Maybe<ID_Input>;
  refresh_token_starts_with?: Maybe<ID_Input>;
  refresh_token_not_starts_with?: Maybe<ID_Input>;
  refresh_token_ends_with?: Maybe<ID_Input>;
  refresh_token_not_ends_with?: Maybe<ID_Input>;
  username?: Maybe<String>;
  username_not?: Maybe<String>;
  username_in?: Maybe<String[] | String>;
  username_not_in?: Maybe<String[] | String>;
  username_lt?: Maybe<String>;
  username_lte?: Maybe<String>;
  username_gt?: Maybe<String>;
  username_gte?: Maybe<String>;
  username_contains?: Maybe<String>;
  username_not_contains?: Maybe<String>;
  username_starts_with?: Maybe<String>;
  username_not_starts_with?: Maybe<String>;
  username_ends_with?: Maybe<String>;
  username_not_ends_with?: Maybe<String>;
  password?: Maybe<String>;
  password_not?: Maybe<String>;
  password_in?: Maybe<String[] | String>;
  password_not_in?: Maybe<String[] | String>;
  password_lt?: Maybe<String>;
  password_lte?: Maybe<String>;
  password_gt?: Maybe<String>;
  password_gte?: Maybe<String>;
  password_contains?: Maybe<String>;
  password_not_contains?: Maybe<String>;
  password_starts_with?: Maybe<String>;
  password_not_starts_with?: Maybe<String>;
  password_ends_with?: Maybe<String>;
  password_not_ends_with?: Maybe<String>;
  role?: Maybe<Role>;
  role_not?: Maybe<Role>;
  role_in?: Maybe<Role[] | Role>;
  role_not_in?: Maybe<Role[] | Role>;
  createdAt?: Maybe<DateTimeInput>;
  createdAt_not?: Maybe<DateTimeInput>;
  createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_lt?: Maybe<DateTimeInput>;
  createdAt_lte?: Maybe<DateTimeInput>;
  createdAt_gt?: Maybe<DateTimeInput>;
  createdAt_gte?: Maybe<DateTimeInput>;
  updatedAt?: Maybe<DateTimeInput>;
  updatedAt_not?: Maybe<DateTimeInput>;
  updatedAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_lt?: Maybe<DateTimeInput>;
  updatedAt_lte?: Maybe<DateTimeInput>;
  updatedAt_gt?: Maybe<DateTimeInput>;
  updatedAt_gte?: Maybe<DateTimeInput>;
  events_every?: Maybe<EventWhereInput>;
  events_some?: Maybe<EventWhereInput>;
  events_none?: Maybe<EventWhereInput>;
  myevents_every?: Maybe<EventWhereInput>;
  myevents_some?: Maybe<EventWhereInput>;
  myevents_none?: Maybe<EventWhereInput>;
  AND?: Maybe<UserWhereInput[] | UserWhereInput>;
  OR?: Maybe<UserWhereInput[] | UserWhereInput>;
  NOT?: Maybe<UserWhereInput[] | UserWhereInput>;
}

export interface EventScalarWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  title?: Maybe<String>;
  title_not?: Maybe<String>;
  title_in?: Maybe<String[] | String>;
  title_not_in?: Maybe<String[] | String>;
  title_lt?: Maybe<String>;
  title_lte?: Maybe<String>;
  title_gt?: Maybe<String>;
  title_gte?: Maybe<String>;
  title_contains?: Maybe<String>;
  title_not_contains?: Maybe<String>;
  title_starts_with?: Maybe<String>;
  title_not_starts_with?: Maybe<String>;
  title_ends_with?: Maybe<String>;
  title_not_ends_with?: Maybe<String>;
  content?: Maybe<String>;
  content_not?: Maybe<String>;
  content_in?: Maybe<String[] | String>;
  content_not_in?: Maybe<String[] | String>;
  content_lt?: Maybe<String>;
  content_lte?: Maybe<String>;
  content_gt?: Maybe<String>;
  content_gte?: Maybe<String>;
  content_contains?: Maybe<String>;
  content_not_contains?: Maybe<String>;
  content_starts_with?: Maybe<String>;
  content_not_starts_with?: Maybe<String>;
  content_ends_with?: Maybe<String>;
  content_not_ends_with?: Maybe<String>;
  createdAt?: Maybe<DateTimeInput>;
  createdAt_not?: Maybe<DateTimeInput>;
  createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_lt?: Maybe<DateTimeInput>;
  createdAt_lte?: Maybe<DateTimeInput>;
  createdAt_gt?: Maybe<DateTimeInput>;
  createdAt_gte?: Maybe<DateTimeInput>;
  updatedAt?: Maybe<DateTimeInput>;
  updatedAt_not?: Maybe<DateTimeInput>;
  updatedAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_lt?: Maybe<DateTimeInput>;
  updatedAt_lte?: Maybe<DateTimeInput>;
  updatedAt_gt?: Maybe<DateTimeInput>;
  updatedAt_gte?: Maybe<DateTimeInput>;
  AND?: Maybe<EventScalarWhereInput[] | EventScalarWhereInput>;
  OR?: Maybe<EventScalarWhereInput[] | EventScalarWhereInput>;
  NOT?: Maybe<EventScalarWhereInput[] | EventScalarWhereInput>;
}

export interface UserUpdateInput {
  refresh_token?: Maybe<ID_Input>;
  username?: Maybe<String>;
  password?: Maybe<String>;
  role?: Maybe<Role>;
  events?: Maybe<EventUpdateManyWithoutParticipantsInput>;
  myevents?: Maybe<EventUpdateManyWithoutAuthorInput>;
}

export interface EventUpdateManyWithWhereNestedInput {
  where: EventScalarWhereInput;
  data: EventUpdateManyDataInput;
}

export interface UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput;
  data: UserUpdateManyDataInput;
}

export interface EventUpdateManyDataInput {
  title?: Maybe<String>;
  content?: Maybe<String>;
}

export interface EventUpsertWithWhereUniqueWithoutAuthorInput {
  where: EventWhereUniqueInput;
  update: EventUpdateWithoutAuthorDataInput;
  create: EventCreateWithoutAuthorInput;
}

export interface UserUpsertWithoutMyeventsInput {
  update: UserUpdateWithoutMyeventsDataInput;
  create: UserCreateWithoutMyeventsInput;
}

export interface UserCreateWithoutMyeventsInput {
  id?: Maybe<ID_Input>;
  refresh_token: ID_Input;
  username: String;
  password: String;
  role?: Maybe<Role>;
  events?: Maybe<EventCreateManyWithoutParticipantsInput>;
}

export interface EventUpdateManyWithoutAuthorInput {
  create?: Maybe<
    EventCreateWithoutAuthorInput[] | EventCreateWithoutAuthorInput
  >;
  delete?: Maybe<EventWhereUniqueInput[] | EventWhereUniqueInput>;
  connect?: Maybe<EventWhereUniqueInput[] | EventWhereUniqueInput>;
  set?: Maybe<EventWhereUniqueInput[] | EventWhereUniqueInput>;
  disconnect?: Maybe<EventWhereUniqueInput[] | EventWhereUniqueInput>;
  update?: Maybe<
    | EventUpdateWithWhereUniqueWithoutAuthorInput[]
    | EventUpdateWithWhereUniqueWithoutAuthorInput
  >;
  upsert?: Maybe<
    | EventUpsertWithWhereUniqueWithoutAuthorInput[]
    | EventUpsertWithWhereUniqueWithoutAuthorInput
  >;
  deleteMany?: Maybe<EventScalarWhereInput[] | EventScalarWhereInput>;
  updateMany?: Maybe<
    EventUpdateManyWithWhereNestedInput[] | EventUpdateManyWithWhereNestedInput
  >;
}

export interface UserUpdateWithoutEventsDataInput {
  refresh_token?: Maybe<ID_Input>;
  username?: Maybe<String>;
  password?: Maybe<String>;
  role?: Maybe<Role>;
  myevents?: Maybe<EventUpdateManyWithoutAuthorInput>;
}

export interface UserUpdateWithWhereUniqueWithoutEventsInput {
  where: UserWhereUniqueInput;
  data: UserUpdateWithoutEventsDataInput;
}

export interface UserUpdateManyWithoutEventsInput {
  create?: Maybe<UserCreateWithoutEventsInput[] | UserCreateWithoutEventsInput>;
  delete?: Maybe<UserWhereUniqueInput[] | UserWhereUniqueInput>;
  connect?: Maybe<UserWhereUniqueInput[] | UserWhereUniqueInput>;
  set?: Maybe<UserWhereUniqueInput[] | UserWhereUniqueInput>;
  disconnect?: Maybe<UserWhereUniqueInput[] | UserWhereUniqueInput>;
  update?: Maybe<
    | UserUpdateWithWhereUniqueWithoutEventsInput[]
    | UserUpdateWithWhereUniqueWithoutEventsInput
  >;
  upsert?: Maybe<
    | UserUpsertWithWhereUniqueWithoutEventsInput[]
    | UserUpsertWithWhereUniqueWithoutEventsInput
  >;
  deleteMany?: Maybe<UserScalarWhereInput[] | UserScalarWhereInput>;
  updateMany?: Maybe<
    UserUpdateManyWithWhereNestedInput[] | UserUpdateManyWithWhereNestedInput
  >;
}

export interface EventCreateWithoutParticipantsInput {
  id?: Maybe<ID_Input>;
  title: String;
  content: String;
  author?: Maybe<UserCreateOneWithoutMyeventsInput>;
}

export interface EventCreateInput {
  id?: Maybe<ID_Input>;
  title: String;
  content: String;
  author?: Maybe<UserCreateOneWithoutMyeventsInput>;
  participants?: Maybe<UserCreateManyWithoutEventsInput>;
}

export interface UserScalarWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  refresh_token?: Maybe<ID_Input>;
  refresh_token_not?: Maybe<ID_Input>;
  refresh_token_in?: Maybe<ID_Input[] | ID_Input>;
  refresh_token_not_in?: Maybe<ID_Input[] | ID_Input>;
  refresh_token_lt?: Maybe<ID_Input>;
  refresh_token_lte?: Maybe<ID_Input>;
  refresh_token_gt?: Maybe<ID_Input>;
  refresh_token_gte?: Maybe<ID_Input>;
  refresh_token_contains?: Maybe<ID_Input>;
  refresh_token_not_contains?: Maybe<ID_Input>;
  refresh_token_starts_with?: Maybe<ID_Input>;
  refresh_token_not_starts_with?: Maybe<ID_Input>;
  refresh_token_ends_with?: Maybe<ID_Input>;
  refresh_token_not_ends_with?: Maybe<ID_Input>;
  username?: Maybe<String>;
  username_not?: Maybe<String>;
  username_in?: Maybe<String[] | String>;
  username_not_in?: Maybe<String[] | String>;
  username_lt?: Maybe<String>;
  username_lte?: Maybe<String>;
  username_gt?: Maybe<String>;
  username_gte?: Maybe<String>;
  username_contains?: Maybe<String>;
  username_not_contains?: Maybe<String>;
  username_starts_with?: Maybe<String>;
  username_not_starts_with?: Maybe<String>;
  username_ends_with?: Maybe<String>;
  username_not_ends_with?: Maybe<String>;
  password?: Maybe<String>;
  password_not?: Maybe<String>;
  password_in?: Maybe<String[] | String>;
  password_not_in?: Maybe<String[] | String>;
  password_lt?: Maybe<String>;
  password_lte?: Maybe<String>;
  password_gt?: Maybe<String>;
  password_gte?: Maybe<String>;
  password_contains?: Maybe<String>;
  password_not_contains?: Maybe<String>;
  password_starts_with?: Maybe<String>;
  password_not_starts_with?: Maybe<String>;
  password_ends_with?: Maybe<String>;
  password_not_ends_with?: Maybe<String>;
  role?: Maybe<Role>;
  role_not?: Maybe<Role>;
  role_in?: Maybe<Role[] | Role>;
  role_not_in?: Maybe<Role[] | Role>;
  createdAt?: Maybe<DateTimeInput>;
  createdAt_not?: Maybe<DateTimeInput>;
  createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_lt?: Maybe<DateTimeInput>;
  createdAt_lte?: Maybe<DateTimeInput>;
  createdAt_gt?: Maybe<DateTimeInput>;
  createdAt_gte?: Maybe<DateTimeInput>;
  updatedAt?: Maybe<DateTimeInput>;
  updatedAt_not?: Maybe<DateTimeInput>;
  updatedAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_lt?: Maybe<DateTimeInput>;
  updatedAt_lte?: Maybe<DateTimeInput>;
  updatedAt_gt?: Maybe<DateTimeInput>;
  updatedAt_gte?: Maybe<DateTimeInput>;
  AND?: Maybe<UserScalarWhereInput[] | UserScalarWhereInput>;
  OR?: Maybe<UserScalarWhereInput[] | UserScalarWhereInput>;
  NOT?: Maybe<UserScalarWhereInput[] | UserScalarWhereInput>;
}

export interface EventUpdateManyMutationInput {
  title?: Maybe<String>;
  content?: Maybe<String>;
}

export interface EventSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<EventWhereInput>;
  AND?: Maybe<EventSubscriptionWhereInput[] | EventSubscriptionWhereInput>;
  OR?: Maybe<EventSubscriptionWhereInput[] | EventSubscriptionWhereInput>;
  NOT?: Maybe<EventSubscriptionWhereInput[] | EventSubscriptionWhereInput>;
}

export interface NodeNode {
  id: ID_Output;
}

export interface UserPreviousValues {
  id: ID_Output;
  refresh_token: ID_Output;
  username: String;
  password: String;
  role: Role;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
}

export interface UserPreviousValuesPromise
  extends Promise<UserPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  refresh_token: () => Promise<ID_Output>;
  username: () => Promise<String>;
  password: () => Promise<String>;
  role: () => Promise<Role>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface UserPreviousValuesSubscription
  extends Promise<AsyncIterator<UserPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  refresh_token: () => Promise<AsyncIterator<ID_Output>>;
  username: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  role: () => Promise<AsyncIterator<Role>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface Event {
  id: ID_Output;
  title: String;
  content: String;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
}

export interface EventPromise extends Promise<Event>, Fragmentable {
  id: () => Promise<ID_Output>;
  title: () => Promise<String>;
  content: () => Promise<String>;
  author: <T = UserPromise>() => T;
  participants: <T = FragmentableArray<User>>(args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface EventSubscription
  extends Promise<AsyncIterator<Event>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  title: () => Promise<AsyncIterator<String>>;
  content: () => Promise<AsyncIterator<String>>;
  author: <T = UserSubscription>() => T;
  participants: <T = Promise<AsyncIterator<UserSubscription>>>(args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface EventNullablePromise
  extends Promise<Event | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  title: () => Promise<String>;
  content: () => Promise<String>;
  author: <T = UserPromise>() => T;
  participants: <T = FragmentableArray<User>>(args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface User {
  id: ID_Output;
  refresh_token: ID_Output;
  username: String;
  password: String;
  role: Role;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
}

export interface UserPromise extends Promise<User>, Fragmentable {
  id: () => Promise<ID_Output>;
  refresh_token: () => Promise<ID_Output>;
  username: () => Promise<String>;
  password: () => Promise<String>;
  role: () => Promise<Role>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
  events: <T = FragmentableArray<Event>>(args?: {
    where?: EventWhereInput;
    orderBy?: EventOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
  myevents: <T = FragmentableArray<Event>>(args?: {
    where?: EventWhereInput;
    orderBy?: EventOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
}

export interface UserSubscription
  extends Promise<AsyncIterator<User>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  refresh_token: () => Promise<AsyncIterator<ID_Output>>;
  username: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  role: () => Promise<AsyncIterator<Role>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  events: <T = Promise<AsyncIterator<EventSubscription>>>(args?: {
    where?: EventWhereInput;
    orderBy?: EventOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
  myevents: <T = Promise<AsyncIterator<EventSubscription>>>(args?: {
    where?: EventWhereInput;
    orderBy?: EventOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
}

export interface UserNullablePromise
  extends Promise<User | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  refresh_token: () => Promise<ID_Output>;
  username: () => Promise<String>;
  password: () => Promise<String>;
  role: () => Promise<Role>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
  events: <T = FragmentableArray<Event>>(args?: {
    where?: EventWhereInput;
    orderBy?: EventOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
  myevents: <T = FragmentableArray<Event>>(args?: {
    where?: EventWhereInput;
    orderBy?: EventOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface UserConnection {
  pageInfo: PageInfo;
  edges: UserEdge[];
}

export interface UserConnectionPromise
  extends Promise<UserConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<UserEdge>>() => T;
  aggregate: <T = AggregateUserPromise>() => T;
}

export interface UserConnectionSubscription
  extends Promise<AsyncIterator<UserConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<UserEdgeSubscription>>>() => T;
  aggregate: <T = AggregateUserSubscription>() => T;
}

export interface EventSubscriptionPayload {
  mutation: MutationType;
  node: Event;
  updatedFields: String[];
  previousValues: EventPreviousValues;
}

export interface EventSubscriptionPayloadPromise
  extends Promise<EventSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = EventPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = EventPreviousValuesPromise>() => T;
}

export interface EventSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<EventSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = EventSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = EventPreviousValuesSubscription>() => T;
}

export interface EventPreviousValues {
  id: ID_Output;
  title: String;
  content: String;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
}

export interface EventPreviousValuesPromise
  extends Promise<EventPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  title: () => Promise<String>;
  content: () => Promise<String>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface EventPreviousValuesSubscription
  extends Promise<AsyncIterator<EventPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  title: () => Promise<AsyncIterator<String>>;
  content: () => Promise<AsyncIterator<String>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface EventConnection {
  pageInfo: PageInfo;
  edges: EventEdge[];
}

export interface EventConnectionPromise
  extends Promise<EventConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<EventEdge>>() => T;
  aggregate: <T = AggregateEventPromise>() => T;
}

export interface EventConnectionSubscription
  extends Promise<AsyncIterator<EventConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<EventEdgeSubscription>>>() => T;
  aggregate: <T = AggregateEventSubscription>() => T;
}

export interface AggregateUser {
  count: Int;
}

export interface AggregateUserPromise
  extends Promise<AggregateUser>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateUserSubscription
  extends Promise<AsyncIterator<AggregateUser>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface AggregateEvent {
  count: Int;
}

export interface AggregateEventPromise
  extends Promise<AggregateEvent>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateEventSubscription
  extends Promise<AsyncIterator<AggregateEvent>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface UserEdge {
  node: User;
  cursor: String;
}

export interface UserEdgePromise extends Promise<UserEdge>, Fragmentable {
  node: <T = UserPromise>() => T;
  cursor: () => Promise<String>;
}

export interface UserEdgeSubscription
  extends Promise<AsyncIterator<UserEdge>>,
    Fragmentable {
  node: <T = UserSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface UserSubscriptionPayload {
  mutation: MutationType;
  node: User;
  updatedFields: String[];
  previousValues: UserPreviousValues;
}

export interface UserSubscriptionPayloadPromise
  extends Promise<UserSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = UserPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = UserPreviousValuesPromise>() => T;
}

export interface UserSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<UserSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = UserSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = UserPreviousValuesSubscription>() => T;
}

export interface EventEdge {
  node: Event;
  cursor: String;
}

export interface EventEdgePromise extends Promise<EventEdge>, Fragmentable {
  node: <T = EventPromise>() => T;
  cursor: () => Promise<String>;
}

export interface EventEdgeSubscription
  extends Promise<AsyncIterator<EventEdge>>,
    Fragmentable {
  node: <T = EventSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

/*
DateTime scalar input type, allowing Date
*/
export type DateTimeInput = Date | string;

/*
DateTime scalar output type, which is always a string
*/
export type DateTimeOutput = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

export type Long = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Event",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const prisma: Prisma;
