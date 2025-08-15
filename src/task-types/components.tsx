import {Duration} from "luxon";

export const formatFrequency = (frequency: string) => {
  const duration = Duration.fromISO(frequency);
  return (duration.isValid ?
      <span>{duration.toHuman({showZeros: false})} </span> :
      <span className="text-sm text-red-500"> No frequency set! </span>
  )
}