import { createContext, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState, Dispatch } from "react";
import { LS_CART } from "../constants/localStorage";

type CountContextType = (number | Dispatch<SetStateAction<number>>)[]

const CountContext = createContext<CountContextType | undefined>(undefined)

export const AppWrapper = ({ children }: {children: ReactNode}) => {
    const [count, setCount] = useState<number>(0)

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
