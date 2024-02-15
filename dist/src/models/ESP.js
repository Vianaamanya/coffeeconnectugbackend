"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ESPModel = new mongoose_1.default.Schema({
    phone_number: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile_image: {
        type: String,
    },
    location: {
        latitude: {
            type: Number,
            required: true,
        },
        longtude: {
            type: Number,
            required: true,
        },
    },
    //company name or person name
    full_name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    sub_county: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    district: {
        type: String,
        required: true,
    },
    street_address: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const ESP = mongoose_1.default.model("ESP", ESPModel);
exports.default = ESP;
//# sourceMappingURL=ESP.js.map