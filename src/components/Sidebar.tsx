const Sidebar = () => {
    return (
        <div className=" flex flex-col  gap-12 px-20">
            <div className="cursor-pointer text-lg font-medium text-red-500 hover:text-red-700">
                Studies
            </div>
            <div className="cursor-pointer text-lg font-medium text-green-500 hover:text-green-700">
                Work
            </div>
            <div className="cursor-pointer text-lg font-medium text-blue-500 hover:text-blue-700">
                Fitness
            </div>
            <div className="cursor-pointer text-lg font-medium text-slate-500 underline underline-offset-4 hover:text-slate-700">
                + New Board
            </div>
        </div>
    );
};

export default Sidebar;
