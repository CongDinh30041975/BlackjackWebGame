import { Outlet } from "react-router-dom";
import TopNav from "./TopNav/TopNav";
import '../../styles/Dashboard.css'

function DashBoard() {
    return (
    <>
        <TopNav />
        <main className="main">
            <Outlet />
        </main>
    </>
    );
}

export default DashBoard;