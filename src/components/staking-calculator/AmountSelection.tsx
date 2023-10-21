import { classNames } from "../../utils";

export enum SuggestionOptions {
  NONE = 0,
  TWENTY_FIVE = 1,
  FIFTY = 2,
  SEVENTY_FIVE = 3,
  MAX = 4
}

interface AmountSelectionProps {
  handleOnclickSuggest: (option: SuggestionOptions) => void;
  suggestOp: SuggestionOptions
}
const classBase = "w-full rounded-[4px] h-[16px] cursor-pointer"
const activeClass = "bg-primary"
const deactiveClass = "bg-neutral-surface-hover"

export const AmountSelection = ({
  handleOnclickSuggest,
  suggestOp
}: AmountSelectionProps) => {

  return (
    <div className="grid grid-cols-4 gap-1 mt-2 text-center">
      <div>
        <button
          className={classNames(classBase, suggestOp >= SuggestionOptions.TWENTY_FIVE ? activeClass : deactiveClass)}
          onClick={() => handleOnclickSuggest(SuggestionOptions.TWENTY_FIVE)}></button>
        <div className="text-[10px] text-neutral-surface-disabled">25%</div>
      </div>
      <div>
        <button
          className={classNames(classBase, suggestOp >= SuggestionOptions.FIFTY ? activeClass : deactiveClass)}
          onClick={() => handleOnclickSuggest(SuggestionOptions.FIFTY)}></button>
        <div className="text-[10px] text-neutral-surface-disabled">50%</div>
      </div>
      <div>
        <button
          className={classNames(classBase, suggestOp >= SuggestionOptions.SEVENTY_FIVE ? activeClass : deactiveClass)}
          onClick={() => handleOnclickSuggest(SuggestionOptions.SEVENTY_FIVE)}></button>
        <div className="text-[10px] text-neutral-surface-disabled">75%</div>
      </div>
      <div>
        <button
          className={classNames(classBase, suggestOp >= SuggestionOptions.MAX ? activeClass : deactiveClass)}
          onClick={() => handleOnclickSuggest(SuggestionOptions.MAX)}></button>
        <div className="text-[10px] text-neutral-surface-disabled">100%</div>

      </div>
    </div>
  )
}