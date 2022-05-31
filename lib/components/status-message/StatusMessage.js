"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ds_react_1 = require("@navikt/ds-react");
const react_1 = __importDefault(require("react"));
const types_1 = require("../../types");
const utils_1 = require("../../utils");
const SanityBlock_1 = __importDefault(require("../sanity-block/SanityBlock"));
require("./statusMessage.scss");
const getAlertStripeTypeFromMessageType = (type) => {
    switch (type) {
        case types_1.SanityMessageType.info:
            return 'info';
        case types_1.SanityMessageType.warning:
            return 'warning';
        case types_1.SanityMessageType.error:
            return 'error';
        default:
            return 'info';
    }
};
const StatusMessage = ({ message, locale = 'nb', wrapInAlertStripe = true }) => {
    const info = (0, utils_1.getLocaleBlockContent)(message.message, locale);
    if (!info || info.length === 0) {
        return null;
    }
    const content = react_1.default.createElement(SanityBlock_1.default, { content: info });
    return wrapInAlertStripe ? (react_1.default.createElement(ds_react_1.Alert, { variant: getAlertStripeTypeFromMessageType(message.messageType), className: "statusMessage" }, content)) : (react_1.default.createElement(react_1.default.Fragment, null, content));
};
exports.default = StatusMessage;
