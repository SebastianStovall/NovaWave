"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_1 = require("../controllers/media");
exports.default = (router) => {
    router.patch('/media/update', media_1.updateCurrentMedia);
};
