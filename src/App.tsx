import axios from "axios";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useQuery } from "@tanstack/react-query";
import ListGrid from "./components/Board";
import { useEffect, useState } from "react";
import { IBoard } from "./types/IBoard";
import ColorContext from "./contexts/BoardContext";

const App = () => {
    const [selectedBoard, setSelectedBoard] = useState({
        id: "1",
        color: "green",
    });

    const { data: boards, isLoading } = useQuery({
        queryKey: ["boards"],
        queryFn: () => {
            return axios.get("http://localhost:3000/boards").then((res) => {
                setSelectedBoard({
                    id: res.data[0].id,
                    color: res.data[0].color,
                });
                return res.data;
            });
        },
        initialData: [],
    });

    return (
        <ColorContext.Provider value={{ selectedBoard, setSelectedBoard }}>
            <div className="h-screen bg-stone-200">
                {/* Nav: Logo and User */}
                <Navbar />

                <div className="mt-24 grid grid-cols-[20em_auto]">
                    {/* Sidebar: Boards */}
                    <Sidebar boards={boards} activeBoardId={selectedBoard.id} />
                    {/* Todo, Doing and Done boards */}
                    {isLoading ? (
                        <h1>Loading</h1>
                    ) : (
                        <ListGrid
                            board={boards.find((b: IBoard) => {
                                return b.id === selectedBoard.id;
                            })}
                        />
                    )}
                </div>
            </div>
        </ColorContext.Provider>
    );
};

export default App;
