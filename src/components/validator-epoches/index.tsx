import { Tbody, Td, Th, Thead } from "../table"
import { useFetchEpochOfValidator } from "../../hooks";
import { ValidatorEpochInfo } from "../../types";
import { RenderNumberFormat } from "../text";
import { bigFormatEther, dateToUTCString } from "../../utils";
import { ChangePageParams, Pagination } from "../pagination";
import { TableLimit } from "../../contants";
import { useState } from "react";

interface Header {
  name: string;
  subName?: string
}

const headers: Header[] = [
  {
    name: "Epoch"
  },
  {
    name: "Rewards",
    subName: "(U2U)"
  },
  {
    name: "End Time"
  }
]

interface ValidatorEpochsProps {
  validationId: number
}


export const ValidatorEpochs = ({
  validationId
}: ValidatorEpochsProps) => {

  const [skip, setSkip] = useState(0)
  const { epoches, totalCount } = useFetchEpochOfValidator(validationId, skip)

  const onChangePage = async (params: ChangePageParams) => {
    let _skip = params.page ? params.page - 1 : 0
    setSkip(_skip)
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <Thead>
          <tr>
            {
              headers.map((header: Header, index: number) => {
                return (
                  <Th index={index} length={headers.length} key={index}>
                    <div className={`${index === 1 ? "text-right" : ""}`}>
                      <div className={`text-lg font-normal`}>{header.name}</div>
                      {
                        header.subName ? <div className="text-xs text-gray font-light">{header.subName}</div> : <></>
                      }
                    </div>
                  </Th>
                )
              })
            }
          </tr>
        </Thead>
        <Tbody>
          {
            epoches && epoches.length > 0 ? epoches.map((row: ValidatorEpochInfo, index: number) => {
              return (
                <tr key={index}>
                  <Td index={index} className="text-green text-base font-medium">
                    {row.epochId}
                  </Td>
                  <Td index={index} className="text-right text-base font-medium">
                    <RenderNumberFormat amount={bigFormatEther(row.epochRewards)} fractionDigits={2} />
                  </Td>
                  <Td index={index} className="text-right text-base font-medium whitespace-nowrap">
                    {dateToUTCString(row.endTime)}
                  </Td>
                </tr>
              )
            }) : <></>
          }
        </Tbody>
      </table>
      <Pagination
        limit={TableLimit}
        total={totalCount}
        onChangePage={onChangePage}
      />
    </div>
  )
}