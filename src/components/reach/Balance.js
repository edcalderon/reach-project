import React, { useContext } from "react";
import { Context } from "../../Context";

const Balance = () => {
    const [account, , balance] = useContext(Context);
    return (
        Object.keys(account).length !== 0
            ? (<span className=" ml-3 p-2" style={{
                bottom: "2em",
                right: "2em",
                backgroundColor: "#000",
                borderRadius: "15px",
                boxShadow: "2px 2px #ddd",
                color: 'white'
            }}>
                <strong>{balance} ALGO</strong>
            </span>)
            : <div />
    );
}

export default Balance;
