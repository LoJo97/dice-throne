import {createContext} from 'react';
import Event from './../Event';

const events = {
    events: [new Event()],
    setEvents: (events) => {}
}

export const EventContext = createContext(events);