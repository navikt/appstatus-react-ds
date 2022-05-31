import { Button } from '@navikt/ds-react';
import React, { useState } from 'react';
import ApplicationStatus from './application-status/ApplicationStatus';
import '@navikt/ds-css';

const DevPage = () => {
    const [app, setApp] = useState<string>('pleiepengesoknad');
    return (
        <main>
            <h2>Applikasjonsstatus hentet fra Sanity</h2>
            <ApplicationStatus applicationKey={app} />
            <Button onClick={() => setApp('pleiepengesoknad')}>Pleiepengesøknad</Button>
            <Button onClick={() => setApp('foreldrepengesoknad')}>Foreldrepengersøknad</Button>
        </main>
    );
};

export default DevPage;
