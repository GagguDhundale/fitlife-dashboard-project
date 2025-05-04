
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Dashboard } from '@/components/layout/Dashboard';
import { WorkoutTracker } from '@/components/workout/WorkoutTracker';
import { DietTracker } from '@/components/diet/DietTracker';
import { GoalSetting } from '@/components/goals/GoalSetting';
import { BmiCalculator } from '@/components/calculators/BmiCalculator';
import { ProgressChart } from '@/components/progress/ProgressChart';

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      
      <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'pl-16' : 'pl-64'}`}>
        <main className="p-6">
          <Dashboard />
          
          <div className="grid gap-6 mt-6">
            <ProgressChart />
            
            <div className="grid gap-6 md:grid-cols-2">
              <WorkoutTracker />
              <DietTracker />
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <GoalSetting />
              <BmiCalculator />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
