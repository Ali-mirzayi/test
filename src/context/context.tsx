'use client';
import { createContext, useState } from 'react';


export default function Context({ children }:any) {
    const userContext = createContext({});
    const [data, setData] = useState({ });
    const [status, setStatus] = useState({ loading: false, isOK: undefined, isEmpty: false });

    return <userContext.Provider value={{ data, setData,status, setStatus}}>
            {children}
    </userContext.Provider>
}