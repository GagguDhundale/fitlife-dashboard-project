
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Dumbbell, 
  Utensils, 
  Goal, 
  Activity, 
  Calculator, 
  Award, 
  User, 
  Settings, 
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  return (
    <div 
      className={cn(
        "h-screen bg-card border-r border-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!collapsed && (
          <h1 className="text-xl font-bold text-primary">FitLife</h1>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-2 rounded-full hover:bg-muted text-muted-foreground"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {[
            { name: 'Dashboard', icon: Home, path: '/' },
            { name: 'Workouts', icon: Dumbbell, path: '/workouts' },
            { name: 'Diet', icon: Utensils, path: '/diet' },
            { name: 'Goals', icon: Goal, path: '/goals' },
            { name: 'Progress', icon: Activity, path: '/progress' },
            { name: 'BMI Calculator', icon: Calculator, path: '/bmi' },
            { name: 'Achievements', icon: Award, path: '/achievements' },
          ].map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center p-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                  window.location.pathname === item.path ? "bg-accent/50 text-accent-foreground" : "text-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-2 border-t border-border mt-auto">
        <ul className="space-y-1">
          {[
            { name: 'Profile', icon: User, path: '/profile' },
            { name: 'Settings', icon: Settings, path: '/settings' },
          ].map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="flex items-center p-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
