import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CustomConnectButton } from "./CustomConnectButton";
import { useWindowSize } from "react-use/lib";

const Header = () => {
  const { width } = useWindowSize(); // Get the window width using the useWindowSize hook

  return (
    <div className="absolute z-10 bg-[#000000] border-b-[#252b1b] border-black border-2 top-0 left-0 w-full flex justify-between items-center px-6 py-4">
      <h1 className="text-2xl md:text-4xl font-bold text-white">SpiderBridge</h1>
      {width > 768 && (
        <div>
          <CustomConnectButton />
        </div>
      )
      }
      {/* Show only for mobile devices (width less than or equal to 768 pixels) */}
      {width <= 768 && (
        <div>
          <ConnectButton
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
