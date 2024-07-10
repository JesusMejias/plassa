import './index.styles.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import FrontPage from './frontpage';
import Settings from './settings';

export default function Calendar(props: any) {
    const store = props.store;
    const [preferences, setPreferences] = useState(store.get('preferences'));
    const [currentPage, setCurrentPage] = useState('frontpage');
    return (
        <div className='container-calendar'>
            <div className="inside">
                {currentPage === 'frontpage' ? <FrontPage preferences={preferences} setCurrentPage={setCurrentPage} /> : null}
                {currentPage === 'settings' ? <Settings preferences={preferences} store={store} setPreferences={setPreferences} setCurrentPage={setCurrentPage} /> : null}
            </div>
        </div>
    );
}