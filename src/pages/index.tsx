import { IconEmail, IconGithub, IconTwitter } from "@/components/Icons";
import RouteLink from "@/components/RouteLink";
import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col gap-6 pb-24">
            <header className="flex items-center justify-end w-full h-24 max-w-6xl gap-6 pr-6">
                <IconEmail />
                <IconTwitter />
                <IconGithub />
            </header>
            <main className="flex flex-col items-center w-full gap-6">
                <Image src='/myself.jpg' alt="Berzan" width={171} height={171} className="border rounded-full pointer-events-none select-none border-neutral-950" />
                <div className="flex flex-col gap-1.5 text-center px-4">
                    <h1 className="text-6xl font-bold"> I'm Berzan. </h1>
                    <p className="font-bold text-l "> I love building tools & sharing information. </p>
                </div>
                <nav className="flex flex-col w-full max-w-xl px-6">
                    <ul className="flex flex-col gap-5">
                        <RouteLink href="/mina-blog" name="Mina Blog" />
                        <RouteLink href="/solana-blog" name="Solana Blog" />
                        <RouteLink href="/starknet-token-creator" name="Starknet Token Creator" />
                    </ul>
                </nav>
            </main>
        </div>
    )
}

