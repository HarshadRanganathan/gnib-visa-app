import React from 'react';
import Nav from './nav';
import Disqus from '../component/disqus';

const App = () => {
    return(
        <div>
            <h3 className="text-center">GNIB (IRP) &amp; Re-Entry Visa Appointments</h3><br />
            <div className="text-center">
                <a href="https://m.me/dbei-bot" target="_blank">Get Notified Of Stamp 4 Support Letter Current Processing Dates Via Messenger</a>
            </div><br />
            <Nav />
            <Disqus />
        </div>
    );
}

export default App;