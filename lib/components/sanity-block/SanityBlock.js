"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ds_react_1 = require("@navikt/ds-react");
const react_1 = require("@portabletext/react");
const react_2 = __importDefault(require("react"));
const SanityBlock = ({ content }) => {
    return (react_2.default.createElement(react_1.PortableText, { value: content, components: {
            marks: {
                link: ({ children, value }) => {
                    return react_2.default.createElement(ds_react_1.Link, { href: value.href }, children);
                },
            },
            block: {
                title: ({ children }) => (react_2.default.createElement(ds_react_1.Heading, { level: "3", size: "medium", spacing: true }, children)),
                ingress: ({ children }) => react_2.default.createElement(ds_react_1.Ingress, null, children),
            },
        } }));
};
exports.default = SanityBlock;
