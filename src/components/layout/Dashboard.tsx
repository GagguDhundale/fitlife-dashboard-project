
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleCheck, Dumbbell, Calendar, TrendingUp, Award, Utensils } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

export function Dashboard() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">{formattedDate}</p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Workouts This Week"
          value="5"
          description="2 more workouts than last week"
          icon={<Dumbbell className="h-4 w-4" />}
        />
        <StatCard
          title="Current Streak"
          value="8 days"
          description="Your best streak is 14 days"
          icon={<CircleCheck className="h-4 w-4" />}
        />
        <StatCard
          title="Calories Today"
          value="1,850 / 2,100"
          description="250 calories under your daily goal"
          icon={<Utensils className="h-4 w-4" />}
        />
        <StatCard
          title="Next Goal Due"
          value="Lose 5 lbs"
          description="Due in 14 days - 60% complete"
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatCard
          title="Weight Trend"
          value="-2.5 lbs"
          description="Down 2.5 lbs this month"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatCard
          title="Recent Achievement"
          value="Workout Warrior"
          description="Completed 5 workouts in one week"
          icon={<Award className="h-4 w-4" />}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Today's Plan</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Workout</CardTitle>
              <CardDescription>Scheduled for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Upper Body Strength</p>
                  <span className="text-muted-foreground text-sm bg-muted px-2 py-1 rounded-full">45 min</span>
                </div>
                <ul className="list-disc pl-6 text-sm space-y-2 text-muted-foreground">
                  <li>Push-ups: 3 sets x 15 reps</li>
                  <li>Pull-ups: 3 sets x 8 reps</li>
                  <li>Dumbbell press: 3 sets x 12 reps</li>
                  <li>Tricep extensions: 3 sets x 15 reps</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Meals</CardTitle>
              <CardDescription>Nutrition plan for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="font-medium text-sm">Breakfast</p>
                  <p className="text-muted-foreground text-xs mt-1">Oatmeal with berries and nuts</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="font-medium text-sm">Lunch</p>
                  <p className="text-muted-foreground text-xs mt-1">Grilled chicken salad with avocado</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="font-medium text-sm">Dinner</p>
                  <p className="text-muted-foreground text-xs mt-1">Baked salmon with quinoa and vegetables</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="font-medium text-sm">Snacks</p>
                  <p className="text-muted-foreground text-xs mt-1">Greek yogurt with honey, protein shake</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
