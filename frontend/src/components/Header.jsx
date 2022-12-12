import './Header.css'
import { FaSignInAlt, FaSignOutAlt, FaHome, FaCheck } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import KeepMountedModal from './Modal'
import React from 'react'
import Button from '@mui/material/Button'
import { useWeb3React } from '@web3-react/core'

function Header() {
  const { active } = useWeb3React()

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <Button color={'inherit'}>
            <FaHome /> Home
          </Button>
        </Link>
      </div>
      <ul>
        {active ? (
          <li>
            <Link to="/connectwallet">
              <Button color={'inherit'}>
                <FaCheck /> Wallet connected
              </Button>
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/connectwallet">
                <Button color={'inherit'}>
                  <FaSignInAlt /> Connect Wallet
                </Button>
              </Link>
            </li>
          </>
        )}
        <li>
          <KeepMountedModal />
        </li>
      </ul>
    </header>
  )
}

export default Header
