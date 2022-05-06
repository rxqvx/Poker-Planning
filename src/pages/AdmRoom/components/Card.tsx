// import styles from './card.module.css';

// //são as cartas de fibonacci
// export default function card(props){
    
//     return(
//         <>
//         {/* esse props.onClick vai pegar a funcao do onclick que ta presente no appadm(que agora é o index), que pegara o votevalue */}
//             <button onClick={props.onClick} value={props.voteValue} className={styles.buttonCard}>
//                  {/* essa div que ta lascando o userRoom fibonaccicard */}
//                 <button onClick={props.onClick} value={props.voteValue} className={styles.buttonCardcircle} >
//                     {props.voteValue}
//                 </button>
               
                
//             </button>
//         </>
//     )
// }
import { FC, MouseEvent } from 'react';

import styles from './card.module.css';

interface ICardProps {
    onClick(e: MouseEvent<HTMLButtonElement>): void;
 
    voteValue: string;
    
}

const Card: FC<ICardProps> = ({ onClick, voteValue }) => {
    return (
        <>
        <button onClick={onClick} value={voteValue} className={styles.buttonCard}>
            {/* <button onClick={onClick} value={voteValue} className={styles.buttonCardcircle} >
                {voteValue}
            </button> */}
            
            {/* <div className={styles.buttonCardcircle} > */}
                {voteValue}
            {/* </div> */}
        </button>
        
        </>
        
    )
}

export default Card;