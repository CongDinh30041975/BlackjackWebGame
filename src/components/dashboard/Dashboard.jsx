import { Outlet } from "react-router-dom";
import TopNav from "./TopNav/TopNav";

function DashBoard() {
    return (
    <div className="dashboard">
        <TopNav />
        <main className="main">
            <Outlet />
        </main>
    </div>
    );
}

export default DashBoard;