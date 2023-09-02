import React from "react"
import { classNames } from "../../utils"

export interface ComponentProps {
  children?: React.ReactNode
  index?: number
  length?: number
  className?: string
}

export const Thead: React.FC<ComponentProps> = ({ children }) => (
  <thead className="">{children}</thead>
)


export const Th: React.FC<ComponentProps> = ({ children, index, length, className }) => {
  const baseClass = "px-10 py-3 text-left bg-light"
  const roundedTL = index === 0 ? "rounded-tl-lg" : ""
  const roundedTR = index && index + 1 === length ? "rounded-tr-lg" : ""
  const textRight = index && index + 1 === length ? "text-right" : ""
  return (
    <th className={classNames(baseClass, roundedTL, roundedTR, textRight, className)}>{children}</th>
  )
}

export const Tbody: React.FC<ComponentProps> = ({ children }) => (
  <tbody className="text-sm">{children}</tbody>
)

export const Td: React.FC<ComponentProps> = ({ children, index, className }) => {
  const baseClass = "px-10 py-4 text-left bg-light text-sm"
  const bg = index && index % 2 !== 0 ? "bg-light" : "bg-white"
  return (
    <td className={classNames(baseClass, bg, className)}>{children}</td>
  )
}
