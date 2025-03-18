import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { ApiConfig } from "@/lib/types";
import { Check, Copy, Eye, EyeOff, Key } from "lucide-react";
import { cn } from "@/lib/utils";

const LOCAL_STORAGE_KEY = "stream_vibe_api_keys";

export const ApiKeyConfig = () => {
  const [apiKey, setApiKey] = useState("");
  const [apiName, setApiName] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [savedApiKeys, setSavedApiKeys] = useState<ApiConfig[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    // Load saved API keys from localStorage
    const savedKeys = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedKeys) {
      setSavedApiKeys(JSON.parse(savedKeys));
    }
  }, []);

  const saveApiKey = () => {
    if (!apiKey.trim() || !apiName.trim()) {
      toast({
        title: "Error",
        description: "Please enter both API key and name",
        variant: "destructive",
      });
      return;
    }

    const newApiConfig: ApiConfig = {
      key: apiKey,
      name: apiName,
      isActive: true,
    };

    const updatedKeys = [...savedApiKeys, newApiConfig];
    setSavedApiKeys(updatedKeys);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedKeys));

    setApiKey("");
    setApiName("");
    setShowApiKey(false);

    toast({
      title: "Success",
      description: "API key has been saved",
    });
  };

  const toggleApiStatus = (index: number) => {
    const updatedKeys = [...savedApiKeys];
    updatedKeys[index].isActive = !updatedKeys[index].isActive;
    setSavedApiKeys(updatedKeys);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedKeys));
  };

  const deleteApiKey = (index: number) => {
    const updatedKeys = [...savedApiKeys];
    updatedKeys.splice(index, 1);
    setSavedApiKeys(updatedKeys);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedKeys));

    toast({
      title: "Deleted",
      description: "API key has been removed",
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="glass-panel p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Key className="text-primary" size={20} />
          <span>API Key Configuration</span>
        </h2>

        <div className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="api-name">API Name</Label>
              <Input
                id="api-name"
                placeholder="E.g., TMDB API, Anilist API"
                value={apiName}
                onChange={(e) => setApiName(e.target.value)}
                className="bg-secondary/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="relative">
                <Input
                  id="api-key"
                  type={showApiKey ? "text" : "password"}
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="pr-10 bg-secondary/50"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <Button onClick={saveApiKey} className="w-full">
            Save API Key
          </Button>
        </div>
      </div>

      {savedApiKeys.length > 0 && (
        <div className="glass-panel p-6 rounded-xl">
          <h3 className="text-xl font-medium mb-4">Saved API Keys</h3>
          <div className="space-y-4">
            {savedApiKeys.map((config, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 rounded-lg border transition-all duration-300",
                  config.isActive
                    ? "border-primary/30 bg-primary/5"
                    : "border-muted bg-card/50 opacity-70"
                )}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">{config.name}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={config.isActive}
                        onCheckedChange={() => toggleApiStatus(index)}
                        id={`api-status-${index}`}
                      />
                      <Label
                        htmlFor={`api-status-${index}`}
                        className="text-sm text-muted-foreground"
                      >
                        {config.isActive ? "Active" : "Inactive"}
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <div className="relative max-w-[240px]">
                    <Input
                      readOnly
                      type={showApiKey ? "text" : "password"}
                      value={config.key}
                      className="pr-10 text-sm bg-card/50"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => copyToClipboard(config.key, `key-${index}`)}
                    >
                      {copied === `key-${index}` ? (
                        <Check size={14} className="text-green-500" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => deleteApiKey(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
