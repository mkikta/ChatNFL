import { createContext, useState } from "react";

type ResponseContext = {
  response: string[],
  setResponse: React.Dispatch<React.SetStateAction<string[]>>
}

const ResponseContext = createContext<ResponseContext|null>(null);

interface ResponseContextProviderProps {
  children?: React.ReactNode
}

const ResponseContextProvider = ({children} : ResponseContextProviderProps) => {
  const [response, setResponse] = useState<string[]>([]);
  
  return (
    <ResponseContext.Provider value={{
      response: response,
      setResponse: setResponse
    }}>
      {children}
    </ResponseContext.Provider>
  )
}

export {ResponseContext, ResponseContextProvider};