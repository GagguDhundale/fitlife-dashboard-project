
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
        <main className="p-8 max-w-7xl mx-auto">
          <Dashboard />
          
          <div className="grid gap-8 mt-8">
            <section className="section-spacing">
              <ProgressChart />
            </section>
            
            <div className="grid gap-8 lg:grid-cols-2">
              <section className="section-spacing">
                <WorkoutTracker />
              </section>
              <section className="section-spacing">
                <DietTracker />
              </section>
            </div>
            
            <div className="grid gap-8 lg:grid-cols-2">
              <section className="section-spacing">
                <GoalSetting />
              </section>
              <section className="section-spacing">
                <BmiCalculator />
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
