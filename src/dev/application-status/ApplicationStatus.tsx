import React from 'react';
import StatusMessage from '../../appstatus-react-ds/components/status-message/StatusMessage';
import useAppStatus from '../../appstatus-react-ds/hooks/useAppStatus';

interface Props {
    applicationKey: string;
}

const ApplicationStatus = ({ applicationKey }: Props) => {
    const { isLoading, status, message } = useAppStatus(applicationKey, {
        projectId: 'ryujtq87',
        dataset: 'staging',
    });
    if (isLoading) {
        return <div>Laster</div>;
    }
    return (
        <div>
            {status}
            {message && <StatusMessage message={message} />}
        </div>
    );
};

export default ApplicationStatus;
