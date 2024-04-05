import { FormEvent } from "react";

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
  selector: any
  isActive: boolean;
  persisted: any;
  email: string;
  isGoogle: boolean;
  name: string;
  password: string;
  phone: string;
  profilePicture: string;
  uid: string;
  userName: string;
  gender: string;
  interestedTags: any[];
  accountType: string;
  bio: string;
  coverPicture: string;
  createdOn: string;
  followRequests: any[];
  followers: any[];
  following: any[];
  _id: string;
  __v: number;
}

export interface PostData {
  reportedUsersList: any[];
  name: string;
  visibility: string;
  createdBy: any;
  content: string;
  _id: string;
  title: string;
  createdOn: Date;
  like: any[];
  comment: any[];
  image: any[];
  length?: any
  slice?: any
}

export interface CommentData {
  reply: string;
  replies: any[];
  _id: string;
  comment: string;
  name: string;
  userId: string;
  userName: string;
  likes: any[]
  createdAt: Date
}

export interface CommunityData {
  admins: any;
  name: string;
  about: string;
  createdBy: string;
  post: any[];
  members: any[];
  profilePicture: string;
  coverPicture: string;
  createdOn: Date;
  _id: string;
  slice: any;
  map: any
}

export interface WritePostData {
  content: string;
  createdBy: any;
  title: string;
  communityId?: string;
}
