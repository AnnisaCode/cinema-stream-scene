import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import AnimeList from "./AnimeList";

export const ApiKeyConfig = () => {
  const [apiName, setApiName] = useState("");

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="glass-panel p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <span>API Configuration</span>
        </h2>

        <div className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="api-name">API Name</Label>
              <Input
                id="api-name"
                placeholder="E.g., MyAnimeList API"
                value={apiName}
                onChange={(e) => setApiName(e.target.value)}
                className="bg-secondary/50"
              />
            </div>
          </div>

          <Button onClick={() => toast({ title: "Info", description: "API name saved!" })} className="w-full">
            Save API Name
          </Button>
        </div>
      </div>

      <AnimeList />
    </div>
  );
};
