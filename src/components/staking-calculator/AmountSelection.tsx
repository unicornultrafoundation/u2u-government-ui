import { classNames } from "../../utils";

export enum SuggestionOptions {
  NONE = 'NONE',
  TWENTY_FIVE = 'TWENTY_FIVE',
  FIFTY = 'FIFTY',
  SEVENTY_FIVE = 'SEVENTY_FIVE',
  MAX = 'MAX'
}

interface AmountSelectionProps {
  handleOnclickSuggest: (option: SuggestionOptions) => void;
  suggestOp: SuggestionOptions
}
const classBase = "text-sm rounded-lg  py-2 cursor-pointer"
const activeClass = "bg-green text-white"
const deactiveClass = "bg-silver text-gray"

export const AmountSelection = ({
  handleOnclickSuggest,
  suggestOp
}: AmountSelectionProps) => {

  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      <button
        className={classNames(classBase, suggestOp === SuggestionOptions.TWENTY_FIVE ? activeClass : deactiveClass)}
        onClick={() => handleOnclickSuggest(SuggestionOptions.TWENTY_FIVE)}>25%</button>
      <button
        className={classNames(classBase, suggestOp === SuggestionOptions.FIFTY ? activeClass : deactiveClass)}
        onClick={() => handleOnclickSuggest(SuggestionOptions.FIFTY)}>50%</button>
      <button
        className={classNames(classBase, suggestOp === SuggestionOptions.SEVENTY_FIVE ? activeClass : deactiveClass)}
        onClick={() => handleOnclickSuggest(SuggestionOptions.SEVENTY_FIVE)}>75%</button>
      <button
        className={classNames(classBase, suggestOp === SuggestionOptions.MAX ? activeClass : deactiveClass)}
        onClick={() => handleOnclickSuggest(SuggestionOptions.MAX)}>100%</button>
    </div>
  )
}