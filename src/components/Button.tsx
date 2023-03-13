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
        "max-sm focus-focus-visible:ring-bronze flex items-center justify-center gap-2 rounded border-2 py-2 pl-3 pr-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-4 focus-visible:ring-offset-comet-800 enabled:hover:text-comet-900",
        {
          "border-green-400 text-green-300 enabled:hover:bg-green-400":
            !disabled && color === "green",
          "border-comet-100 text-comet-50 enabled:hover:bg-comet-100":
            !disabled && color === "grey",
          "cursor-not-allowed border-comet-600 text-comet-600": disabled,
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
        <Spinner className="h-5 w-5 fill-current" />
      ) : Icon ? (
        <Icon className="h-5 w-5 fill-current" />
      ) : null}
    </button>
  )
}
