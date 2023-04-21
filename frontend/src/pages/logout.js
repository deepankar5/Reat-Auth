import { redirect } from "react-router-dom";
import { clearAuthToken } from "../utils/auth";

export function logoutAction(){
    clearAuthToken()
   return redirect('/')
}