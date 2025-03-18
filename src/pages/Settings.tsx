
import { Navbar } from "@/components/Navbar";
import { ApiKeyConfig } from "@/components/ApiKeyConfig";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, Key, User, Shield } from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
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
              <TabsTrigger value="account" className="data-[state=active]:bg-primary/20">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>Account</span>
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
            
            <TabsContent value="account" className="animate-fade-in">
              <div className="glass-panel p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
                <p className="text-muted-foreground">Account settings will be available in the next update.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="privacy" className="animate-fade-in">
              <div className="glass-panel p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4">Privacy Settings</h2>
                <p className="text-muted-foreground">Privacy settings will be available in the next update.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
