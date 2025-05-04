
import React, { useState, useEffect } from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

export function BmiCalculator() {
  const [height, setHeight] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>('');
  const [bmiColor, setBmiColor] = useState<string>('');

  const calculateBmi = () => {
    if (height && weight) {
      let bmiValue: number;

      if (unit === 'metric') {
        // Height in cm, weight in kg
        const heightInMeters = Number(height) / 100;
        bmiValue = Number(weight) / (heightInMeters * heightInMeters);
      } else {
        // Height in inches, weight in pounds
        bmiValue = (Number(weight) * 703) / (Number(height) * Number(height));
      }

      setBmi(parseFloat(bmiValue.toFixed(1)));
      toast.success('BMI calculated successfully!');
    } else {
      toast.error('Please enter both height and weight');
    }
  };

  useEffect(() => {
    if (bmi !== null) {
      if (bmi < 18.5) {
        setBmiCategory('Underweight');
        setBmiColor('text-blue-500');
      } else if (bmi >= 18.5 && bmi < 25) {
        setBmiCategory('Normal weight');
        setBmiColor('text-green-500');
      } else if (bmi >= 25 && bmi < 30) {
        setBmiCategory('Overweight');
        setBmiColor('text-yellow-500');
      } else {
        setBmiCategory('Obese');
        setBmiColor('text-red-500');
      }
    }
  }, [bmi]);

  const handleReset = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setBmiCategory('');
    setBmiColor('');
  };

  const heightLabel = unit === 'metric' ? 'Height (cm)' : 'Height (inches)';
  const weightLabel = unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)';

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>BMI Calculator</CardTitle>
        <CardDescription>
          Calculate your Body Mass Index to assess your weight relative to height
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="unit">Unit System</Label>
            <Select
              value={unit}
              onValueChange={(value) => {
                setUnit(value as 'metric' | 'imperial');
                setHeight('');
                setWeight('');
                setBmi(null);
              }}
            >
              <SelectTrigger id="unit">
                <SelectValue placeholder="Select unit system" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Metric (cm, kg)</SelectItem>
                <SelectItem value="imperial">Imperial (in, lbs)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">{heightLabel}</Label>
              <Input
                id="height"
                type="number"
                placeholder={unit === 'metric' ? 'e.g. 170' : 'e.g. 67'}
                value={height}
                onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : '')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">{weightLabel}</Label>
              <Input
                id="weight"
                type="number"
                placeholder={unit === 'metric' ? 'e.g. 70' : 'e.g. 154'}
                value={weight}
                onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : '')}
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <Button onClick={calculateBmi} className="flex-1">Calculate BMI</Button>
            <Button onClick={handleReset} variant="outline">Reset</Button>
          </div>

          {bmi !== null && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Your BMI is</p>
                <p className="text-3xl font-bold mb-2">{bmi}</p>
                <p className={`text-lg font-medium ${bmiColor}`}>{bmiCategory}</p>
                
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>BMI Categories:</p>
                  <ul className="text-left mt-2 space-y-1">
                    <li className="flex justify-between">
                      <span>Underweight:</span>
                      <span className="text-blue-500">Less than 18.5</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Normal weight:</span>
                      <span className="text-green-500">18.5 - 24.9</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Overweight:</span>
                      <span className="text-yellow-500">25 - 29.9</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Obese:</span>
                      <span className="text-red-500">30 or greater</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
