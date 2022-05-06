import { FC, MouseEvent } from 'react';

import styles from '../styles/card.module.css';

interface ICardProps {
    onClick(e: MouseEvent<HTMLButtonElement>): void;
    voteValue: string;
}

const Card: FC<ICardProps> = ({ onClick, voteValue }) => {
    return (
        <button onClick={onClick} value={voteValue} className={styles.buttonCardUser}>
            {voteValue}
        </button>
    )
}

export default Card;