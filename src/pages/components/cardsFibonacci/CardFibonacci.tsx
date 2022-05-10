import React, { FC, MouseEvent } from 'react';

import styles from './cardFibonacci.module.css'

interface ICardProps {
    onClick(e: MouseEvent<HTMLButtonElement>): void;
    voteValue: string;
    disable: boolean;
}

const Card: FC<ICardProps> = ({onClick,voteValue, disable }) => {
    // const [disable, setDisable] = React.useState(false);
    function blockCard(){
        if(disable===true){
            return styles.blockedButtonCardUser;
        }
        return styles.buttonCardUser;
        
    }

    return (
        <button disabled = {disable} onClick={onClick} value={voteValue} className={blockCard()}>
            {voteValue}
        </button> 
    )
}

export default Card;