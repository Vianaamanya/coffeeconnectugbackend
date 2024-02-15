"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.farmerRoute = void 0;
const farmerController_1 = require("../../controllers/users/farmerController");
const jwtUtils_1 = require("../../utils/jwtUtils");
const farmerRoute = (router) => {
    router.post("/farmers", farmerController_1.createFarmer);
    router.get("/farmers", farmerController_1.getAllFarmers);
    router.get("/farmers/:id", farmerController_1.getFarmerById);
    router.put("/farmers/:id", farmerController_1.updateFarmerById);
    router.delete("/farmers/:id", jwtUtils_1.verifyTokenAndAuthorization, farmerController_1.deleteFarmerById);
};
exports.farmerRoute = farmerRoute;
//# sourceMappingURL=farmerRoute.js.map