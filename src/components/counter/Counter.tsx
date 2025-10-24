"use client";

import { notification } from "@/helpers/utils";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";


interface CounterProps {
    counter: number;
}

export const Counter = ({counter} : CounterProps) => {

    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count > 0) {
            notification(`Counter updated to ${count}`, 'success', 1500);
        } else if (count === 0) {
            notification(`Counter updated to ${count}`, 'warning', 1500);
        } else {
            notification(`Counter updated to ${count}`, 'error', 1500);
        }
        
    }, [count]);

    return (
        <>
        <div className="counter-component">
            <h2>{count}</h2>
        </div>
        <div className="counter-controls">
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(counter)}>Reset</button>
            <ToastContainer />
        </div>
        </>
    )
}