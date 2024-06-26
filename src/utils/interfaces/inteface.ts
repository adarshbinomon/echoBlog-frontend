import { AxiosError } from "axios";

export interface Errors {
  about?: string;
  password?: string;
  name?: string;
  email?: string;
  phone?: string;
  confirmPassword?: string;
  gender?: string;
  dateOfBirth?: string;
  accountType?: string;
  userName?: string;
  bio?: string;
  coverPicture?: string;
  profilePicture?: string;
}

export interface Values {
  email?: string;
  userName?: string;
  name?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  dateOfBirth?: string;
  accountType?: string;
  bio?: string;
  _id?: string;
  coverPicture?: string;
  profilePicture?: string;
  about?: string;
  createdBy?: string;
}

export interface UserData {
  community: unknown;
  savedPosts: any;
  userData: UserData;
  user: UserData;
  selector: string | number; 
  isActive: boolean;
  persisted: UserData; 
  email: string;
  isGoogle: boolean;
  name: string;
  password: string;
  phone: string;
  profilePicture: string;
  uid: string;
  userName: string;
  gender: string;
  interestedTags: [string];
  accountType: string;
  bio: string;
  coverPicture: string;
  createdOn: string;
  followRequests: [string];
  followers: [string];
  following: [string];
  _id: string;
  __v: number;
  isPremium: boolean;
}

export interface PostData {
  reportCount: number;
  reportedUsersList: [string];
  name: string;
  visibility: string;
  createdBy: UserData;
  content: string;
  _id: string;
  title: string;
  createdOn: Date;
  like: [string];
  comment: [CommentData];
  image: [string];
  length?: number;
  slice?: [];
}

export interface CommentData {
  reply: string;
  replies?: [CommentData];
  _id: string;
  comment: string;
  name: string;
  userId: string;
  userName: string;
  likes: [string];
  createdAt: Date;
}

export interface CommunityData {
  admins: [string];
  name: string;
  about: string;
  createdBy: string;
  post: [string];
  members: [UserData];
  profilePicture: string;
  coverPicture: string;
  createdOn: Date;
  _id: string;
  slice: ArraySliceMethod<T>;
  map: ArrayMapMethod<T, U>;
}

export interface WritePostData {
  content: string;
  createdBy: string;
  title: string;
  communityId?: string;
}

export interface Message {
  shouldShake: boolean;
  _id: string;
  senderId: string;
  recieverId: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Conversation {
  name: string;
  error?: AxiosError;
  profilePicture: string;
  conversations: [Conversation];
  _id: string;
  participants: [UserData];
  messages: [Message];
  createdAt: Date;
  updatedAt: Date;
}


interface ArraySliceMethod<T> {
  slice(start?: number, end?: number): T[];
}

interface ArrayMapMethod<T, U> {
  map(callbackfn: (value: T, index: number, array: T[]) => U): U[];
}

