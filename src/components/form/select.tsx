import { ReactNode, forwardRef, useCallback, useMemo, useState } from "react";
import { classNames } from "../../utils";

export type SelectOption = { value: any, label: string, disabled?: boolean }


export interface SelectProps {
  options?: SelectOption[],
  onChange?: (option: SelectOption) => void
  className?: string
  prependIcon?: ReactNode
  placeholder?: string
  selected?: SelectOption | any
  setSelected?: (s: SelectOption | any | undefined) => void
}

export const Select = forwardRef<any, SelectProps>((
  {
    options = [],
    className = '',
    prependIcon = null,
    placeholder = '',
    selected,
    setSelected,
    onChange,
  }: SelectProps, forwardRef) => {
  const [showOptions, setShowOptions] = useState(false)
  const isSelected = useMemo(() => selected !== undefined, [selected])
  const selectClasses = useMemo(() => {
    const defaultClass = 'w-full'
    return classNames(
      defaultClass,
    )
  }, [])

  const toggling = (event: React.MouseEvent<HTMLDivElement>) => {
    setShowOptions(!showOptions)
    event.stopPropagation()
  }

  const handleSelect = useCallback((option: SelectOption) => {
    if (!options || !option) return
    setSelected && setSelected(option)
    setShowOptions(false)
    onChange && onChange(option)
    // eslint-disable-next-line
  }, [onChange, options])

  return (
    <div className={classNames("relative", className)} ref={forwardRef}>
      <div className={selectClasses} onClick={toggling}>
        {
          prependIcon && (
            <div className="select-prepend">
              <span className="">{prependIcon}</span>
            </div>
          )
        }

        <div className="flex-1 text-base tracking-[0.2px] rounded-lg bg-white py-3 px-6 cursor-pointer min-h-[50px]">
          {
            isSelected ? (
              <span className="text-gray">{selected?.label}</span>
            ) : (
              <span className="text-gray">{placeholder}</span>
            )
          }
        </div>
      </div>
      {
        (showOptions && !!options?.length) && (
          <ul
            tabIndex={-1}
            role="listbox"
            className="max-h-96 p-2 bg-light w-full focus:outline-none overflow-auto absolute shadow-modal rounded-xl top-[60px] left-0 z-50"
            aria-orientation="vertical"
          >
            {
              options?.map((option, index) => (
                <li
                  key={`select-option-${index}`}
                  role="option"
                  className="p-4 rounded-lg cursor-pointer select-none hover:bg-white focus:bg-white outline outline-0 transition-all"
                  tabIndex={1}
                  aria-selected={false}
                  data-selected={false}
                  onClick={() => handleSelect(option)}
                >{option.label}
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  )
})