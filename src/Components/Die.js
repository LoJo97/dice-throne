import _ from 'lodash';
import { useContext } from 'react';
import { PlayersContext } from './../Contexts/PlayersContext';
import { PlayerIndexContext } from '../Contexts/PlayerIndexContext';
import { Lock, LockOpen } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import styles from './../styles';

const useStyles = makeStyles(styles);

const Die = (props) => {
    const classes = useStyles();

    const {players, setPlayers} = useContext(PlayersContext);
    const playerIndex = useContext(PlayerIndexContext)

    const src = `/Media/${players[playerIndex].constructor.name}/die${props.die.result.value}.png`;

    const toggleLock = () => {
        props.die.locked = !props.die.locked;
        setPlayers([...players]);
    }

    return (
        <div style={{display: 'inline', padding: '2px'}} onClick={toggleLock}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <img src={src} alt={`${props.die.result.value}, ${props.die.result.type}`} className={classes.die}/>
                {props.die.locked ? <Lock/> : <LockOpen/>}
            </div>
        </div>
    );
}

export default Die;
