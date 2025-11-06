import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wifi, Lock, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function WiFiSetup({ onWiFiConnected }) {
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");

  const availableNetworks = [
    { name: "HomeNetwork_5G", signal: "Strong", secured: true },
    { name: "HomeNetwork_2.4G", signal: "Strong", secured: true },
    { name: "Guest_Network", signal: "Medium", secured: false },
    { name: "Neighbor_WiFi", signal: "Weak", secured: true }
  ];

  const handleConnect = async () => {
    setIsConnecting(true);
    setError("");

    // Simulate connection process
    setTimeout(() => {
      if (password === "wrongpassword") {
        setError("Incorrect Wi-Fi password. Please try again.");
        setIsConnecting(false);
      } else {
        onWiFiConnected(selectedNetwork);
        setIsConnecting(false);
      }
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Wifi className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Connect to Wi-Fi</h3>
        <p className="text-slate-600">Select your home network to connect the phone</p>
      </div>

      <div className="space-y-3">
        <Label>Available Networks</Label>
        {availableNetworks.map((network) => (
          <div
            key={network.name}
            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedNetwork === network.name 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-slate-200 hover:border-slate-300'
            }`}
            onClick={() => setSelectedNetwork(network.name)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wifi className="w-5 h-5 text-slate-600" />
                <div>
                  <p className="font-medium">{network.name}</p>
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    {network.secured && <Lock className="w-3 h-3" />}
                    {network.signal} signal
                  </p>
                </div>
              </div>
              {selectedNetwork === network.name && (
                <div className="w-4 h-4 bg-blue-600 rounded-full" />
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedNetwork && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wifi-password">Wi-Fi Password</Label>
            <div className="relative">
              <Input
                id="wifi-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Wi-Fi password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleConnect}
            disabled={!password.trim() || isConnecting}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isConnecting ? "Connecting..." : "Connect to Network"}
          </Button>
        </div>
      )}
    </div>
  );
}