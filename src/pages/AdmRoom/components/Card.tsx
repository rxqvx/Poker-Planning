import { FC, MouseEvent } from 'react';

import styles from './card.module.css';

interface ICardProps {
    onClick(e: MouseEvent<HTMLButtonElement>): void;

    voteValue: string;

}
//fibonacci cards
const Card: FC<ICardProps> = ({ onClick, voteValue }) => {
    return (
        <>
            <button onClick={onClick} value={voteValue} className={styles.buttonCard}>
                {voteValue}
            </button>

        </>

    )
}

export default Card;