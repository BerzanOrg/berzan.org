import { DetailedHTMLProps, InputHTMLAttributes } from "react"

type Props = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'className'>

export default function Input({ ...props }: Props) {
    return (
        <input
            {...props}
            className="h-12 text-lg font-medium border-2 rounded-full outline-none px-7 placeholder:text-neutral-950/30 bg-white/50 border-neutral-950"
        />
    )
}