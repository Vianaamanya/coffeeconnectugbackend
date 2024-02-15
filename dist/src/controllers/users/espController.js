"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteESPById = exports.updateESPById = exports.getESPById = exports.getAllESPs = exports.createESP = void 0;
const ESP_1 = __importDefault(require("../../models/ESP"));
const passwordUtils_1 = require("../../utils/passwordUtils");
const axios_1 = __importDefault(require("axios"));
// Create a new ESP
const createESP = async (req, res) => {
    try {
        const response = await axios_1.default.get(`${process.env.OPENCAGE_URL}`, {
            params: {
                key: process.env.OPENCAGE_API_KEY,
                q: `${req.body.sub_county}, ${req.body.district}, ${"Uganda"}`,
            },
        });
        // Example coordinates in DMS format
        const latitude = Number(response.data.results[0].geometry.lat);
        const longtude = Number(response.data.results[0].geometry.lng);
        console.log(latitude, longtude);
        const { password, ...rest } = req.body;
        const hashedPassword = await (0, passwordUtils_1.hashPassword)(password);
        const newESP = await ESP_1.default.create({
            ...rest,
            location: {
                latitude,
                longtude,
            },
            password: hashedPassword,
        });
        res.status(201).json(newESP);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        return;
    }
};
exports.createESP = createESP;
// Get all ESPs
const getAllESPs = async (_, res) => {
    try {
        const esps = await ESP_1.default.find();
        res.status(200).json(esps);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        return;
    }
};
exports.getAllESPs = getAllESPs;
// Get an ESP by ID
const getESPById = async (req, res) => {
    const { id } = req.params;
    try {
        const esp = await ESP_1.default.findById(id);
        if (esp) {
            res.status(200).json(esp);
            return;
        }
        else {
            res.status(404).send("ESP not found");
            return;
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        return;
    }
};
exports.getESPById = getESPById;
// Update an ESP by ID
const updateESPById = async (req, res) => {
    const { id } = req.params;
    const { password, ...rest } = req.body;
    try {
        if (password) {
            const hashedPassword = await (0, passwordUtils_1.hashPassword)(password);
            const updatedESP = await ESP_1.default.findByIdAndUpdate(id, { ...rest, password: hashedPassword }, { new: true });
            res.status(200).json(updatedESP);
            return;
        }
        else {
            const updatedESP = await ESP_1.default.findByIdAndUpdate(id, rest, { new: true });
            res.status(200).json(updatedESP);
            return;
        }
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
        return;
    }
};
exports.updateESPById = updateESPById;
// Delete an ESP by ID
const deleteESPById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedESP = await ESP_1.default.findByIdAndDelete(id);
        if (deletedESP) {
            res.status(200).json(deletedESP);
            return;
        }
        else {
            res.status(404).send("ESP not found");
            return;
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
exports.deleteESPById = deleteESPById;
//# sourceMappingURL=espController.js.map