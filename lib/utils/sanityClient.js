"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppSanityClient = void 0;
const client_1 = __importDefault(require("@sanity/client"));
const getAppSanityClient = ({ projectId, dataset, token = '' }) => {
    return (0, client_1.default)({
        projectId,
        dataset,
        token,
        useCdn: false,
    });
};
exports.getAppSanityClient = getAppSanityClient;
