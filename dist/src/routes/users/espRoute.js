"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.espRoute = void 0;
const espController_1 = require("../../controllers/users/espController");
const jwtUtils_1 = require("../../utils/jwtUtils");
const espRoute = (router) => {
    router.post("/esps", espController_1.createESP);
    router.get("/esps", espController_1.getAllESPs);
    router.get("/esps/:id", espController_1.getESPById);
    router.put("/esps/:id", espController_1.updateESPById);
    router.delete("/esps/:id", jwtUtils_1.verifyTokenAndAdmin, espController_1.deleteESPById);
};
exports.espRoute = espRoute;
//# sourceMappingURL=espRoute.js.map