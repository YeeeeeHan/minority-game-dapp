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
import { useEffect } from 'react'

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function App() {
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
                  {/*<Route path="/" element={<Dashboard />} />*/}
                  {/*<Route path="/login" element={<Login />} />*/}
                  {/*<Route path="/register" element={<Register />} />*/}
                  <Route path="/connectwallet" element={<ConnectWallet />} />
                  <Route path="/signin" element={<SigninSide />} />
                  <Route path="/" element={<Homepage />} />
                  <Route exact path="/admin" element={<Admin />} />
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
