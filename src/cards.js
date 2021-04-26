export const target = {
    ANY: 'any',
    OPPONENT: 'opponent',
    TEAMMATE: 'teammate',
    SELF: 'self'
}

export const type = {
    INSTANT: 'instant',
    MAIN: 'main',
    ROLL: 'roll',
    UPGRADE: 'upgrade'
}

const cards = [
    {
        id: 1,
        name: 'Transference!',
        cost: 2,
        description: 'Transfer 1 status effect token from a chosen player to another chosen player.',
        type: type.MAIN,
        target: target.ANY,
        attributes: [
            'transfer',
            '1',
            'status',
        ]
    },
    {
        id: 2,
        name: 'What Status Effects?',
        cost: 2,
        description: 'Remove all status effect tokens from a chosen player.',
        type: type.MAIN,
        target: target.ANY,
        attributes: [
            'remove',
            'all',
            'status'
        ]
    },
    {
        id: 3,
        name: 'Vegas Baby!',
        cost: 0,
        description: 'Roll 1 die: Gain 1/2 the value as CP (rounded up).',
        type: type.MAIN,
        target: target.SELF,
        attributes: [
            'roll::1d',
            'gain::0.5::CP'
        ]
    },
    {
        id: 4,
        name: 'Get That Outta Here!',
        cost: 1,
        description: 'Remove a status effect token from a chosen player.',
        type: type.MAIN,
        target: target.ANY,
        attributes: [
            'remove',
            '1',
            'status'
        ]
    },
    {
        id: 5,
        name: 'Triple Up!',
        cost: 2,
        description: 'Draw 3 cards.',
        type: type.INSTANT,
        target: target.SELF,
        attributes: [
            'draw',
            '3'
        ]
    },
    {
        id: 6,
        name: 'Double Up!',
        cost: 1,
        description: 'Draw 2 cards.',
        type: type.INSTANT,
        target: target.SELF,
        attributes: [
            'draw',
            '2'
        ]
    },
    {
        id: 7,
        name: 'Bye, Bye!',
        cost: 2,
        description: 'Remove a status effect token from a chosen player.',
        type: type.INSTANT,
        target: target.ANY,
        attributes: [
            'remove',
            '1',
            'status'
        ]
    },
    {
        id: 8,
        name: 'Tip It!',
        cost: 1,
        description: 'Increase or decrease any die by the value of 1 (a value of 1 cannot be decreased and a value of 6 cannot be increased).',
        type: type.INSTANT,
        target: target.ANY,
        attributes: [
            'die',
            '+/-'
        ]
    },
    {
        id: 9,
        name: 'Getting Paid!',
        cost: 0,
        description: 'Gain 2CP.',
        type: type.INSTANT,
        target: target.SELF,
        attributes: [
            'gain::2::CP'
        ]
    },
    {
        id: 10,
        name: 'Not This Time!',
        cost: 1,
        description: 'A chosen player prevents 6 incoming dmg.',
        type: type.ROLL,
        target: target.ANY,
        attributes: [
            'prevent',
            '6'
        ]
    },
    {
        id: 11,
        name: 'Twice as Wild!',
        cost: 3,
        description: 'Change the values of any two dice.',
        type: type.ROLL,
        target: target.ANY,
        attributes: [
            'change',
            '2'
        ]
    },
    {
        id: 12,
        name: 'Try, Try Again!',
        cost: 1,
        description: 'You or a chosen teammate may re-roll up to two dice (can be the same die twice in a row or two different dice).',
        type: type.ROLL,
        target: target.TEAMMATE,
        attributes: [
            'reroll',
            '2'
        ]
    },
    {
        id: 13,
        name: 'So Wild!',
        cost: 2,
        description: 'Change the value of any one die.',
        type: type.ROLL,
        target: target.ANY,
        attributes: [
            'change',
            '1'
        ]
    },
    {
        id: 14,
        name: 'Samesies!',
        cost: 1,
        description: 'Change the value of one of your dice to be identical to the value of another one of your dice (that was rolled within the same phase and for the same purpose).',
        type: type.ROLL,
        target: target.SELF,
        attributes: [
            'change',
            '1',
            'same'
        ]
    },
    {
        id: 15,
        name: 'One More Time!',
        cost: 1,
        description: 'A chosen player may perform an additional Roll Attempt of up to five dice during their Offensive Roll Phase.',
        type: type.ROLL,
        target: target.ANY,
        attributes: [
            'reroll',
            'phase',
            'offense'
        ]
    },
    {
        id: 16,
        name: 'Helping Hand!',
        cost: 1,
        description: 'Select one of your opponent\'s dice and force them to re-roll it.',
        type: type.ROLL,
        target: target.OPPONENT,
        attributes: [
            'reroll',
            '1'
        ]
    },
    {
        id: 17,
        name: 'Better D!',
        cost: 0,
        description: 'A chosen player may perform an additional Roll Attempt of up to five dice during their Defensive Roll Phase.',
        type: type.ROLL,
        target: target.ANY,
        attributes: [
            'reroll',
            'phase',
            'defense'
        ]
    },
    {
        id: 18,
        name: 'Six-It!',
        cost: 1,
        description: 'Change the value of one of your dice to a 6.',
        type: type.ROLL,
        target: target.SELF,
        attributes: [
            'change',
            '1',
            'six'
        ]
    }
]

export default cards;