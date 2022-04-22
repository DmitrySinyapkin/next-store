import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { LS_CART } from "../constants/localStorage";

const CountContext = createContext()

export const AppWrapper = ({ children }: {children: ReactNode}) => {
    const [count, setCount] = useState<Number>(0)

    useEffect(() => {
        setCount(localStorage.getItem(LS_CART) ? JSON.parse(localStorage.getItem(LS_CART)!).length : 0)
    }, [])

    const countValue = useMemo(() => {
        return [count, setCount]
    }, [count, setCount])

    return (
        <CountContext.Provider value={countValue}>
            {children}
        </CountContext.Provider>
    )
}

export const useCountContext = () => {
    return useContext(CountContext)
}
