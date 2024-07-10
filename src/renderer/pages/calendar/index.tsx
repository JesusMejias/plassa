import './index.styles.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import FrontPage from './frontpage';

export default function Calendar(props: any) {
    const store = props.store;
    const [preferences, setPreferences] = useState(store.get('preferences'));
    return (
        <div className='container-calendar'>
            <div className="inside">
                <FrontPage preferences={preferences} />
            </div>
        </div>
    );
}