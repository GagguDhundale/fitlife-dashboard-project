
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Calendar, Dumbbell, Flame, Target, Trophy, Weight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface AchievementCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  unlocked: boolean;
}

function AchievementCard({ title, description, icon, progress, unlocked }: AchievementCardProps) {
  return (
    <Card className={`card-hover ${unlocked ? 'border-primary' : 'border-border'}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-base font-medium ${unlocked ? 'text-primary' : 'text-muted-foreground'}`}>
          {title}
        </CardTitle>
        <div className={`h-10 w-10 rounded-full ${unlocked ? 'bg-primary/20' : 'bg-muted'} flex items-center justify-center ${unlocked ? 'text-primary' : 'text-muted-foreground'}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <p className={`text-sm mb-3 ${unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
          {description}
        </p>
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs">
            <span>{progress}%</span>
            <span>{unlocked ? 'Unlocked' : 'Locked'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const Achievements = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sample achievements data
  const achievements = [
    {
      title: "Workout Warrior",
      description: "Complete 5 workouts in one week",
      icon: <Dumbbell className="h-5 w-5" />,
      progress: 100,
      unlocked: true
    },
    {
      title: "Early Bird",
      description: "Complete 3 morning workouts",
      icon: <Calendar className="h-5 w-5" />,
      progress: 100,
      unlocked: true
    },
    {
      title: "Goal Getter",
      description: "Achieve your first fitness goal",
      icon: <Target className="h-5 w-5" />,
      progress: 100,
      unlocked: true
    },
    {
      title: "Consistent Cook",
      description: "Log your meals for 7 consecutive days",
      icon: <Flame className="h-5 w-5" />,
      progress: 70,
      unlocked: false
    },
    {
      title: "Weight Milestone",
      description: "Reach your weight goal",
      icon: <Weight className="h-5 w-5" />,
      progress: 65,
      unlocked: false
    },
    {
      title: "Fitness Master",
      description: "Complete all beginner achievements",
      icon: <Trophy className="h-5 w-5" />,
      progress: 40,
      unlocked: false
    },
    {
      title: "30-Day Streak",
      description: "Use the app for 30 consecutive days",
      icon: <Flame className="h-5 w-5" />,
      progress: 27,
      unlocked: false
    },
    {
      title: "Nutrition Ninja",
      description: "Stay under your calorie goal for 14 days",
      icon: <Award className="h-5 w-5" />,
      progress: 50,
      unlocked: false
    }
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      
      <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'pl-16' : 'pl-64'}`}>
        <main className="p-8 max-w-7xl mx-auto">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
              <p className="text-muted-foreground">Track your fitness accomplishments and milestones</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
              <div className="flex justify-between mb-6">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-1">Total Achievements</p>
                  <p className="text-2xl font-bold text-primary">{achievements.filter(a => a.unlocked).length}/{achievements.length}</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-1">Completion Rate</p>
                  <p className="text-2xl font-bold text-primary">
                    {Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)}%
                  </p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-1">Next Achievement</p>
                  <p className="text-2xl font-bold text-primary">Soon!</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Achievements</h2>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
                {achievements.map((achievement, index) => (
                  <AchievementCard 
                    key={index}
                    title={achievement.title}
                    description={achievement.description}
                    icon={achievement.icon}
                    progress={achievement.progress}
                    unlocked={achievement.unlocked}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Achievements;
