"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMap = void 0;
const typedi_1 = require("typedi");
const Mapper_1 = require("../core/infra/Mapper");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const user_1 = require("../models/user");
const userEmail_1 = require("../models/userEmail");
const userPassword_1 = require("../models/userPassword");
const roleRepo_1 = __importDefault(require("../repo/roleRepo"));
class UserMap extends Mapper_1.Mapper {
    static toDTO(user) {
        return {
            id: user.id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email.value,
            password: "",
            role: user.role.id.toString()
        };
    }
    static async toDomain(raw) {
        const userEmailOrError = userEmail_1.UserEmail.create(raw.email);
        const userPasswordOrError = userPassword_1.UserPassword.create({ value: raw.password, hashed: true });
        const repo = typedi_1.Container.get(roleRepo_1.default);
        const role = await repo.findByDomainId(raw.role);
        const userOrError = user_1.User.create({
            firstName: raw.firstName,
            lastName: raw.lastName,
            email: userEmailOrError.getValue(),
            password: userPasswordOrError.getValue(),
            role: role,
        }, new UniqueEntityID_1.UniqueEntityID(raw.base_user_id));
        userOrError.isFailure ? console.log(userOrError.error) : '';
        return userOrError.isSuccess ? userOrError.getValue() : null;
    }
    static toPersistence(user) {
        const a = {
            base_user_id: user.id.toString(),
            email: user.email.value,
            password: user.password.value,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role.id.toValue(),
        };
        return a;
    }
}
exports.UserMap = UserMap;
//# sourceMappingURL=UserMap.js.map