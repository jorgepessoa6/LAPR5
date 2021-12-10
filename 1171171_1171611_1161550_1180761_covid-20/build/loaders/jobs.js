"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ agenda }) => {
    // agenda.define(
    //  'send-email',
    //  { priority: 'high', concurrency: config.agenda.concurrency },
    // @TODO Could this be a static method? Would it be better?
    //new EmailSequenceJob().handler,
    //);
    agenda.start();
};
//# sourceMappingURL=jobs.js.map