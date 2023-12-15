import FooterLink from "@/components/FooterLink";
import RouteLink from "@/components/RouteLink";
import Image from "next/image";


export default function Home() {
    return (
        <div className="flex flex-col items-center min-h-screen gap-12 px-6 pt-16 pb-6 text-neutral-950 bg-gradient-to-tl from-yellow-300/90 to-yellow-200/90">
            <header className="flex flex-col items-center gap-6">
                <Image src='/berzan.jpg' alt="Berzan" width={171} height={171} className="border rounded-full pointer-events-none select-none border-neutral-950" />
                <div className="flex flex-col gap-1.5 text-center">
                    <h1 className="text-6xl font-bold"> I'm Berzan. </h1>
                    <p className="text-lg font-medium "> I love building tools & sharing information.</p>
                </div>
            </header>
            <main className="flex flex-col flex-1 w-full max-w-xl">
                <nav className="flex flex-col">
                    <ul className="flex flex-col gap-5">
                        <RouteLink href="/mina-blog" name="Mina Blog" />
                        <RouteLink href="/solana-blog" name="Solana Blog" />
                    </ul>
                </nav>
            </main>
            <footer className="flex justify-center">
                <div className="flex flex-col gap-2.5">
                    <FooterLink href="mailto:me@berzan.org" name="Email" content="me@berzan.org" />
                    <FooterLink href="https://github.com/BerzanXYZ" name="GitHub" content="BerzanXYZ" />
                    <FooterLink href="https://twitter.com/BerzanXYZ" name="Twitter" content="BerzanXYZ" />
                </div>
            </footer>
        </div>
    )
}

