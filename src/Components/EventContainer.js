import { useContext } from 'react';
import { EventContext } from './../Contexts/EventContext';

const EventContainer = (props) => {
    const {events} = useContext(EventContext);
    const event = events[props.eventIndex];
    const keys = Object.keys(event);
    const values = Object.values(event);

    return(
        <div>
            {keys.map((k, index) => {
                if(!(typeof values[index] === 'function' || typeof values[index] === 'object'))
                return (
                    <div key={index}>
                        <br/>
                        <b>{k}:</b> {values[index]}
                    </div>
                );
            })}
        </div>
    );
}

export default EventContainer;