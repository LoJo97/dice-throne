import {createContext} from 'react';
import Barbarian from './../Characters/Barbarian';
import MoonElf from './../Characters/MoonElf';

const playersObj = {
    players: [new Barbarian(50, 2), new MoonElf(50, 2)],
    setPlayers: (newPlayers) => {}
}

export const PlayersContext = createContext(playersObj);