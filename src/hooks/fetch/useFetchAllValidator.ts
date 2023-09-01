import { useEffect, useState } from "react"
import { QueryService } from "../../thegraph"
import { useRefresh } from "../useRefresh"
import { DataProcessor } from "./dataProccesser"
import { Validator } from "../../types"

export const useFetchAllValidator = () => {
  const [validators, setValidators] = useState<Validator[]>([])
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    (async () => {
      const { data } = await QueryService.queryValidators()
      if (data && data.validators.length > 0) {
        setValidators(data.validators.map((v: any) => {
          return DataProcessor.validator(v)
        }))
      }
    })()
  }, [slowRefresh])
  return {
    validators
  }
}