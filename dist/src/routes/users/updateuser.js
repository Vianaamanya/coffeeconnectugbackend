"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const updateuser_1 = require("../../controllers/users/updateuser");
const userRoute = (router) => {
    // Update a user
    router.put("/users/update/:userId", updateuser_1.updateUser);
};
exports.userRoute = userRoute;
//# sourceMappingURL=updateuser.js.map