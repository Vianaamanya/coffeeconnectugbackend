"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FarmerModel = new mongoose_1.default.Schema({
    phone_number: {
        type: String,
        required: true,
        unique: true,
    },
    profile_image: {
        type: String,
    },
    full_name: {
        type: String,
        required: true,
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
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    village: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    sub_county: {
        type: String,
        required: true,
    },
    // only applicable to farmers
    types_of_coffee: {
        coffee_type: {
            type: String,
        },
        coffee_type_images: {
            type: String,
        },
    },
    // Only applicable to app helpers
    farmers_being_helped: {
        type: [
            {
                farmerId: {
                    type: String,
                },
            },
        ],
        default: [],
    },
    isFarmer: {
        type: Boolean,
        default: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isAppHelper: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const Farmer = mongoose_1.default.model("Farmer", FarmerModel);
exports.default = Farmer;
//# sourceMappingURL=Farmer.js.map