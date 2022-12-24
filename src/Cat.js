import React from "react";

export default function Cat(props) {
    return (
        <>
            <div
                key={props.cat.id}
                style={{ backgroundColor: props.cat.color }}
            >
                <h1>{props.cat.name}</h1>
                <p>{props.cat.collar ? "has Collar" : "you can adobt it"}</p>
                <p>{props.cat.age}</p>
                {props.cat.isHungary ? (
                    <button onClick={() => props.handleClick(props.cat.id)}>
                        Feed
                    </button>
                ) : (
                    "Well Fed"
                )}
            </div>
        </>
    );
}
