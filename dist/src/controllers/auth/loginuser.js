"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const Farmer_1 = __importDefault(require("../../models/Farmer"));
const ESP_1 = __importDefault(require("../../models/ESP"));
const passwordUtils_1 = require("../../utils/passwordUtils");
const jwtUtils_1 = require("../../utils/jwtUtils");
const loginController = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!(username || email)) {
            res.status(400).send("Either username or email is required for login");
            return;
        }
        let user;
        if (username) {
            user = await Farmer_1.default.findOne({ $or: [{ username }, { email: username }] });
            if (!user) {
                user = await ESP_1.default.findOne({ $or: [{ username }, { email: username }] });
            }
        }
        else {
            user = await Farmer_1.default.findOne({ email });
            if (!user) {
                user = await ESP_1.default.findOne({ email });
            }
        }
        if (!user) {
            res.status(401).send("Invalid credentials");
            return;
        }
        const isPasswordMatch = await (0, passwordUtils_1.comparePasswords)(password, user.password);
        if (!isPasswordMatch) {
            res.status(401).send("Invalid credentials");
            return;
        }
        const userDataWithoutPassword = (0, passwordUtils_1.excludePassword)(user);
        // Generate JWT token
        const token = (0, jwtUtils_1.generateToken)({
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
        });
        res.status(200).json({ user: userDataWithoutPassword, token });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
exports.loginController = loginController;
//# sourceMappingURL=loginuser.js.map