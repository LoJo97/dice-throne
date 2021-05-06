const EventContainer = (props) => {
    const event = props.game.currentEvent;
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