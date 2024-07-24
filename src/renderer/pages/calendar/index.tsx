import './index.styles.scss';
import { useState } from 'react';
import { Event } from '../../types';
import FrontPage from './frontpage';

export default function Calendar(props: any) {
    const store = props.store;
    const [preferences, setPreferences] = useState(store.get('preferences'));
    const tempEvents: Event[] = [];
    store.get('events')?.map((event: Event) => {
        tempEvents.push({
            ...event,
            starts: new Date(event.starts),
            ends: new Date(event.ends),
        });
    });
    const [events, setEvents] = useState<Event[]>(tempEvents || []);
    function updatePreferences(newPreferences: any) {
        console.log(newPreferences);
        setPreferences(newPreferences);
        store.set('preferences', newPreferences);
    }
    function updateEvents(action: string, event: Event) {
        let newEvents: Event[];
        switch (action) {
            case 'add':
                newEvents = [...events, event];
                break;
            case 'delete':
                newEvents = events.filter((e: Event) => e.id !== event.id);
                break;
            case 'update':
                newEvents = events.map((e: Event) => {
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