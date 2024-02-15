"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const loginuser_1 = require("../../controllers/auth/loginuser");
const authRoute = (router) => {
    router.post("/auth/login", loginuser_1.loginController);
};
exports.authRoute = authRoute;
//# sourceMappingURL=auth.js.map