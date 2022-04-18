import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

const CountContext = createContext()

export const AppWrapper = ({ children }: {children: ReactNode}) => {
    const [count, setCount] = useState<Number>(0)

    useEffect(() => {
        setCount(localStorage.getItem('mnstore-cart') ? JSON.parse(localStorage.getItem('mnstore-cart')!).length : 0)
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
