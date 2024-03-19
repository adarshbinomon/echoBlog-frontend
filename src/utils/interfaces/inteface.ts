export interface Errors {
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
}

export interface UserData {
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
  createdBy: any;
  content: string;
  _id: string;
  title: string;
  createdOn: Date;
  like: any[];
  comment: any[];
  image: any[];
}

export interface CommentData {
  comment: string;
  name: string;
  userId: string;
  userName: string;
}
