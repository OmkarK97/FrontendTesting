import React from 'react'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const Botanix = {
  id: 3636,
  name: 'Botanix',
  iconUrl: 'https://chainlist.org/unknown-logo.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Bitcoin', symbol: 'BTC', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://node.botanixlabs.dev'] },
  },
}

const Alfajores = {
  id: 44787,
  name: 'Alfajores',
  iconUrl: 'https://chainlist.org/unknown-logo.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://alfajores-forno.celo-testnet.org'] },
  },
}

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [Alfajores, Botanix],
  ssr: true,
});


const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={Alfajores} theme={darkTheme()} coolMode showRecentTransactions>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
