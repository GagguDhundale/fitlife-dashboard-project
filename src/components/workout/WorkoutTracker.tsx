
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { toast } from 'sonner';

interface WorkoutEntry {
  id: number;
  exercise: string;
  duration: number;
  calories: number;
  type: string;
  date: string;
}

export function WorkoutTracker() {
  const [workouts, setWorkouts] = useState<WorkoutEntry[]>([
    { id: 1, exercise: 'Running', duration: 30, calories: 320, type: 'Cardio', date: '2023-05-04' },
    { id: 2, exercise: 'Push-ups', duration: 15, calories: 100, type: 'Strength', date: '2023-05-04' },
    { id: 3, exercise: 'Cycling', duration: 45, calories: 400, type: 'Cardio', date: '2023-05-03' },
  ]);
  const [newWorkout, setNewWorkout] = useState<Partial<WorkoutEntry>>({
    exercise: '',
    duration: 0,
    calories: 0,
    type: 'Cardio',
    date: new Date().toISOString().split('T')[0],
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddWorkout = () => {
    if (!newWorkout.exercise || !newWorkout.duration || !newWorkout.calories) {
      toast.error('Please fill all fields');
      return;
    }

    const workout = {
      ...newWorkout,
      id: Date.now(),
    } as WorkoutEntry;

    setWorkouts([...workouts, workout]);
    setNewWorkout({
      exercise: '',
      duration: 0,
      calories: 0,
      type: 'Cardio',
      date: new Date().toISOString().split('T')[0],
    });
    setIsDialogOpen(false);
    toast.success('Workout added successfully!');
  };

  const handleDeleteWorkout = (id: number) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id));
    toast.success('Workout deleted successfully!');
  };

  const totalCaloriesBurned = workouts.reduce((sum, workout) => sum + workout.calories, 0);
  const totalDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0);

  const workoutTypes = ['Cardio', 'Strength', 'Flexibility', 'Balance', 'HIIT'];

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Workout Tracker</CardTitle>
          <CardDescription>Keep track of your daily workouts</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Add Workout</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Workout</DialogTitle>
              <DialogDescription>
                Enter details about your workout session
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="exercise" className="text-right">
                  Exercise
                </Label>
                <Input
                  id="exercise"
                  className="col-span-3"
                  value={newWorkout.exercise}
                  onChange={(e) => setNewWorkout({ ...newWorkout, exercise: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  value={newWorkout.type}
                  onValueChange={(value) => setNewWorkout({ ...newWorkout, type: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select workout type" />
                  </SelectTrigger>
                  <SelectContent>
                    {workoutTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duration (mins)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  className="col-span-3"
                  value={newWorkout.duration || ''}
                  onChange={(e) =>
                    setNewWorkout({
                      ...newWorkout,
                      duration: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="calories" className="text-right">
                  Calories Burned
                </Label>
                <Input
                  id="calories"
                  type="number"
                  className="col-span-3"
                  value={newWorkout.calories || ''}
                  onChange={(e) =>
                    setNewWorkout({
                      ...newWorkout,
                      calories: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  className="col-span-3"
                  value={newWorkout.date}
                  onChange={(e) =>
                    setNewWorkout({ ...newWorkout, date: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddWorkout}>
                Add Workout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-6">
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-1">Total Workouts</p>
            <p className="text-2xl font-bold text-primary">{workouts.length}</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-1">Total Duration</p>
            <p className="text-2xl font-bold text-primary">{totalDuration} mins</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-1">Calories Burned</p>
            <p className="text-2xl font-bold text-primary">{totalCaloriesBurned}</p>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exercise</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Duration (mins)</TableHead>
                <TableHead className="text-right">Calories</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workouts.map((workout) => (
                <TableRow key={workout.id}>
                  <TableCell className="font-medium">{workout.exercise}</TableCell>
                  <TableCell>{workout.type}</TableCell>
                  <TableCell className="hidden md:table-cell">{workout.date}</TableCell>
                  <TableCell className="text-right">{workout.duration}</TableCell>
                  <TableCell className="text-right">{workout.calories}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteWorkout(workout.id)}
                    >
                      <X className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
