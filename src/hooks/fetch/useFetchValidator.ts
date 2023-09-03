import { useEffect, useState } from "react"
import { Validator } from "../../types"
import { useRefresh } from "../useRefresh"
import { QueryService } from "../../thegraph"
import { DataProcessor } from "./dataProccesser"

export const useFetchValidator = (valId: number) => {
  const [validator, setValidator] = useState<Validator>({} as Validator)
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (!valId) return
    (async () => {
      const { data } = await QueryService.queryValidatorDetail(valId)
      if (data && data.validators.length > 0) {
        setValidator(DataProcessor.validator(data.validators[0]))
      }
    })()
  }, [fastRefresh, valId])
  return {
    validator
  }
}