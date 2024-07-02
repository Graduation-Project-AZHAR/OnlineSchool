import { createContext, useState } from "react";

export const stdViewTrack = createContext();


export function StdViewProvider({ children }) {

   
    const [subjectId, setSubjectId] = useState(null)


    return <stdViewTrack.Provider value={{subjectId , setSubjectId}}>
        {children}
    </stdViewTrack.Provider>
}