import Button from "@/components/Button";
import Input from "@/components/Input";
import { FormEvent, useEffect, useState } from "react";


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

                console.log('start')
                const { contract_address } = await account.deployContract({
                    classHash: '0x05ff0d8ca63781c053f8653978f83ee0379711f65237d194ae9c0c84631240ad',
                    constructorCalldata: calldata,
                })
                console.log('done')

                return `https://testnet.starkscan.co/token/${contract_address}`
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
        <div className="flex flex-col gap-6 pb-24">
            <header className="flex items-center justify-end w-full h-24 max-w-6xl gap-6 pr-6">

            </header>
            <main className="flex flex-col items-center w-full gap-8">
                <h1 className="text-4xl font-bold leading-tight text-center">Berzan's Starknet Token Creator Tool</h1>
                <form className="flex flex-col w-full max-w-sm gap-6" onSubmit={async (e) => {
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

                    const tokenUrl = await deployTokenContract({
                        name,
                        symbol,
                        supply,
                    })
                    console.log('hey')

                    if (!tokenUrl) return

                    e.currentTarget.reset()

                    console.log(tokenUrl)
                    window.open(tokenUrl, '_blank')
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
            </main>
        </div>
    )
}

