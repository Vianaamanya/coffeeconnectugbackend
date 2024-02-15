"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.esRequestRoute = void 0;
const esRequestController_1 = require("../../controllers/esrequests/esRequestController");
const jwtUtils_1 = require("../../utils/jwtUtils");
const esRequestRoute = (router) => {
    router.post("/es-requests", esRequestController_1.createESRequest);
    router.get("/es-requests", esRequestController_1.getAllESRequests);
    router.get("/es-requests/:id", jwtUtils_1.verifyTokenAndAuthorization, esRequestController_1.getESRequestById);
    router.put("/es-requests/:id", jwtUtils_1.verifyTokenAndAuthorization, esRequestController_1.updateESRequestById);
    router.put("/es-requests/:id/replies", jwtUtils_1.verifyTokenAndAdmin, esRequestController_1.updateRepliesById);
    router.delete("/es-requests/:id", jwtUtils_1.verifyTokenAndAuthorization, esRequestController_1.deleteESRequestById);
};
exports.esRequestRoute = esRequestRoute;
//# sourceMappingURL=esRequestRoute.js.map