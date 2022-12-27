import { Outlet, Navigate } from 'react-router-dom'
import {useAtom} from "jotai";
import {mmSignerAtom} from "../app/store";
import {useWeb3React} from "@web3-react/core";
import {useEffect} from "react";

function PrivateRoutes({addr}) {
  let auth = false
  if (addr === "0xf89804FB5037d25B0dB38A99a78C487755Af1FE9") {
    auth = true
  }
  return auth ? <Outlet/> : <h1>Admin access only</h1>
}

export default PrivateRoutes
