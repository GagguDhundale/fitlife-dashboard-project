
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UserRound, Camera, Trophy, Dumbbell } from 'lucide-react';

const Profile = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toast } = useToast();
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Fitness enthusiast trying to stay healthy and active.',
    heightCm: 178,
    weightKg: 75
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUser(editedUser);
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully."
      });
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      
      <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'pl-16' : 'pl-64'}`}>
        <main className="p-8 max-w-7xl mx-auto">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
              <p className="text-muted-foreground">View and manage your personal information</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* User Profile Card */}
              <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Manage your personal profile</CardDescription>
                  </div>
                  <Button onClick={handleEditToggle}>{isEditing ? 'Save' : 'Edit'}</Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <UserRound className="h-12 w-12" />
                      </Avatar>
                      {isEditing && (
                        <Button size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8" variant="outline">
                          <Camera className="h-4 w-4" />
                          <span className="sr-only">Upload image</span>
                        </Button>
                      )}
                    </div>
                    <div className="space-y-4 flex-1">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        {isEditing ? (
                          <Input 
                            id="name" 
                            name="name" 
                            value={editedUser.name} 
                            onChange={handleChange} 
                          />
                        ) : (
                          <p className="text-lg font-medium">{user.name}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        {isEditing ? (
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={editedUser.email} 
                            onChange={handleChange} 
                          />
                        ) : (
                          <p>{user.email}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    {isEditing ? (
                      <Input 
                        id="bio" 
                        name="bio" 
                        value={editedUser.bio} 
                        onChange={handleChange} 
                      />
                    ) : (
                      <p>{user.bio}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      {isEditing ? (
                        <Input 
                          id="height" 
                          name="heightCm" 
                          type="number" 
                          value={editedUser.heightCm} 
                          onChange={handleChange} 
                        />
                      ) : (
                        <p>{user.heightCm} cm</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      {isEditing ? (
                        <Input 
                          id="weight" 
                          name="weightKg" 
                          type="number" 
                          value={editedUser.weightKg} 
                          onChange={handleChange} 
                        />
                      ) : (
                        <p>{user.weightKg} kg</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Fitness Stats</CardTitle>
                    <CardDescription>Your current fitness overview</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-amber-500" />
                        <span>Achievements</span>
                      </div>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Dumbbell className="h-5 w-5 text-primary" />
                        <span>Workouts</span>
                      </div>
                      <span className="font-medium">28</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span>Current BMI</span>
                      </div>
                      <span className="font-medium">{(user.weightKg / Math.pow(user.heightCm/100, 2)).toFixed(1)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
