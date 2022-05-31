"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const types_1 = require("../types");
const useGetApplicationStatus_1 = __importDefault(require("./useGetApplicationStatus"));
const useGetTeamStatus_1 = __importDefault(require("./useGetTeamStatus"));
const utils_1 = require("../utils");
const defaultState = {
    status: types_1.Status.normal,
    message: undefined,
};
const getStateForApplication = (appStatus, appMessage, teamStatus, teamMessage) => {
    if (appStatus !== types_1.ApplicationInheritTeamStatus.team) {
        return {
            status: appStatus,
            message: appMessage || teamMessage,
        };
    }
    if (appStatus === types_1.ApplicationInheritTeamStatus.team && teamStatus !== undefined) {
        return {
            status: teamStatus,
            message: appMessage || teamMessage,
        };
    }
    return defaultState;
};
function useAppStatus(applicationKey, sanityConfig) {
    const [state, setState] = (0, react_1.useState)(defaultState);
    const [config] = (0, react_1.useState)(sanityConfig);
    const { status: appStatus, message: appMessage, team: appTeam, isLoading: appIsLoading, error: appError, } = (0, useGetApplicationStatus_1.default)(applicationKey, config);
    const { status: teamStatus, message: teamMessage, isLoading: teamIsLoading, error: teamError, } = (0, useGetTeamStatus_1.default)(appTeam, config);
    const [isLoading, setIsLoading] = (0, react_1.useState)(appIsLoading || teamIsLoading);
    const [error, setError] = (0, react_1.useState)(appError || teamError);
    (0, react_1.useEffect)(() => {
        if (!(0, utils_1.sanityConfigIsValid)(config)) {
            setIsLoading(false);
            return;
        }
        setIsLoading(appIsLoading || teamIsLoading);
        setState(getStateForApplication(appStatus, appMessage, teamStatus, teamMessage));
    }, [appStatus, appMessage, appTeam, teamMessage, teamStatus, appIsLoading, teamIsLoading, config]);
    (0, react_1.useEffect)(() => {
        setError(appError || teamError);
    }, [appError, teamError]);
    return Object.assign(Object.assign({}, state), { isLoading, error });
}
exports.default = useAppStatus;
