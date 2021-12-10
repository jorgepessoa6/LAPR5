"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPassword = void 0;
const ValueObject_1 = require("../core/domain/ValueObject");
const Result_1 = require("../core/logic/Result");
const Guard_1 = require("../core/logic/Guard");
const bcrypt = __importStar(require("bcrypt-nodejs"));
class UserPassword extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    /**
   * @method comparePassword
   * @desc Compares as plain-text and hashed password.
   */
    async comparePassword(plainTextPassword) {
        let hashed;
        if (this.isAlreadyHashed()) {
            hashed = this.props.value;
            return this.bcryptCompare(plainTextPassword, hashed);
        }
        else {
            return this.props.value === plainTextPassword;
        }
    }
    bcryptCompare(plainText, hashed) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainText, hashed, (err, compareResult) => {
                if (err)
                    return resolve(false);
                return resolve(compareResult);
            });
        });
    }
    isAlreadyHashed() {
        return this.props.hashed;
    }
    hashPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, null, null, (err, hash) => {
                if (err)
                    return reject(err);
                resolve(hash);
            });
        });
    }
    getHashedValue() {
        return new Promise((resolve) => {
            if (this.isAlreadyHashed()) {
                return resolve(this.props.value);
            }
            else {
                return resolve(this.hashPassword(this.props.value));
            }
        });
    }
    static isAppropriateLength(value) {
        return value.length >= 8;
    }
    static create(props) {
        const propsResult = Guard_1.Guard.againstNullOrUndefined(props.value, 'password');
        if (!propsResult.succeeded) {
            return Result_1.Result.fail(propsResult.message);
        }
        else {
            if (!props.hashed) {
                if (!this.isAppropriateLength(props.value)) {
                    return Result_1.Result.fail('Password doesnt meet criteria [1 uppercase, 1 lowercase, one digit or symbol and 8 chars min].');
                }
            }
            return Result_1.Result.ok(new UserPassword({
                value: props.value,
                hashed: !!props.hashed === true
            }));
        }
    }
}
exports.UserPassword = UserPassword;
//# sourceMappingURL=userPassword.js.map