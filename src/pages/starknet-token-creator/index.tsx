import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { useState } from "react";


function toBigint(str: string): bigint {
    let result = '0x'
    for (let i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16)
    }

    const num = BigInt(result)
    return num
}

function u256ToTwoU128(u256: bigint): [bigint, bigint] {
    const MAX_U128 = BigInt('340282366920938463463374607431768211456')
    const secondByte = u256 / MAX_U128
    const firstByte = u256 - MAX_U128 * secondByte
    return [firstByte, secondByte]
}


const useStarknet = () => {
    const [address, setAddress] = useState<string>()

    return {
        address,
        connect: async () => {
            if (!(window as any).starknet) {
                alert('No Wallet Is Found!')
                return
            }
            const addresses = await (window as any).starknet.enable()

            if (typeof addresses.at(0) !== 'string') return

            setAddress(addresses.at(0))
        },
        deployTokenContract: async ({ name, symbol, supply }: { name: string, symbol: string, supply: bigint }) => {
            if (!address) {
                alert('Wallet Is Not Connected!')
                return
            }
            try {
                const account = (window as any).starknet.account

                const [firstByteOfSupply, secondByteOfSupply] = u256ToTwoU128(supply * BigInt('1000000000000000000'))

                const calldata: string[] = [
                    toBigint(name).toString(),
                    toBigint(symbol).toString(),
                    firstByteOfSupply.toString(),
                    secondByteOfSupply.toString(),
                    BigInt(address).toString()
                ];
                console.log(calldata)

                await account.deployContract({
                    classHash: '0x06630fb37348de1310b11632fcb54b1762a47a2bcf010b14b6e483a00e951303',
                    constructorCalldata: calldata,
                })
            } catch (error) {
                if (error.message === 'User abort') return
                console.error(error)
                alert('Open Console To See The Error!')
            }
        }
    }
}

export default function Home() {

    const { address, connect, deployTokenContract } = useStarknet()

    return (
        <div className="flex flex-col flex-1 gap-6">
            <header className="flex items-center justify-end w-full h-24 max-w-6xl gap-6 pr-6">

            </header>
            <main className="flex flex-col items-center flex-1 w-full gap-6 px-4">
                <h1 className="text-4xl font-bold leading-[1.125] text-center">Berzan's <br />Starknet Token Creator Tool</h1>
                <form className="flex flex-col w-full max-w-sm gap-4" onSubmit={async (e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)

                    const name = formData.get('NAME')!.toString()
                    const symbol = formData.get('SYMBOL')!.toString()
                    const supply = BigInt(formData.get('SUPPLY')!.toString())

                    const regex = /[\p{ASCII}]+/u
                    if (!regex.test(name) || !regex.test(symbol)) {
                        alert('Only English Characters Are Supported!')
                        return
                    }

                    if (name.length > 31 || symbol.length > 31) {
                        alert('Use Less Than 31 Characters!')
                        return
                    }

                    e.currentTarget.reset()

                    await deployTokenContract({
                        name,
                        symbol,
                        supply,
                    })
                }}>
                    <Input
                        name="NAME"
                        placeholder="Token Name (Bitcoin)"
                        required
                        type="text"
                        maxLength={31}
                    />
                    <Input
                        name="SYMBOL"
                        placeholder="Token Symbol (BTC)"
                        required
                        type="text"
                    />

                    <Input
                        name="SUPPLY"
                        placeholder="Token Supply (21000000)"
                        required
                        type="number"
                        onKeyDown={e => {
                            if (
                                e.key !== 'Backspace'
                                &&
                                (BigInt(e.currentTarget.value) > BigInt('1000000000000000000'))
                                ||
                                e.key === '.'
                                ||
                                e.key === ','
                            ) e.preventDefault()
                        }}
                    />
                    {address ? (
                        <Button type="submit">Create Your Token</Button>
                    ) : (
                        <Button type="button" onClick={connect}>Connect Wallet</Button>
                    )}
                </form>
                <div className="flex flex-col text-center  text-sm font-medium text-neutral-600 gap-0.5 select-none">
                    <p>
                        1 - Visit Starkscan after you create your token.
                    </p>
                    <p>
                        2 -  Find the deployed contract address.
                    </p>
                    <p>
                        3 - Add the token in your wallet.
                    </p>
                </div>
            </main>
            <footer className="flex flex-col gap-4 py-8 text-center">
                <div className="flex flex-col text-sm text-neutral-600 gap-0.5 font-medium">
                    <p className="select-none">You can donate me some of your tokens if you want :)</p>
                    <p className="text-[0.575rem]">0x01f351ad804a7a600c4a96974c37c5a59c5febae383af6a96336c7634c73fdaf</p>

                </div>
                <p className="text-sm font-semibold">
                    Source Code:
                    &nbsp;
                    <Link className="font-medium text-yellow-800 underline" href='https://github.com/BerzanOrg/berzan.org/blob/main/others/starknet-token/src/lib.cairo'>https://github.com</Link>
                </p>
            </footer>
        </div>
    )
}

