import { FC, MouseEvent } from 'react';

import styles from './cardFibonacci.module.css'

interface ICardProps {
    // onClick(e: MouseEvent<HTMLButtonElement>): void;
    voteValue: string;
}

const Card: FC<ICardProps> = ({voteValue }) => {
    return (
        <button value={voteValue} className={styles.buttonCardUser}>
            {voteValue}
        </button>
        /* <button onClick={onClick} value={voteValue} className={styles.buttonCardUser}>
            {voteValue}
        </button> */ 
    )
}

export default Card;