import FooterLink from "@/components/FooterLink";
import RouteLink from "@/components/RouteLink";


export default function Home() {
    return (
        <div className="flex flex-col items-center min-h-screen gap-20 px-6 pt-16 pb-6 text-neutral-950">
            <header className="flex flex-col gap-1.5 text-center">
                <h1 className="text-6xl font-bold"> I'm Berzan. </h1>
                <p className="text-lg italic font-medium "> I love building tools & sharing information.</p>
            </header>
            <main className="flex flex-col flex-1 w-full max-w-xl">
                <nav className="flex flex-col">
                    <ul className="flex flex-col gap-5">
                        <RouteLink href="/mina-blog" name="Mina Blog" />
                        <RouteLink href="/solana-blog" name="Solana Blog" />
                    </ul>
                </nav>
            </main>
            <footer className="w-full max-w-4xl p-6 text-white border bg-neutral-950 rounded-3xl">
                <div className="flex flex-col gap-2.5 text-lg">
                    <FooterLink href="mailto:me@berzan.org" name="Email" content="me@berzan.org"/>
                    <FooterLink href="https://github.com/BerzanXYZ" name="GitHub" content="BerzanXYZ"/>
                    <FooterLink href="https://twitter.com/BerzanXYZ" name="X / Twitter" content="BerzanXYZ"/>
                </div>
            </footer>
        </div>
    )
}

