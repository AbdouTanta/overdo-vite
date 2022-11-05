import List from "./components/List";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import boards from "./data/boards";

const App = () => {
    return (
        <div className="h-screen bg-zinc-200">
            {/* Nav: Logo and User */}
            <Navbar />

            <div className="grid grid-cols-[20em_auto] mt-24">
                {/* Sidebar: Boards */}
                <Sidebar />
                {/* Todo, Doing and Done tasks */}
                <div className="flex items-start gap-8">
                    {boards[0].lists.map((list) => (
                        <List key={list.id} list={list} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
