import { createContext, useState } from "react";


type usertype = {
  fullName: string
}

type AppContextType = {
  user: usertype | null;
  setUser: (user: usertype | null) => void;
};

export const AppContext = createContext<AppContextType>({
    user: null, 
    setUser: () => {}
});




export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<usertype | null>(null);

    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    );
}