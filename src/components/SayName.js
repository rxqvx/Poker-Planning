import React from 'react';

const SayName = ({nome, sala}) => {
    return (
        <div>
            <p>Olá {nome}, você se encontra na sala {sala}</p>
        </div>
    )
}

export default SayName;
