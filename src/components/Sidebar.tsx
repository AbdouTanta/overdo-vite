const Sidebar = () => {
    return (
        <div className="flex flex-col gap-12 px-20">
            <div className="text-lg font-medium text-red-500 cursor-pointer hover:text-red-700">
                Studies
            </div>
            <div className="text-lg font-medium text-green-500 cursor-pointer hover:text-green-700">
                Work
            </div>
            <div className="text-lg font-medium text-blue-500 cursor-pointer hover:text-blue-700">
                Fitness
            </div>
            <div className="text-lg font-medium underline cursor-pointer underline-offset-4 text-slate-500 hover:text-slate-700">
                + New Board
            </div>
        </div>
    );
};

export default Sidebar;
