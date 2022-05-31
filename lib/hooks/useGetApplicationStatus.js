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
const getApplicationDocumentStatusQuery = (key, team) => {
    const teamQuery = team ? `team->.key == "${team}"` : '';
    return `*[_type == 'application' && key == "${key}"${teamQuery}]{
        key,
        applicationStatus,
        message,
        liveUpdate,
        name,
        team->{key}
      }`;
};
const defaultState = {
    status: types_1.Status.normal,
    message: undefined,
};
function useGetApplicationStatus(applicationKey, sanityConfig) {
    const [state, setState] = (0, react_1.useState)(defaultState);
    const [application, setApplication] = (0, react_1.useState)();
    const [applicationTeam, setApplicationTeam] = (0, react_1.useState)();
    const [liveUpdate, setLiveUpdate] = (0, react_1.useState)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)();
    const subscription = (0, react_1.useRef)();
    function fetch(key, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            setIsLoading(true);
            try {
                const result = yield (0, sanityClient_1.getAppSanityClient)(config).fetch(getApplicationDocumentStatusQuery(key));
                if (result.length === 1) {
                    const appResult = result[0];
                    setApplication(appResult);
                    setApplicationTeam((_a = appResult.team) === null || _a === void 0 ? void 0 : _a.key);
                    setLiveUpdate(appResult.liveUpdate === true);
                }
            }
            catch (error) {
                setError(error);
                setApplication(undefined);
                setApplicationTeam(undefined);
                setLiveUpdate(false);
            }
            finally {
                setIsLoading(false);
            }
        });
    }
    const startSubscription = (key, config) => {
        subscription.current = (0, sanityClient_1.getAppSanityClient)(config)
            .listen(getApplicationDocumentStatusQuery(key))
            .subscribe(({ result }) => {
            const appResult = result;
            setApplication(appResult);
        });
    };
    const prevApplicationKey = (0, usePrevious_1.usePrevious)(applicationKey);
    const prevLiveUpdate = (0, usePrevious_1.usePrevious)(liveUpdate);
    const stopSubscription = () => {
        if (subscription.current && subscription.current.unsubscribe) {
            subscription.current.unsubscribe();
        }
    };
    (0, react_1.useEffect)(() => {
        if (!(0, utils_1.sanityConfigIsValid)(sanityConfig)) {
            setIsLoading(false);
            return;
        }
        if (error) {
            setLiveUpdate(false);
            return;
        }
        if (applicationKey && applicationKey !== prevApplicationKey) {
            fetch(applicationKey, sanityConfig);
        }
        if (applicationKey === undefined) {
            setLiveUpdate(false);
        }
    }, [applicationKey, prevApplicationKey, error, sanityConfig]);
    (0, react_1.useEffect)(() => {
        if (applicationKey &&
            (prevLiveUpdate !== liveUpdate || (applicationKey && applicationKey !== prevApplicationKey))) {
            if (liveUpdate === true) {
                if (!subscription.current) {
                    startSubscription(applicationKey, sanityConfig);
                }
                else {
                    stopSubscription();
                    startSubscription(applicationKey, sanityConfig);
                }
            }
            else {
                stopSubscription();
            }
        }
    }, [liveUpdate, prevLiveUpdate, applicationKey, prevApplicationKey, sanityConfig]);
    (0, react_1.useEffect)(() => {
        if (application) {
            setState({
                status: application.applicationStatus.status,
                message: (0, utils_1.getMessage)(application.message),
            });
        }
    }, [application]);
    return Object.assign(Object.assign({}, state), { team: applicationTeam, isLoading, error });
}
exports.default = useGetApplicationStatus;
