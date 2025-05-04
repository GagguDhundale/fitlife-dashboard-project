
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data - would be fetched from the API in a real application
const weightData = [
  { date: 'May 1', weight: 165, bodyFat: 22, muscle: 45 },
  { date: 'May 3', weight: 164, bodyFat: 21.5, muscle: 45.2 },
  { date: 'May 5', weight: 163.5, bodyFat: 21.2, muscle: 45.5 },
  { date: 'May 7', weight: 163, bodyFat: 21, muscle: 45.8 },
  { date: 'May 9', weight: 162, bodyFat: 20.8, muscle: 46 },
  { date: 'May 11', weight: 161.5, bodyFat: 20.5, muscle: 46.3 },
  { date: 'May 13', weight: 161, bodyFat: 20, muscle: 46.5 },
];

const workoutData = [
  { date: 'May 1', calories: 250, duration: 25 },
  { date: 'May 2', calories: 320, duration: 35 },
  { date: 'May 3', calories: 0, duration: 0 },
  { date: 'May 4', calories: 450, duration: 45 },
  { date: 'May 5', calories: 280, duration: 30 },
  { date: 'May 6', calories: 0, duration: 0 },
  { date: 'May 7', calories: 300, duration: 35 },
  { date: 'May 8', calories: 400, duration: 40 },
  { date: 'May 9', calories: 350, duration: 35 },
  { date: 'May 10', calories: 0, duration: 0 },
  { date: 'May 11', calories: 520, duration: 55 },
  { date: 'May 12', calories: 300, duration: 30 },
  { date: 'May 13', calories: 420, duration: 45 },
];

const nutritionData = [
  { date: 'May 1', calories: 2100, protein: 110, carbs: 220, fat: 70 },
  { date: 'May 2', calories: 2200, protein: 115, carbs: 230, fat: 75 },
  { date: 'May 3', calories: 1950, protein: 105, carbs: 200, fat: 65 },
  { date: 'May 4', calories: 2050, protein: 110, carbs: 210, fat: 70 },
  { date: 'May 5', calories: 2150, protein: 120, carbs: 215, fat: 72 },
  { date: 'May 6', calories: 2250, protein: 125, carbs: 225, fat: 78 },
  { date: 'May 7', calories: 2000, protein: 110, carbs: 205, fat: 68 },
  { date: 'May 8', calories: 1900, protein: 100, carbs: 195, fat: 65 },
  { date: 'May 9', calories: 2100, protein: 115, carbs: 215, fat: 72 },
  { date: 'May 10', calories: 2050, protein: 112, carbs: 210, fat: 70 },
  { date: 'May 11', calories: 1980, protein: 108, carbs: 200, fat: 68 },
  { date: 'May 12', calories: 2150, protein: 118, carbs: 220, fat: 74 },
  { date: 'May 13', calories: 2000, protein: 110, carbs: 205, fat: 69 },
];

export function ProgressChart() {
  const [timeframe, setTimeframe] = React.useState('week');
  
  // A function to filter data based on the selected timeframe would go here
  // This is just a placeholder for now
  const getFilteredData = (data: any[], frame: string) => {
    if (frame === 'week') {
      return data.slice(-7);
    } else if (frame === 'month') {
      return data;
    } else {
      return data.slice(-3);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Progress Tracking</CardTitle>
          <CardDescription>Visualize your fitness journey</CardDescription>
        </div>
        <Select
          value={timeframe}
          onValueChange={setTimeframe}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3days">3 Days</SelectItem>
            <SelectItem value="week">1 Week</SelectItem>
            <SelectItem value="month">30 Days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weight">
          <TabsList className="mb-4">
            <TabsTrigger value="weight">Body Metrics</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weight" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getFilteredData(weightData, timeframe)}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="weight"
                    stroke="#4CAF50"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="bodyFat" 
                    stroke="#FF9800" 
                    strokeWidth={2} 
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="muscle" 
                    stroke="#2196F3" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">Current Weight</p>
                <p className="text-xl font-bold text-primary">{weightData[weightData.length - 1].weight} lbs</p>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">Body Fat %</p>
                <p className="text-xl font-bold text-[#FF9800]">{weightData[weightData.length - 1].bodyFat}%</p>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">Muscle Mass</p>
                <p className="text-xl font-bold text-[#2196F3]">{weightData[weightData.length - 1].muscle} lbs</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="workouts" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getFilteredData(workoutData, timeframe)}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="calories"
                    stroke="#4CAF50"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="duration" 
                    stroke="#2196F3" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">Avg. Calories Burned</p>
                <p className="text-xl font-bold text-primary">
                  {Math.round(workoutData.reduce((acc, curr) => acc + curr.calories, 0) / workoutData.length)}
                </p>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">Avg. Duration</p>
                <p className="text-xl font-bold text-[#2196F3]">
                  {Math.round(workoutData.reduce((acc, curr) => acc + curr.duration, 0) / workoutData.length)} min
                </p>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">Active Days</p>
                <p className="text-xl font-bold text-[#FF9800]">
                  {workoutData.filter(d => d.duration > 0).length}
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="nutrition" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getFilteredData(nutritionData, timeframe)}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="calories"
                    stroke="#4CAF50"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="protein" 
                    stroke="#2196F3" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="carbs" 
                    stroke="#FF9800" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="fat" 
                    stroke="#F44336" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">Avg. Calories</p>
                <p className="text-xl font-bold text-primary">
                  {Math.round(nutritionData.reduce((acc, curr) => acc + curr.calories, 0) / nutritionData.length)}
                </p>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">Protein</p>
                <p className="text-xl font-bold text-[#2196F3]">
                  {Math.round(nutritionData.reduce((acc, curr) => acc + curr.protein, 0) / nutritionData.length)}g
                </p>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">Carbs</p>
                <p className="text-xl font-bold text-[#FF9800]">
                  {Math.round(nutritionData.reduce((acc, curr) => acc + curr.carbs, 0) / nutritionData.length)}g
                </p>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xs text-muted-foreground">Fat</p>
                <p className="text-xl font-bold text-[#F44336]">
                  {Math.round(nutritionData.reduce((acc, curr) => acc + curr.fat, 0) / nutritionData.length)}g
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
