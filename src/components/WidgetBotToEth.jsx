import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAccount, useBalance, useSwitchChain, useWriteContract } from "wagmi";
import abi from '../contracts/BridgeABI.json';
import { parseEther } from "viem";


export default function WidgetBotToEth() {

    const history = useHistory();
    const { address } = useAccount();
    const { writeContract } = useWriteContract();
    const { chains, switchChain } = useSwitchChain()
    const [amount, setAmount] = useState('');
    const [parseValue, setParseValue] = useState('');

    const Balance = useBalance({
        address: address
    })

    const parseAmount = parseEther(amount);

    useEffect(() => {
        const parsedAmount = parseFloat(amount);
        if (!isNaN(parsedAmount) && parsedAmount !== 0) {
            const intVal = parsedAmount + 0.00001;
            const formattedIntVal = intVal.toFixed(5);
            const parseVal = parseEther(formattedIntVal);
            setParseValue(parseVal);
        }
    }, [amount]);


    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            writeContract({
                abi,
                address: '0x5aFb5C6a80E0Cbd9FC84d04D0cECd7B28d1C6e6E',
                functionName: 'bridgeToken',
                args: [address, parseAmount],
                value: parseValue
            })
        } catch (error) {
            console.error("Error: " + error)
        }
    }

    const inputBalance = Balance.data?.value.toString() / (10 ** Balance.data?.decimals)
    const finalBalance = inputBalance.toString().slice(0, 5)

    const handleSwitch = () => {
        history.push('/')
        switchChain({chainId: chains[0].id})
    }

    const handleAmountChange = (e) => {
        setAmount(e.target.value)
    }

    return (
        <div className="bg-black text-white font-mono">
            <div className="max-w-lg mx-auto ">
                <div className="border border-zinc-700 p-4 rounded-lg">
                    <div className="flex justify-between text-sm mb-4">
                        <button onClick={handleSwitch} className="bg-transparent py-1 px-3 rounded hover:bg-zinc-800">DEPOSIT</button>
                        <button className="bg-zinc-800 py-1 px-3 rounded ">WITHDRAW</button>
                        <button className="bg-transparent py-1 px-3 rounded hover:bg-zinc-800">HISTORY</button>
                    </div>

                    <div className="mb-4">
                        <label className="block text-zinc-400 mb-1">FROM</label>
                        <div className="flex items-center justify-between bg-zinc-800 p-2 rounded">
                            <span className="flex items-center">
                                <img src="https://a-us.storyblok.com/f/1014909/512x512/026e26392f/dark_512-1.png" width='30px' alt="Botanix" className="mr-2" />
                                Botanix Testnet
                            </span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center justify-between bg-zinc-800 p-2 rounded">
                            <input onChange={handleAmountChange} type="text" placeholder="0.0" className="bg-transparent text-2xl w-full" />
                            <span className="flex items-center pr-2">
                                <img src="https://blast.io/icons/eth-color.svg" width='20px' alt="ETH" className="mx-2" />
                                ETH
                            </span>
                        </div>
                        <div className="flex items-center text-sm mt-1">
                            <span>
                                Balance: {inputBalance ? (
                                    (finalBalance)
                                ) : '0.00'}
                            </span>
                            <button className="text-yellow-300 pl-2 cursor-pointer">MAX</button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-zinc-400 mb-1">TO</label>
                        <div className="flex items-center justify-between bg-zinc-800 p-2 rounded">
                            <span className="flex items-center">
                                <img src="https://blast.io/icons/eth-color.svg" width='30px' alt="Ethereum" className="mr-2" />
                                Ethereum Mainnet
                            </span>
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="w-full bg-yellow-300 text-black my-3 py-2 rounded">SUBMIT</button>
                </div>
            </div>
        </div>
    )
}