
import React, { useState } from 'react';
import { 
  Plus, 
  X, 
  CheckCircle2, 
  Circle 
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface Goal {
  id: number;
  name: string;
  type: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  completed: boolean;
}

export function GoalSetting() {
  const [goals, setGoals] = useState<Goal[]>([
    { 
      id: 1, 
      name: 'Lose Weight', 
      type: 'Weight', 
      target: 150, 
      current: 165,
      unit: 'lbs', 
      deadline: '2023-08-01',
      completed: false
    },
    { 
      id: 2, 
      name: 'Run 5K', 
      type: 'Exercise', 
      target: 5, 
      current: 3.2,
      unit: 'km', 
      deadline: '2023-06-15',
      completed: false
    },
    { 
      id: 3, 
      name: 'Daily Water Intake', 
      type: 'Habit', 
      target: 3000, 
      current: 2000,
      unit: 'ml', 
      deadline: '2023-05-10',
      completed: false
    },
  ]);
  
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    name: '',
    type: 'Weight',
    target: 0,
    current: 0,
    unit: '',
    deadline: '',
    completed: false
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.target || !newGoal.deadline) {
      toast.error('Please fill in all required fields');
      return;
    }

    const goal = {
      ...newGoal,
      id: Date.now(),
      completed: false
    } as Goal;

    setGoals([...goals, goal]);
    setNewGoal({
      name: '',
      type: 'Weight',
      target: 0,
      current: 0,
      unit: '',
      deadline: '',
      completed: false
    });
    setIsDialogOpen(false);
    toast.success('Goal added successfully!');
  };

  const handleUpdateProgress = (id: number, newCurrent: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id 
          ? { 
              ...goal, 
              current: newCurrent,
              completed: goal.type === 'Weight' 
                ? (goal.current <= goal.target) 
                : (goal.current >= goal.target)
            }
          : goal
      )
    );
    toast.success('Progress updated!');
  };

  const handleToggleCompleted = (id: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
    const goal = goals.find(g => g.id === id);
    toast.success(goal?.completed ? `Goal marked as in progress` : `Goal marked as completed!`);
  };

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id));
    toast.success('Goal deleted successfully!');
  };

  const calculateProgress = (goal: Goal) => {
    if (goal.type === 'Weight') {
      // For weight loss, 100% means current = target or less
      const total = goal.current - goal.target;
      const progress = (goal.current - goal.target) / total * 100;
      return Math.max(0, Math.min(100, 100 - progress));
    } else {
      // For other goals, 100% means current = target or more
      return Math.min(100, (goal.current / goal.target) * 100);
    }
  };

  const goalTypes = ['Weight', 'Exercise', 'Habit', 'Nutrition', 'Other'];

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Goals</CardTitle>
          <CardDescription>Track your fitness goals and progress</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>New Goal</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set New Goal</DialogTitle>
              <DialogDescription>
                Create a new fitness goal to track your progress
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Goal Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Goal Type
                </Label>
                <Select
                  value={newGoal.type}
                  onValueChange={(value) => setNewGoal({ ...newGoal, type: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select goal type" />
                  </SelectTrigger>
                  <SelectContent>
                    {goalTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="current" className="text-right">
                  Current Value
                </Label>
                <Input
                  id="current"
                  type="number"
                  step="0.1"
                  className="col-span-3"
                  value={newGoal.current || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, current: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="target" className="text-right">
                  Target Value
                </Label>
                <Input
                  id="target"
                  type="number"
                  step="0.1"
                  className="col-span-3"
                  value={newGoal.target || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, target: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="unit" className="text-right">
                  Unit
                </Label>
                <Input
                  id="unit"
                  className="col-span-3"
                  value={newGoal.unit}
                  onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                  placeholder="kg, steps, miles, etc."
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deadline" className="text-right">
                  Target Date
                </Label>
                <Input
                  id="deadline"
                  type="date"
                  className="col-span-3"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddGoal}>
                Create Goal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="p-4 border rounded-lg bg-card"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center">
                  <button
                    onClick={() => handleToggleCompleted(goal.id)}
                    className="mr-2 text-primary hover:text-primary/80"
                  >
                    {goal.completed ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </button>
                  <div>
                    <h3 className={`font-medium ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {goal.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {goal.type} • Due {new Date(goal.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteGoal(goal.id)}
                >
                  <X className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <div className="mt-4">
                <div className="flex justify-between mb-1 text-sm font-medium">
                  <span>Progress</span>
                  <span>
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                </div>
                <Progress value={calculateProgress(goal)} className="h-2" />
              </div>
              {!goal.completed && (
                <div className="mt-4 flex gap-2">
                  <Input
                    type="number"
                    step="0.1"
                    className="flex-1"
                    placeholder="Update current value"
                  />
                  <Button
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      const input = e.currentTarget.previousSibling as HTMLInputElement;
                      if (input.value) {
                        handleUpdateProgress(goal.id, parseFloat(input.value));
                        input.value = '';
                      }
                    }}
                  >
                    Update
                  </Button>
                </div>
              )}
            </div>
          ))}
          {goals.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No goals set yet. Create a new goal to get started!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
