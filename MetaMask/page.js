'use client'
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import Send from './send.js'
 
const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  }),
})


function Profile() {
    const { address, isConnected } = useAccount()
    const { connect } = useConnect({
      connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect()
   
    if (isConnected)
      return (
        <div>
          Connected to {address}
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      )
    return <button onClick={() => connect()}>Connect Wallet</button>
  }

  
 
export default function App() {


  return (
    <div className='bg-white'>
    <WagmiConfig config={config}>
      <Profile />
      <Send/>
    </WagmiConfig>
    </div>
  )
}