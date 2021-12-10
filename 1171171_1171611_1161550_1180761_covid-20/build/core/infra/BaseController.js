"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
class BaseController {
    execute(req, res) {
        this.req = req;
        this.res = res;
        this.executeImpl();
    }
    static jsonResponse(res, code, message) {
        return res.status(code).json({ message });
    }
    ok(res, dto) {
        if (!!dto) {
            return res.status(200).json(dto);
        }
        else {
            return res.sendStatus(200);
        }
    }
    created(res) {
        return res.sendStatus(201);
    }
    clientError(message) {
        return BaseController.jsonResponse(this.res, 400, message ? message : 'Unauthorized');
    }
    unauthorized(message) {
        return BaseController.jsonResponse(this.res, 401, message ? message : 'Unauthorized');
    }
    paymentRequired(message) {
        return BaseController.jsonResponse(this.res, 402, message ? message : 'Payment required');
    }
    forbidden(message) {
        return BaseController.jsonResponse(this.res, 403, message ? message : 'Forbidden');
    }
    notFound(message) {
        return BaseController.jsonResponse(this.res, 404, message ? message : 'Not found');
    }
    conflict(message) {
        return BaseController.jsonResponse(this.res, 409, message ? message : 'Conflict');
    }
    tooMany(message) {
        return BaseController.jsonResponse(this.res, 429, message ? message : 'Too many requests');
    }
    todo() {
        return BaseController.jsonResponse(this.res, 400, 'TODO');
    }
    fail(error) {
        console.log(error);
        return this.res.status(500).json({
            message: error.toString()
        });
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map