import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

export default function Layout(){
    return(
        <>
        <NavBar/>
        <div className="mt-4">
            <Outlet/>
        </div>
        </>
    )
}