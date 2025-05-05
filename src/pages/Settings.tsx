
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Bell, Moon, Sun, Shield, LifeBuoy } from 'lucide-react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

const Settings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    emailUpdates: false,
    workoutReminders: true,
    mealReminders: true,
    waterReminders: false,
    privacyMode: false,
  });

  const handleToggle = (setting: string) => {
    setSettings(prev => {
      const newSettings = { 
        ...prev, 
        [setting]: !prev[setting as keyof typeof prev] 
      };
      
      toast({
        title: "Setting updated",
        description: `${setting.charAt(0).toUpperCase() + setting.slice(1)} has been ${newSettings[setting as keyof typeof newSettings] ? 'enabled' : 'disabled'}.`
      });
      
      return newSettings;
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      
      <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'pl-16' : 'pl-64'}`}>
        <main className="p-8 max-w-7xl mx-auto">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">Customize your app experience</p>
            </div>
            
            <div className="grid gap-8">
              {/* Appearance Settings */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5" />
                    <CardTitle>Appearance</CardTitle>
                  </div>
                  <CardDescription>Customize how the app looks for you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                    </div>
                    <Switch 
                      id="dark-mode" 
                      checked={settings.darkMode}
                      onCheckedChange={() => handleToggle('darkMode')}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    <CardTitle>Notifications</CardTitle>
                  </div>
                  <CardDescription>Manage your notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">App Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive in-app notifications</p>
                    </div>
                    <Switch 
                      id="notifications" 
                      checked={settings.notifications}
                      onCheckedChange={() => handleToggle('notifications')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-updates">Email Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive weekly fitness reports</p>
                    </div>
                    <Switch 
                      id="email-updates" 
                      checked={settings.emailUpdates}
                      onCheckedChange={() => handleToggle('emailUpdates')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="workout-reminders">Workout Reminders</Label>
                      <p className="text-sm text-muted-foreground">Get reminders for scheduled workouts</p>
                    </div>
                    <Switch 
                      id="workout-reminders" 
                      checked={settings.workoutReminders}
                      onCheckedChange={() => handleToggle('workoutReminders')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="meal-reminders">Meal Reminders</Label>
                      <p className="text-sm text-muted-foreground">Get reminders for meal times</p>
                    </div>
                    <Switch 
                      id="meal-reminders" 
                      checked={settings.mealReminders}
                      onCheckedChange={() => handleToggle('mealReminders')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="water-reminders">Water Reminders</Label>
                      <p className="text-sm text-muted-foreground">Get reminders to stay hydrated</p>
                    </div>
                    <Switch 
                      id="water-reminders" 
                      checked={settings.waterReminders}
                      onCheckedChange={() => handleToggle('waterReminders')}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Settings */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    <CardTitle>Privacy & Security</CardTitle>
                  </div>
                  <CardDescription>Manage your account privacy settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="privacy-mode">Private Profile</Label>
                      <p className="text-sm text-muted-foreground">Hide your profile activity from others</p>
                    </div>
                    <Switch 
                      id="privacy-mode" 
                      checked={settings.privacyMode}
                      onCheckedChange={() => handleToggle('privacyMode')}
                    />
                  </div>

                  <div className="pt-4 space-y-4">
                    {/* Delete Account Dialog (Desktop) */}
                    <div className="hidden md:block">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive">Delete Account</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will permanently delete your
                              account and remove all your data from our servers.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex justify-end gap-3 pt-4">
                            <Button variant="outline">Cancel</Button>
                            <Button variant="destructive">Yes, delete my account</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    {/* Delete Account Drawer (Mobile) */}
                    <div className="block md:hidden">
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button variant="destructive">Delete Account</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                            <DrawerDescription>
                              This action cannot be undone. This will permanently delete your
                              account and remove all your data from our servers.
                            </DrawerDescription>
                          </DrawerHeader>
                          <DrawerFooter className="pt-2">
                            <Button variant="destructive">Yes, delete my account</Button>
                            <DrawerClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    </div>

                    {/* Password Reset Button */}
                    <Button variant="outline">Reset Password</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Help & Support */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <LifeBuoy className="h-5 w-5" />
                    <CardTitle>Help & Support</CardTitle>
                  </div>
                  <CardDescription>Get help or provide feedback</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full sm:w-auto">Contact Support</Button>
                  <Button variant="outline" className="w-full sm:w-auto">Submit Feedback</Button>
                  <Button variant="outline" className="w-full sm:w-auto">User Guide</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
