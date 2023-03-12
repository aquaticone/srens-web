import { Dispatch, FC, FormEventHandler, SetStateAction, useState } from "react"
import { z } from "zod"

type DomainLookupFormProps = {
  submittedName: string
  onSubmit: Dispatch<SetStateAction<string>>
}

const nameSchema = z
  .string()
  .endsWith(".eth", { message: "Domains must end with .eth" })
  .min(7, { message: "Domains must be at least 3 characters long" })

export const DomainLookupForm: FC<DomainLookupFormProps> = ({
  submittedName,
  onSubmit: _onSubmit,
}) => {
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState<string>("")

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    const withoutWhitespace = name.replace(/\s/g, "")
    const validation = nameSchema.safeParse(withoutWhitespace)
    setName(withoutWhitespace)

    if (validation.success) {
      setError(null)
      _onSubmit(validation.data)
    } else {
      setError(validation.error.issues[0].message)
    }
  }

  return (
    <form
      className="grid grid-rows-[1fr,auto,auto] grid-cols-[1fr,auto]"
      onSubmit={onSubmit}
    >
      <input
        id="domain"
        className="bg-transparent text-grey-100 focus:outline-none relative z-10 col-start-1 row-start-2 peer text-xl w-full block px-4 rounded py-3 placeholder:text-grey-200"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoCapitalize="false"
        autoComplete="false"
        autoCorrect="false"
        spellCheck="false"
        placeholder="vitalik.eth"
      />
      <button
        className="relative peer z-10 px-4 col-start-2 focus:outline-none enabled:hover:underline focus-visible:ring-1 focus-visible:ring-inset rounded focus-visible:ring-bronze row-start-2 uppercase text-sm text-green-300 disabled:text-grey-200"
        disabled={name === submittedName}
        type="submit"
      >
        Find
      </button>

      <div className="col-span-full peer-focus:ring-1 border-t border-t-grey-300 peer-focus:ring-inset peer-focus:ring-grey-200 row-start-2 bg-black/25 col-start-1" />

      {error && (
        <div className="col-span-full col-start-1 border-t border-t-grey-300 px-4 pt-2 pb-3 text-sm text-red row-start-3 font-medium">
          {error}
        </div>
      )}
    </form>
  )
}
