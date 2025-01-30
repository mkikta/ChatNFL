import { QuerySchema } from "@shared/QuerySchema";
import { createContext, useMemo, useState } from "react";

type SetStateCallback<T> = React.Dispatch<React.SetStateAction<T>>

interface QueryContext {
  data: QuerySchema,
  setOffenseTeam: SetStateCallback<string>,
  setDefenseTeam: SetStateCallback<string>,
  setOffensePlayers: SetStateCallback<string[]>,
  setDefensePlayers: SetStateCallback<string[]>,
  setPlayType: SetStateCallback<string>,
  setPassingPlayer: SetStateCallback<string>,
  setReceivingPlayer: SetStateCallback<string>,
  setPassLength: SetStateCallback<string>,
  setPassLocation: SetStateCallback<string>,
  setRushingPlayer: SetStateCallback<string>,
  setRunLocation: SetStateCallback<string>,
  setRunGap: SetStateCallback<string>,
}

const QueryContext = createContext<QueryContext|null>(null);

interface QueryContextProviderProps {
  children?: React.ReactNode
}

const QueryContextProvider = ({children} : QueryContextProviderProps) => {
  const [offenseTeam, setOffenseTeam] = useState<string>("");
  const [defenseTeam, setDefenseTeam] = useState<string>("");
  const [offensePlayers, setOffensePlayers] = useState<string[]>([]);
  const [defensePlayers, setDefensePlayers] = useState<string[]>([]);
  const [playType, setPlayType] = useState<string>("");
  const [passingPlayer, setPassingPlayer] = useState<string>("");
  const [receivingPlayer, setReceivingPlayer] = useState<string>("");
  const [passLength, setPassLength] = useState<string>("");
  const [passLocation, setPassLocation] = useState<string>("");
  const [rushingPlayer, setRushingPlayer] = useState<string>("");
  const [runLocation, setRunLocation] = useState<string>("");
  const [runGap, setRunGap] = useState<string>("");
  const data = useMemo<QuerySchema>(() => ({
    offenseTeam, defenseTeam, offensePlayers, defensePlayers, playType,
    passData: (playType == "pass") ? {
      passingPlayer, receivingPlayer, passLength, passLocation
    } : undefined,
    runData: (playType == "run") ? {
      rushingPlayer, runLocation, runGap
    } : undefined,
  }), [offenseTeam, defenseTeam, offensePlayers, defensePlayers, playType, passingPlayer, receivingPlayer, passLength, passLocation, rushingPlayer, runLocation, runGap])
  
  return (
    <QueryContext.Provider value={{
      data,
      setOffenseTeam,
      setDefenseTeam,
      setOffensePlayers,
      setDefensePlayers,
      setPlayType,
      setPassingPlayer,
      setReceivingPlayer,
      setPassLength,
      setPassLocation,
      setRushingPlayer,
      setRunLocation,
      setRunGap,
    }}>
      {children}
    </QueryContext.Provider>
  )
}

export {QueryContext, QueryContextProvider};