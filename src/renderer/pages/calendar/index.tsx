import './index.styles.scss';
import { format } from 'date-fns';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import FrontPage from './front-page';
import Settings from './settings';

export default function Calendar(props: any) {
    const store = props.store;
    const [preferences, setPreferences] = useState(store.get('preferences'));
    const date = new Date();
    const [currentPage, setCurrentPage] = useState('front-page');
    let tempDate;
    if (preferences.format === 'US') {
        tempDate = format(date, 'EEEE, MMMM do');
    } else {
        tempDate = `${format(date, 'EEEE')}, ${format(date, 'd')} ${format(date, 'MMMM')}`;
    }
    return (
        <div className='container-calendar'>
            <div className="inside">
                {currentPage === 'front-page' ? <FrontPage tempDate={tempDate} setCurrentPage={setCurrentPage} /> : null}
                {currentPage === 'settings' ? <Settings preferences={preferences} store={store} setPreferences={setPreferences} setCurrentPage={setCurrentPage} /> : null}
            </div>
        </div>
    );
}