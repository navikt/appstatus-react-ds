"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const types_1 = require("../types");
const utils_1 = require("../utils");
const sanityClient_1 = require("../utils/sanityClient");
const usePrevious_1 = require("./usePrevious");
const getTeamStatusQuery = (key) => {
    return `*[_type == 'team' && key == "${key}"]{
        key,
        teamApplicationStatus,
        liveUpdate,
        message,
      }`;
};
function useGetTeamStatus(teamKey, sanityConfig) {
    const [status, setStatus] = (0, react_1.useState)(types_1.Status.normal);
    const [message, setMessage] = (0, react_1.useState)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [liveUpdate, setLiveUpdate] = (0, react_1.useState)();
    const [error, setError] = (0, react_1.useState)();
    const subscription = (0, react_1.useRef)();
    function fetch(key, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = getTeamStatusQuery(key);
            setIsLoading(true);
            try {
                const result = yield (0, sanityClient_1.getAppSanityClient)(config).fetch(query);
                if (result.length === 1) {
                    const team = result[0];
                    setStatus(team.teamApplicationStatus.status);
                    setMessage((0, utils_1.getMessage)(team.message));
                    setLiveUpdate(team.liveUpdate === true);
                }
            }
            catch (error) {
                setError(error);
                setStatus(types_1.Status.normal);
                setMessage(undefined);
                setLiveUpdate(false);
            }
            finally {
                setIsLoading(false);
            }
        });
    }
    const startSubscription = (key, config) => {
        const query = getTeamStatusQuery(key);
        subscription.current = (0, sanityClient_1.getAppSanityClient)(config)
            .listen(query)
            .subscribe(({ result }) => {
            const team = result;
            setStatus(team.teamApplicationStatus.status);
            setMessage((0, utils_1.getMessage)(team.message));
        });
    };
    const stopSubscription = (key) => {
        if (subscription.current && subscription.current.unsubscribe) {
            subscription.current.unsubscribe();
        }
    };
    const prevTeamKey = (0, usePrevious_1.usePrevious)(teamKey);
    const prevLiveUpdate = (0, usePrevious_1.usePrevious)(liveUpdate);
    (0, react_1.useEffect)(() => {
        if (!(0, utils_1.sanityConfigIsValid)(sanityConfig)) {
            setIsLoading(false);
            return;
        }
        if (error) {
            setLiveUpdate(false);
            return;
        }
        if (teamKey) {
            fetch(teamKey, sanityConfig);
        }
        if (teamKey === undefined && subscription.current !== undefined) {
            setLiveUpdate(false);
        }
    }, [teamKey, prevTeamKey, error, sanityConfig]);
    (0, react_1.useEffect)(() => {
        if (teamKey) {
            if (liveUpdate === true) {
                if (!subscription.current) {
                    startSubscription(teamKey, sanityConfig);
                }
                else {
                    stopSubscription(teamKey);
                    startSubscription(teamKey, sanityConfig);
                }
            }
            else {
                stopSubscription(teamKey);
            }
        }
    }, [liveUpdate, prevLiveUpdate, teamKey, prevTeamKey, sanityConfig]);
    return { status, message, isLoading, error };
}
exports.default = useGetTeamStatus;
