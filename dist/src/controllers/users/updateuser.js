"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const Farmer_1 = __importDefault(require("../../models/Farmer"));
const updateUser = async (req, res) => {
    try {
        const { name } = req.body;
        const { userId } = req.params;
        const user = Farmer_1.default.findById(userId);
        console.log(req.body, "req.body");
        if (!user) {
            return res.status(404).json("User not found!");
            return;
        }
        const updatedUser = await Farmer_1.default.findByIdAndUpdate(userId, {
            $set: { name },
        }, { new: true });
        return res.status(200).json(updatedUser);
        return;
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
        return;
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=updateuser.js.map