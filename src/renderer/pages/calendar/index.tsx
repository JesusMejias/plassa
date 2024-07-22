import './index.styles.scss';
import { useState } from 'react';
import FrontPage from './frontpage';

export default function Calendar(props: any) {
    const store = props.store;
    const [preferences, setPreferences] = useState(store.get('preferences'));
    const [events, setEvents] = useState(store.get('events') || []);
    function updatePreferences(newPreferences: any) {
        console.log(newPreferences);
        setPreferences(newPreferences);
        store.set('preferences', newPreferences);
    }
    function updateEvents(action: string, event: any) {
        let newEvents;
        switch (action) {
            case 'add':
                newEvents = [...events, event];
                break;
            case 'delete':
                newEvents = events.filter((e: any) => e.id !== event.id);
                break;
            case 'update':
                newEvents = events.map((e: any) => {
                    if (e.id === event.id) {
                        return event;
                    }
                    return e;
                });
                break;
            default:
                newEvents = events;
        }
        console.log(newEvents);
        setEvents(newEvents);
        store.set('events', newEvents);
    }
    return (
        <div className='container-calendar'>
            <div className="inside">
                <FrontPage preferences={preferences} updatePreferences={updatePreferences} events={events} updateEvents={updateEvents} />
            </div>
        </div>
    );
}