import Link from "next/link"

interface FooterLink {
    name: string
    content: string
    href: string
}

export default function FooterLink({ name, content, href }: FooterLink) {
    return (
        <p>
            <span className="font-bold">{name}</span>: <Link className="underline hover:text-neutral-400" href={href}>{content}</Link>
        </p>
    )
}