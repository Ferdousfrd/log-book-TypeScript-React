// creating our custom hook

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)){

    // our state initial value would be the data stored in local storage
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        // if there is no notes in the localStorage
        if(jsonValue == null) {
            if(typeof initialValue === 'function'){
                return (initialValue as () => T)()
            }
            else {
                return initialValue
            }
        }
        // if there are saved notes in thee localStorage
        else {
            return JSON.parse(jsonValue)
        }
    })

    // to store task data in localStorage
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value,key])


    return [value, setValue] as [T, typeof setValue]
}