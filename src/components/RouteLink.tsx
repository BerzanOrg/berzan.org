import Link from "next/link"

interface RouteLink {
    name: string
    href: string
}

export default function RouteLink({ name, href }: RouteLink) {
    return (
        <li className="flex flex-col">
            <Link href={href} className="flex items-center justify-center h-12 px-4 text-lg font-semibold text-white rounded-full bg-neutral-950 hover:bg-neutral-700">
                {name}
            </Link>
        </li>
    )
}
