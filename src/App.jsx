import { Home, BookOpen, Users, User, Shield } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import Sidebar, { SidebarItem } from './components/Sidebar';
import { useAuth } from './context/AuthContext';

function App() {
    const navigationItems = [
        {
            Name: 'Home',
            Icon: <Home size={20} />,
            Link: '/',
        },
        {
            Name: 'Study Sets',
            Icon: <BookOpen size={20} />,
            Link: '/StudySets',
        },
        {
            Name: 'Community',
            Icon: <Users size={20} />,
            Link: '/Community',
        },
        {
            Name: 'Profile',
            Icon: <User size={20} />,
            Link: '/Profile',
        },
        {
            Name: 'Admin Panel',
            Icon: <Shield size={20} />,
            Link: '/AdminPanel',
        },
    ];
    const {user} = useAuth();

    return (
        <div className="flex w-screen h-screen bg-slate-50 overflow-hidden">
            <Sidebar>
                {navigationItems.map((item, index) => {    
                    if (item.Name != "Admin Panel" || user.role == "admin") {
                        return (
                            <SidebarItem
                                key={index}
                                icon={item.Icon}
                                text={item.Name}
                                to={item.Link}
                            />
                        )
                    }
                })}
            </Sidebar>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto bg-slate-50">
                <Outlet />
            </main>
        </div>
    );
}

export default App;
