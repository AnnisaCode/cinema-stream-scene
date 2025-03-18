
import { Navbar } from "@/components/Navbar";
import { ApiKeyConfig } from "@/components/ApiKeyConfig";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, Key, User, Shield, Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { Footer } from "@/components/Footer";

const Settings = () => {
  const { theme, toggleTheme } = useThemeToggle();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16 flex-grow">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <SettingsIcon className="text-primary" size={24} />
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>
          
          <Tabs defaultValue="api-keys" className="w-full">
            <TabsList className="w-full max-w-md grid grid-cols-3 mb-8">
              <TabsTrigger value="api-keys" className="data-[state=active]:bg-primary/20">
                <div className="flex items-center gap-2">
                  <Key size={16} />
                  <span>API Keys</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="data-[state=active]:bg-primary/20">
                <div className="flex items-center gap-2">
                  {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                  <span>Appearance</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-primary/20">
                <div className="flex items-center gap-2">
                  <Shield size={16} />
                  <span>Privacy</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="api-keys" className="animate-fade-in">
              <ApiKeyConfig />
            </TabsContent>
            
            <TabsContent value="appearance" className="animate-fade-in">
              <div className="glass-panel p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4">Appearance Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Toggle between light and dark theme
                      </p>
                    </div>
                    <Switch 
                      id="dark-mode" 
                      checked={theme === 'dark'}
                      onCheckedChange={toggleTheme}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="animations">Enable Animations</Label>
                      <p className="text-sm text-muted-foreground">
                        Show animations throughout the interface
                      </p>
                    </div>
                    <Switch id="animations" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="blur-effects">Blur Effects</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable blur effects for a modern look
                      </p>
                    </div>
                    <Switch id="blur-effects" defaultChecked />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="privacy" className="animate-fade-in">
              <div className="glass-panel p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4">Privacy Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="save-history">Save Watch History</Label>
                      <p className="text-sm text-muted-foreground">
                        Save your viewing history for better recommendations
                      </p>
                    </div>
                    <Switch id="save-history" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="analytics">Analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow anonymous usage data collection
                      </p>
                    </div>
                    <Switch id="analytics" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="cookies">Cookies</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow cookies for better experience
                      </p>
                    </div>
                    <Switch id="cookies" defaultChecked />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Settings;
