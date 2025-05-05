
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { BmiCalculator } from '@/components/calculators/BmiCalculator';

const Bmi = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      
      <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'pl-16' : 'pl-64'}`}>
        <main className="p-8 max-w-7xl mx-auto">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">BMI Calculator</h1>
              <p className="text-muted-foreground">Calculate and track your Body Mass Index</p>
            </div>
            
            <section className="section-spacing">
              <BmiCalculator />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Bmi;
