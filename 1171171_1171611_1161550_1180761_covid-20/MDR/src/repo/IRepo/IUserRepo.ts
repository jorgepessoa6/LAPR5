import { Repo } from "../../core/infra/Repo";
import { User } from "../../models/user";
import { UserEmail } from "../../models/userEmail";

export interface IUserRepo extends Repo<User> {
	findByEmail (email: UserEmail | string): Promise<User>;
	save(user: User): Promise<User>;
  }
  