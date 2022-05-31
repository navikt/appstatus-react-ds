/// <reference types="react" />
import { SanityLocale } from '../../types';
import { SanityStatusMessage } from '../../types/sanityObjects';
import './statusMessage.scss';
interface Props {
    message: SanityStatusMessage;
    wrapInAlertStripe?: boolean;
    locale?: SanityLocale;
}
declare const StatusMessage: ({ message, locale, wrapInAlertStripe }: Props) => JSX.Element | null;
export default StatusMessage;
