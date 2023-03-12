import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react"
import { IconType } from "react-icons"

import clsxm from "@/lib/clsxm"

import { Spinner } from "@/components/Spinner"

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color: "green" | "grey" | "orange"
  icon?: IconType
  isLoading?: boolean
  loadingText?: string
}

export const Button: FC<ButtonProps> = ({
  color,
  children,
  className,
  icon: Icon,
  disabled,
  isLoading,
  loadingText,
  ...buttonProps
}) => {
  return (
    <button
      className={clsxm(
        "text-sm focus:outline-none justify-center focus-visible:ring-1 focus-visible:ring-bronze max-sm:w-full max-sm max-sm:justify-center transition-colors font-medium pl-3 pr-2.5 py-2 border enabled:hover:text-grey-600 rounded flex items-center gap-2",
        {
          "border-green-400/50 text-green-400 enabled:hover:bg-green-400":
            !disabled && color === "green",
          "border-orange/50 text-orange enabled:hover:bg-orange":
            !disabled && color === "orange",
          "border-grey-200 text-grey-100 enabled:hover:bg-grey-100":
            !disabled && color === "grey",
          "border-grey-300 text-grey-300 cursor-not-allowed": disabled,
          "cursor-wait border-0": isLoading,
        },
        className
      )}
      disabled={disabled || isLoading}
      type="button"
      {...buttonProps}
    >
      {isLoading && loadingText ? loadingText : children}
      {isLoading ? (
        <Spinner className="fill-current h-4 w-4" />
      ) : Icon ? (
        <Icon className="fill-current h-4 w-4" />
      ) : null}
    </button>
  )
}
