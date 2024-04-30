/* eslint-disable react/prop-types */
import { useState } from "react"
import { useHistory } from "react-router-dom";
import { useSwitchChain } from "wagmi";
import switchIcon from '../assets/switch.svg'

const BotanixToCelo = ({
    handleOriginChain,
    handleDestChain,
    handleAmount,
    amount,
    handleSubmitBotanix,
    errorBotanix
}) => {
    const history = useHistory();
    const { chains, switchChain } = useSwitchChain();
    const [originChain, setOriginChain] = useState('Botanix');
    const [destChain, setDestChain] = useState('Alfajores');

    const handleSwitch = () => {
        history.push('/')
        switchChain({ chainId: chains[0].id });
    };

    return (
        <div className="h-full w-full relative bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] bg-slate-950 ">
            <div className="flex justify-center items-center h-screen">
                <div className="outer-div flex justify-center items-center w-[500px] h-[410px]">
                    <form
                        onSubmit={handleSubmitBotanix}
                        className="flex flex-col justify-between gap-6 bg-gray-900 p-8 shadow-md w-[490px] h-[400px]"
                    >
                        <div className="flex flex-col gap-8 mt-6">
                            <div className='flex flex-row justify-between'>
                                <div className="input-box relative w-[100%]">
                                    <select
                                        className="w-[100%] text-xl bg-gray-800 px-4 py-2  outline-none text-white "
                                        onChange={handleOriginChain}
                                        value={originChain}
                                    >
                                        <option>{originChain}</option>
                                    </select>
                                </div>
                                <div>
                                    <img className="w-[100%] px-12 py-2 outline-none text-white " src={switchIcon} alt="Switch Icon" onClick={handleSwitch} />
                                </div>
                                <div className="input-box relative w-[100%]">
                                    <select
                                        className="w-[100%] text-xl bg-gray-800 px-5 py-2 outline-none text-white "
                                        onChange={handleDestChain}
                                        value={destChain}
                                    >
                                        <option>{destChain}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input-box relative">
                                <input
                                    required
                                    value={amount}
                                    onChange={handleAmount}
                                    placeholder='Amount'
                                    className="w-[100%] text-xl bg-gray-800 px-4 py-2 outline-none text-white "
                                    type="number"
                                />
                            </div>
                            <button type="submit" className="submit-btn tracking-wide text-xl mb-8  text-white font-bold py-2 px-4 transition duration-500">
                                Submit
                            </button>
                            {errorBotanix && (
                                <div className="text-white" >ErrorBotanix: {errorBotanix.message}</div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BotanixToCelo;
