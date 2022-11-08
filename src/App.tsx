import axios from "axios";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useQuery } from "@tanstack/react-query";
import ListGrid from "./components/Board";

const App = () => {
    const { data: boards, isLoading } = useQuery(["boards"], () => {
        return axios
            .get("http://localhost:3000/boards")
            .then((res) => res.data);
    });

    return (
        <div className="h-screen bg-stone-200">
            {/* Nav: Logo and User */}
            <Navbar />

            <div className="mt-24 grid grid-cols-[20em_auto]">
                {/* Sidebar: Boards */}
                <Sidebar />
                {/* Todo, Doing and Done boards */}
                {isLoading ? <h1>Loading</h1> : <ListGrid board={boards![0]} />}
            </div>
        </div>
    );
};

export default App;
