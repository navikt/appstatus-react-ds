"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanityConfigIsValid = exports.getMessage = exports.getLocaleBlockContent = exports.getOptionalLocaleString = exports.getOptionalLocaleValue = exports.getLocaleString = exports.getLocaleObject = void 0;
const types_1 = require("../types");
const hasLocaleValue = (obj, locale = types_1.sanityDefaultLocale) => obj !== undefined &&
    ((obj[locale] !== undefined && obj[locale] !== '') ||
        (obj[types_1.sanityDefaultLocale] !== undefined && obj[types_1.sanityDefaultLocale] !== ''));
const getLocaleObject = (obj, locale = types_1.sanityDefaultLocale) => obj && hasLocaleValue(obj, locale) ? obj[locale] || obj[types_1.sanityDefaultLocale] : undefined;
exports.getLocaleObject = getLocaleObject;
const getLocaleString = (obj, locale = types_1.sanityDefaultLocale) => obj[locale] || obj[types_1.sanityDefaultLocale] || '';
exports.getLocaleString = getLocaleString;
const getOptionalLocaleValue = (obj, locale) => (0, types_1.isValidLocaleObject)(obj) ? (0, exports.getLocaleObject)(obj, locale) : undefined;
exports.getOptionalLocaleValue = getOptionalLocaleValue;
const getOptionalLocaleString = ({ obj, locale, }) => {
    return (0, types_1.isValidLocaleStringObject)(obj) ? (0, exports.getLocaleString)(obj, locale) : undefined;
};
exports.getOptionalLocaleString = getOptionalLocaleString;
const getLocaleBlockContent = (obj, locale = types_1.sanityDefaultLocale) => (obj && hasLocaleValue(obj, locale) ? obj[locale] || obj[types_1.sanityDefaultLocale] : []);
exports.getLocaleBlockContent = getLocaleBlockContent;
const getMessage = (messages) => messages && messages.length === 1 ? messages[0] : undefined;
exports.getMessage = getMessage;
const sanityConfigIsValid = (config) => {
    const sanityConfigPropIsValid = (prop) => prop !== undefined && typeof prop === 'string' && prop.length > 5;
    try {
        return (config !== undefined &&
            sanityConfigPropIsValid(config['projectId']) &&
            sanityConfigPropIsValid(config['dataset']));
    }
    catch (_a) {
        return false;
    }
};
exports.sanityConfigIsValid = sanityConfigIsValid;
