export type User = {
  id: string;
  name: string;
};

export type ChatteEvent = {
  id: string;
  userId: string;
  message: string;
  time: Date;
};

export type ChatteStatus =
  | "starving"
  | "hungry"
  | "slightlySatisfied"
  | "satisfied"
  | "full";

export type GetUsersResponse = User[];

export type PostUsersResponse = {
  id: string;
  name: string;
};

export type GetEventsResponse = ChatteEvent[];

export type PostEventsResponse = {
  id: string;
};

export type ChatteMessageResponse = {
  message: string;
  status: ChatteStatus;
};
