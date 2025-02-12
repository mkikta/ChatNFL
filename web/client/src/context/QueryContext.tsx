import { ActionLocation, PassLength, PlayType, RunGap } from "@shared/PlayEnums";
import { QuerySchema } from "@shared/QuerySchema";
import { createContext, useMemo, useState } from "react";

type SetStateCallback<T> = React.Dispatch<React.SetStateAction<T>>

interface QueryContext {
  data: QuerySchema,
  setOffenseTeam: SetStateCallback<string>,
  setDefenseTeam: SetStateCallback<string>,
  setOffensePlayers: SetStateCallback<string[]>,
  setDefensePlayers: SetStateCallback<string[]>,
  setPlayType: SetStateCallback<PlayType>,
  setBallLocation: SetStateCallback<number|null>,
  setCurrentDown: SetStateCallback<number|null>,
  setGameSecondsLeft: SetStateCallback<number|null>,
  setDownDistance: SetStateCallback<number|null>,
  setPassingPlayer: SetStateCallback<string>,
  setReceivingPlayer: SetStateCallback<string>,
  setPassLength: SetStateCallback<PassLength>,
  setPassLocation: SetStateCallback<ActionLocation>,
  setRushingPlayer: SetStateCallback<string>,
  setRunLocation: SetStateCallback<ActionLocation>,
  setRunGap: SetStateCallback<RunGap>,
}

const QueryContext = createContext<QueryContext|null>(null);

interface QueryContextProviderProps {
  children?: React.ReactNode
}

const numberOrUndefined = (val : number|null) => {
  return (val == null) ? undefined : val
}

const QueryContextProvider = ({children} : QueryContextProviderProps) => {
  const [offenseTeam, setOffenseTeam] = useState<string>("");
  const [defenseTeam, setDefenseTeam] = useState<string>("");
  const [offensePlayers, setOffensePlayers] = useState<string[]>([]);
  const [defensePlayers, setDefensePlayers] = useState<string[]>([]);
  const [playType, setPlayType] = useState<PlayType>(PlayType.UNDEFINED);
  const [passingPlayer, setPassingPlayer] = useState<string>("");
  const [receivingPlayer, setReceivingPlayer] = useState<string>("");
  const [passLength, setPassLength] = useState<PassLength>(PassLength.UNDEFINED);
  const [passLocation, setPassLocation] = useState<ActionLocation>(ActionLocation.UNDEFINED);
  const [rushingPlayer, setRushingPlayer] = useState<string>("");
  const [runLocation, setRunLocation] = useState<ActionLocation>(ActionLocation.UNDEFINED);
  const [runGap, setRunGap] = useState<RunGap>(RunGap.UNDEFINED);
  const [ballLocation, setBallLocation] = useState<number|null>(null);
  const [currentDown, setCurrentDown] = useState<number|null>(null);
  const [downDistance, setDownDistance] = useState<number|null>(null);
  const [gameSecondsLeft, setGameSecondsLeft] = useState<number|null>(null);

  const data = useMemo<QuerySchema>(() => ({
    offenseTeam, defenseTeam, offensePlayers, defensePlayers, playType,
    passData: (playType === PlayType.PASS) ? {
      passingPlayer, receivingPlayer, passLength, passLocation
    } : undefined,
    runData: (playType === PlayType.RUN) ? {
      rushingPlayer, runLocation, runGap
    } : undefined,
    ballLocation: numberOrUndefined(ballLocation),
    currentDown: numberOrUndefined(currentDown),
    gameSecondsLeft: numberOrUndefined(gameSecondsLeft),
    downDistance: numberOrUndefined(downDistance),
  }), [offenseTeam, defenseTeam, offensePlayers, defensePlayers, playType, passingPlayer, receivingPlayer, passLength, passLocation, rushingPlayer, runLocation, runGap, ballLocation, currentDown,gameSecondsLeft,downDistance])
  
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
      setBallLocation,
      setCurrentDown,
      setDownDistance,
      setGameSecondsLeft,
    }}>
      {children}
    </QueryContext.Provider>
  )
}

export {QueryContext, QueryContextProvider};