import { User } from "../../entities/user.entity";

export type AuthUser = Omit<User, 'password'>;

export interface JwtPayload {
  email: string;
  sub: number;
}
