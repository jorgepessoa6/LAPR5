"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = __importDefault(require("../middlewares"));
var user_controller = require('../../controller/userController');
const route = express_1.Router();
exports.default = (app) => {
    app.use('/users', route);
    route.get('/me', middlewares_1.default.isAuth, middlewares_1.default.attachCurrentUser, user_controller.getMe);
};
//# sourceMappingURL=userRoute.js.map