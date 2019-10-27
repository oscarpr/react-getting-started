import React from 'react';

export function Square(props) {
    return (
        <button className={props.higthLight ? 'hight-light square' : 'square'}
            onClick={props.onClick}>
            {props.value}
        </button >
    );
}