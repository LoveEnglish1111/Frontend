import { useContext, createContext, useState } from 'react';
import { MoreVertical, ChevronLast, ChevronFirst, LogOut } from 'lucide-react';
import {
    NavLink,
    useNavigate,
    useResolvedPath,
    useLocation,
} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImgage from "../../public/Logo.png"

const SidebarContext = createContext();

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true);
    const { user, signout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        signout();
        navigate('/SignIn');
    };

    return (
        <aside className="h-screen bg-white border-r border-border shadow-sm">
            <nav className="h-full flex flex-col">
                {/* Header - Logo Section */}
                <div className="p-4 pb-2 flex justify-between items-center border-b border-border">
                    {expanded && (
                        <div className='flex items-center'>
                            <div className='w-[50px] h-[50px] mr-[5px] overflow-hidden rounded-[20px]'>
                                <img src={logoImgage} className='w-full h-full object-cover object-center'/>
                            </div>

                            <div className="flex flex-col">
                                <h1 className="font-bold text-xl text-primary-600">
                                    LOVE ENGLISH
                                </h1>
                                <p className="text-xs text-muted-foreground font-medium">
                                    Learn Together
                                </p>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="cursor-pointer p-1.5 rounded-lg bg-secondary hover:bg-slate-200 transition-colors text-foreground"
                        title={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
                    >
                        {expanded ? (
                            <ChevronFirst size={18} />
                        ) : (
                            <ChevronLast size={18} />
                        )}
                    </button>
                </div>

                {/* Navigation Items */}
                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3 py-4 space-y-2">{children}</ul>
                </SidebarContext.Provider>

                {/* User Profile Section - Footer */}
                <div className="border-t border-border p-3 space-y-3">
                    <div className="flex items-center gap-3 px-2 py-2">
                        <img
                            src={`https://ui-avatars.com/api/?background=2563eb&color=fff&bold=true&name=${user.username.slice(0, 2)}`}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-lg flex-shrink-0"
                        />
                        {expanded && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-foreground truncate">
                                    {user?.username || 'User'}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                    {user?.email || 'user@example.com'}
                                </p>
                            </div>
                        )}
                        {expanded && (
                            <button className="p-1 hover:bg-secondary rounded transition-colors">
                                <MoreVertical
                                    size={16}
                                    className="text-muted-foreground"
                                />
                            </button>
                        )}
                    </div>

                    {expanded && (
                        <button
                            onClick={handleLogout}
                            className="cursor-pointer w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut size={16} />
                            <span>Đăng xuất</span>
                        </button>
                    )}
                </div>
            </nav>
        </aside>
    );
}

export function SidebarItem({ icon, text, to, alert }) {
    const { expanded } = useContext(SidebarContext);
    const resolvedPath = useResolvedPath(to);
    const location = useLocation();
    const isActive = location.pathname === resolvedPath.pathname;

    return (
        <NavLink to={to} className="block">
            <li
                className={`
                    relative flex items-center gap-3 py-2.5 px-3
                    rounded-lg cursor-pointer transition-all duration-200
                    font-medium text-sm
                    ${
                        isActive
                            ? 'bg-primary-600 text-white shadow-md'
                            : 'text-foreground hover:bg-secondary active:bg-slate-200'
                    }
                `}
                title={text}
            >
                <div className="flex-shrink-0 flex items-center">{icon}</div>

                <span
                    className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${
                        expanded ? 'w-auto opacity-100' : 'w-0 opacity-0'
                    }`}
                >
                    {text}
                </span>

                {alert && (
                    <div
                        className={`absolute right-2 w-2 h-2 rounded-full bg-destructive flex-shrink-0 ${
                            expanded ? '' : 'top-2'
                        }`}
                    />
                )}

                {!expanded && (
                    <div
                        className={`
                            absolute left-full rounded-lg px-2 py-1 ml-2 min-w-max
                            bg-foreground text-white text-xs font-medium
                            invisible opacity-0 -translate-x-2 transition-all duration-200 pointer-events-none
                            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                        `}
                    >
                        {text}
                    </div>
                )}
            </li>
        </NavLink>
    );
}
