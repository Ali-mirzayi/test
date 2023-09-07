'use client';
import { createContext, useState } from 'react';


export default function Context({ children }:any) {
    const userContext = createContext({});
    const [data, setData] = useState();

    return <userContext.Provider value={{}}>
            {children}
    </userContext.Provider>
}