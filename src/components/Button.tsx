import { ButtonHTMLAttributes, DetailedHTMLProps, } from "react"

type Props = Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'className'>

export default function Button(props: Props) {
    return (
        <button
            {...props}
            className="h-12 text-lg font-semibold text-white rounded-full px-7 bg-neutral-950 hover:bg-neutral-700"
        />
    )
}