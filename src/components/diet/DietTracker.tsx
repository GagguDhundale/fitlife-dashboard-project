
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';

interface MealEntry {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: string;
  time: string;
}

export function DietTracker() {
  const [meals, setMeals] = useState<MealEntry[]>([
    { id: 1, name: 'Oatmeal with Berries', calories: 350, protein: 12, carbs: 55, fat: 8, mealType: 'Breakfast', time: '08:30' },
    { id: 2, name: 'Chicken Salad', calories: 420, protein: 35, carbs: 18, fat: 22, mealType: 'Lunch', time: '13:00' },
    { id: 3, name: 'Protein Shake', calories: 200, protein: 25, carbs: 10, fat: 3, mealType: 'Snack', time: '16:30' },
  ]);
  
  const [newMeal, setNewMeal] = useState<Partial<MealEntry>>({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    mealType: 'Breakfast',
    time: ''
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddMeal = () => {
    if (!newMeal.name || !newMeal.calories) {
      toast.error('Please provide at least a meal name and calories');
      return;
    }

    const meal = {
      ...newMeal,
      id: Date.now()
    } as MealEntry;

    setMeals([...meals, meal]);
    setNewMeal({
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      mealType: 'Breakfast',
      time: ''
    });
    setIsDialogOpen(false);
    toast.success('Meal added successfully!');
  };

  const handleDeleteMeal = (id: number) => {
    setMeals(meals.filter((meal) => meal.id !== id));
    toast.success('Meal deleted successfully!');
  };

  // Daily nutrient calculations
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);
  
  // Target daily values (for example)
  const targetCalories = 2000;
  const targetProtein = 120;
  const targetCarbs = 250;
  const targetFat = 65;

  // Calculate percentages for progress bars
  const caloriePercentage = Math.min(Math.round((totalCalories / targetCalories) * 100), 100);
  const proteinPercentage = Math.min(Math.round((totalProtein / targetProtein) * 100), 100);
  const carbsPercentage = Math.min(Math.round((totalCarbs / targetCarbs) * 100), 100);
  const fatPercentage = Math.min(Math.round((totalFat / targetFat) * 100), 100);

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Diet Tracker</CardTitle>
          <CardDescription>Track your meals and nutritional intake</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Add Meal</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Meal</DialogTitle>
              <DialogDescription>
                Enter details about your meal
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Meal Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mealType" className="text-right">
                  Meal Type
                </Label>
                <Select
                  value={newMeal.mealType}
                  onValueChange={(value) => setNewMeal({ ...newMeal, mealType: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent>
                    {mealTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="calories" className="text-right">
                  Calories
                </Label>
                <Input
                  id="calories"
                  type="number"
                  className="col-span-3"
                  value={newMeal.calories || ''}
                  onChange={(e) => setNewMeal({ ...newMeal, calories: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="protein" className="text-right">
                  Protein (g)
                </Label>
                <Input
                  id="protein"
                  type="number"
                  className="col-span-3"
                  value={newMeal.protein || ''}
                  onChange={(e) => setNewMeal({ ...newMeal, protein: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="carbs" className="text-right">
                  Carbs (g)
                </Label>
                <Input
                  id="carbs"
                  type="number"
                  className="col-span-3"
                  value={newMeal.carbs || ''}
                  onChange={(e) => setNewMeal({ ...newMeal, carbs: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fat" className="text-right">
                  Fat (g)
                </Label>
                <Input
                  id="fat"
                  type="number"
                  className="col-span-3"
                  value={newMeal.fat || ''}
                  onChange={(e) => setNewMeal({ ...newMeal, fat: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  className="col-span-3"
                  value={newMeal.time}
                  onChange={(e) => setNewMeal({ ...newMeal, time: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddMeal}>
                Add Meal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Calories ({totalCalories}/{targetCalories} kcal)</span>
              <span className="text-sm font-medium">{caloriePercentage}%</span>
            </div>
            <Progress value={caloriePercentage} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Protein ({totalProtein}/{targetProtein}g)</span>
              <span className="text-sm font-medium">{proteinPercentage}%</span>
            </div>
            <Progress value={proteinPercentage} className="h-2 bg-muted" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Carbs ({totalCarbs}/{targetCarbs}g)</span>
              <span className="text-sm font-medium">{carbsPercentage}%</span>
            </div>
            <Progress value={carbsPercentage} className="h-2 bg-muted" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Fat ({totalFat}/{targetFat}g)</span>
              <span className="text-sm font-medium">{fatPercentage}%</span>
            </div>
            <Progress value={fatPercentage} className="h-2 bg-muted" />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Meal</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="hidden md:table-cell">Time</TableHead>
                <TableHead className="text-right">Calories</TableHead>
                <TableHead className="text-right hidden md:table-cell">Macros (P/C/F)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meals.map((meal) => (
                <TableRow key={meal.id}>
                  <TableCell className="font-medium">{meal.name}</TableCell>
                  <TableCell>{meal.mealType}</TableCell>
                  <TableCell className="hidden md:table-cell">{meal.time}</TableCell>
                  <TableCell className="text-right">{meal.calories}</TableCell>
                  <TableCell className="text-right hidden md:table-cell">
                    {meal.protein}g / {meal.carbs}g / {meal.fat}g
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteMeal(meal.id)}
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
