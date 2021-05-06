import _ from "lodash";

const Status = (props) => {
    const game = props.game;
    const status = props.status;

    const resolveStatus = () => {
        status.resolve && game.currentEvent.reconcile(status.resolve(game.currentEvent, game));
        props.updateGame(game);
    }

    return(
        <button onClick={resolveStatus}>
            {status.constructor.name}
        </button>
    );
}

export default Status;