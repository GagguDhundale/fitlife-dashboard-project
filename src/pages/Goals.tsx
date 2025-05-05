
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { GoalSetting } from '@/components/goals/GoalSetting';

const Goals = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      
      <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'pl-16' : 'pl-64'}`}>
        <main className="p-8 max-w-7xl mx-auto">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Goals</h1>
              <p className="text-muted-foreground">Set and track your fitness goals</p>
            </div>
            
            <section className="section-spacing">
              <GoalSetting />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Goals;
