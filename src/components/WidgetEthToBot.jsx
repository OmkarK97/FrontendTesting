import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { parseEther } from "viem";
import { useAccount, useBalance, useSwitchChain, useWriteContract, useReadContract } from "wagmi";
import abi from '../contracts/BridgeABI.json';


export default function Widget() {

    const history = useHistory();
    const { address } = useAccount();
    const { writeContract } = useWriteContract();
    const { chains, switchChain } = useSwitchChain()
    const [amount, setAmount] = useState('');
    const [parseValue, setParseValue] = useState('');
    const [getGasCost, setGetGasCost] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const Balance = useBalance({
        address: address
    })

    const parseAmount = parseEther(amount);

    const { data, error: readError, isPending: readIsPending } = useReadContract({
        abi,
        address: '0x40D345fA7ED3c8a9f45962ABF238A13e9F39F275',
        functionName: 'getGasCost',
        args: [address, parseAmount],
    });

    useEffect(() => {
        setGetGasCost(data);
        setError(readError);
        setIsPending(readIsPending);
    }, [data, readError, readIsPending]);

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
                address: '0x40D345fA7ED3c8a9f45962ABF238A13e9F39F275',
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
        history.push('/withdraw')
        switchChain({ chainId: chains[1].id })
    }

    const handleAmountChange = (e) => {
        setAmount(e.target.value)
    }

    return (
        <div className="bg-black text-white font-mono">
            <div className="max-w-lg mx-auto ">
                <div className="border border-zinc-700 p-4 rounded-lg">
                    <div className="flex justify-between text-sm mb-4">
                        <button className="bg-zinc-800 py-1 px-3 rounded">DEPOSIT</button>
                        <button onClick={handleSwitch} className="bg-transparent py-1 px-3 rounded hover:bg-zinc-800">WITHDRAW</button>
                        <button className="bg-transparent py-1 px-3 rounded hover:bg-zinc-800">HISTORY</button>
                    </div>

                    <div className="mb-4">
                        <label className="block text-zinc-400 mb-1">FROM</label>
                        <div className="flex items-center justify-between bg-zinc-800 p-2 rounded">
                            <span className="flex items-center">
                                <img src="https://blast.io/icons/eth-color.svg" width='30px' alt="Ethereum" className="mr-2" />
                                Ethereum Mainnet
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
                            <button className="text-yellow-300 pl-2">MAX</button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-zinc-400 mb-1">TO</label>
                        <div className="flex items-center justify-between bg-zinc-800 p-2 rounded">
                            <span className="flex items-center">
                                <img src="https://a-us.storyblok.com/f/1014909/512x512/026e26392f/dark_512-1.png" width='30px' alt="Botanix" className="mr-2" />
                                Botanix Testnet
                            </span>
                        </div>
                    </div>

                    {amount !== 0 && (
                        <div className="bg-black text-white font-mono">
                            {/* Rest of the code */}
                            {!isPending && (
                                // Render data when isPending is false
                                <div>
                                    {/* Display the data */}
                                    {getGasCost && <div className="bg-black text-white font-mono">Gas Cost: {getGasCost?.toString()}</div>}
                                    {/* Handle error */}
                                    {error && <div className="bg-black text-white font-mono">Error: {error.message}</div>}
                                </div>
                            )}
                        </div>
                    )}


                    <button onClick={handleSubmit} className="w-full bg-yellow-300 text-black my-3 py-2 rounded">SUBMIT</button>
                </div>
            </div>
        </div>
    )
}