interface IUser {
  createdAt: string | Date;
  email?: string;
  password: string;
  role: "owner" | "employee";
  phone?: string;
  username?: string;
  uid: string;
}

export type { IUser };
