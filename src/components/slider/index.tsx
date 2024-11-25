import { Slider, SliderProps } from "@material-tailwind/react"
interface SliderComponentProps extends SliderProps {

}

export const SliderComponent = ({
  defaultValue = 0,
  min = 0,
  max = 100,
  value,
  onChange,
  step = 0
}: SliderComponentProps) => {

  return (
    <Slider
      step={step}
      defaultValue={defaultValue}
      min={min}
      className="h-[8px] bg-border-outline rounded-full outline-0"
      barClassName={`
      bg-gradient-2
      `}
      thumbClassName="
        [&::-webkit-slider-thumb]:w-[28px] 
        [&::-webkit-slider-thumb]:h-[28px] 
        [&::-webkit-slider-thumb]:border-neutral
        [&::-webkit-slider-thumb]:bg-neutral 
        [&::-webkit-slider-thumb]:-mt-[10px]
        [&::-webkit-slider-thumb]:ring-0
        [&::-webkit-slider-thumb]:shadow-2
      "
      value={value}
      onChange={onChange}
      placeholder="" 
      onPointerEnterCapture={(e: any) => {}} 
      onPointerLeaveCapture={(e: any) => {}} 
    />
  )
}