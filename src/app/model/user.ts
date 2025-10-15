import { FilterBase } from "./filter-base";

export class User {
  userId?: string;
  fullName!: string;
  address?: string;
  country?: string;
  userName?: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  phoneNumber?: string;
  phoneNumberConfirmed?: string;
}
export class UserResult {
  userId?: string;
  fullName!: string;
  address?: string;
  country?: string;
  userName?: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  phoneNumber?: string;
  phoneNumberConfirmed?: string;
}
export class UserFilter extends FilterBase{
 
}
