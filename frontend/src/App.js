import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import SigninSide from './components/Signin'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import WalletCard from './pages/WalletCard'
import Homepage from './pages/Homepage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Contract from "./Contract";
import {getQuestionById} from "./services/questionService";
import Admin from "./pages/Admin"

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  });

  return (
    <>
      <Router>
        <QueryClientProvider client={queryClient}>
          <div className="container">
            {/*<Header />*/}
            <WalletCard />
            <Routes>
              {/*<Route path="/" element={<Dashboard />} />*/}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Homepage />} />
              <Route exact path="/admin" element={<Admin />} />
            </Routes>
            {/*<SigninSide />*/}
          </div>
          <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
