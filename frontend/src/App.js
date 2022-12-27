import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import SigninSide from './components/Signin'
import { ConnectWallet } from './pages/ConnectWallet'
import Homepage from './pages/Homepage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Admin from './pages/Admin'

import { Web3ReactProvider } from '@web3-react/core'
import { MetamaskProvider } from './providers/metamask'
import { Web3Provider } from '@ethersproject/providers'
import { useEffect, useState } from 'react'
import PrivateRoutes from './pages/PrivateRoutes'
import { useAtom } from 'jotai'
import { mmSignerAtom } from './app/store'

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function App() {
  const [mmSigner, setMmSigner] = useAtom(mmSignerAtom)
  const [adminAddr, setAdminAddr] = useState()

  useEffect(async () => {
    if (mmSigner === undefined) {
      return
    }
    const addr = await mmSigner.getAddress()
    setAdminAddr(addr)
  }, [mmSigner])

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <>
      <Router>
        <Web3ReactProvider getLibrary={getLibrary}>
          <MetamaskProvider>
            <QueryClientProvider client={queryClient}>
              <Header />
              <div className="container">
                <Routes>
                  <Route element={<PrivateRoutes addr={adminAddr} />}>
                    <Route exact path="/admin" element={<Admin />} />
                  </Route>
                  <Route path="/connectwallet" element={<ConnectWallet />} />
                  <Route path="/signin" element={<SigninSide />} />
                  <Route path="/" element={<Homepage />} />
                </Routes>
              </div>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </MetamaskProvider>
        </Web3ReactProvider>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
