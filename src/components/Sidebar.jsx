import { useContext, createContext, useState } from "react"
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { Link } from "react-router-dom";
const SidebarContext = createContext();

export default function Sidebar({children}) {
    const [expanded, setExpanded] = useState(true)
    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white border-r-[1px] border-r-sidebar-border shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center border-b-[1px] border-b-sidebar-border">
                    {
                        expanded ?
                        <div className="flex flex-col">
                            <h1 className="font-bold text-sidebar-primary">LOVE ENGLISH</h1>
                            <p className="text-[12px]">Learn Together</p>
                        </div>
                        : <></>
                    }
                    
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>
                
                <SidebarContext.Provider value={{expanded}}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

                <div className="border-t-[1px] border-t-sidebar-border flex p-3">
                    <img
                        src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                        alt=""
                        className="w-10 h-10 rounded-md"
                    />
                    <div
                        className={`
                        flex justify-between items-center
                        overflow-hidden  ${expanded ? "w-{150px} ml-3" : "w-0"}
                    `}>
                        <div className="leading-4">
                            <h4 className="font-semibold">Steve hanji</h4>
                            <span className="text-xs text-gray-600">SteveHanji@gmail.com</span>
                        </div>
                        <MoreVertical size={20}/>
                    </div>
                </div>
            </nav>
        </aside>
    )
};

export function SidebarItem({ icon, text, to, active, alert }) {
    const { expanded } = useContext(SidebarContext)
    
    return (
        <Link to={to}>
            <li
                className={`
                    relative flex items-center py-2 px-3 my-1
                    font-medium rounded-md cursor-pointer
                    transition-colors group
                    ${
                    active
                        ? "bg-sidebar-primary text-white"
                        : "hover:bg-indigo-50 text-gray-600"
                    }
                `}
                >
                {icon}
                <span
                    className={`overflow-hidden ${
                    expanded ? "w ml-3" : "w-0"
                    }`}
                >
                    {text}
                </span>
                {alert && (
                    <div
                    className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                        expanded ? "" : "top-2"
                    }`}
                    />
                )}

                {!expanded && (
                    <div
                    className={`
                    absolute left-full rounded-md px-2 py-1 ml-6
                    bg-indigo-100 text-indigo-800 text-sm
                    invisible opacity-20 -translate-x-3 transition-all
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                    `}>
                        {text}
                    </div>
                )}
            </li>
        </Link>
    )
}