import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Smartphone, QrCode, Hash } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function DeviceDiscovery({ onDeviceFound }) {
  const [isScanning, setIsScanning] = useState(false);
  const [foundDevices, setFoundDevices] = useState([]);
  const [manualCode, setManualCode] = useState("");

  const simulateDeviceDiscovery = async () => {
    setIsScanning(true);
    setFoundDevices([]);
    
    // Simulate discovery process
    setTimeout(() => {
      setFoundDevices([
        { id: "LP001234", name: "Looped Phone", signal: "Strong" },
        { id: "LP005678", name: "Looped Phone", signal: "Medium" }
      ]);
      setIsScanning(false);
    }, 3000);
  };

  const handleManualConnect = () => {
    if (manualCode.trim()) {
      onDeviceFound(manualCode.trim());
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="auto" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="auto">Auto Discover</TabsTrigger>
          <TabsTrigger value="qr">QR Code</TabsTrigger>
          <TabsTrigger value="manual">Manual Code</TabsTrigger>
        </TabsList>

        <TabsContent value="auto" className="space-y-4">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-slate-600">Searching for Looped phones on your network...</p>
            
            <Button 
              onClick={simulateDeviceDiscovery}
              disabled={isScanning}
              className="w-full"
            >
              {isScanning ? "Scanning..." : "Start Device Discovery"}
            </Button>

            {foundDevices.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-slate-900">Found Devices:</h4>
                {foundDevices.map((device) => (
                  <div 
                    key={device.id}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => onDeviceFound(device.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{device.name}</p>
                          <p className="text-sm text-slate-500">ID: {device.id}</p>
                        </div>
                      </div>
                      <span className="text-sm text-green-600 font-medium">{device.signal}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="qr" className="space-y-4">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
              <QrCode className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium">Scan QR Code</h4>
              <p className="text-sm text-slate-600">Look for the QR code on the phone's base or screen</p>
            </div>
            <Button 
              onClick={() => onDeviceFound("LP001234")} 
              className="w-full"
            >
              Open Camera to Scan
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <Hash className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium">Enter Device Code</h4>
              <p className="text-sm text-slate-600">Find the 8-character code on the phone's screen</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="device-code">Device Code</Label>
              <Input
                id="device-code"
                placeholder="e.g., LP001234"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                className="text-center font-mono text-lg"
                maxLength={8}
              />
            </div>
            
            <Button 
              onClick={handleManualConnect}
              disabled={manualCode.length !== 8}
              className="w-full"
            >
              Connect Phone
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <Alert>
        <AlertDescription>
          <strong>Troubleshooting:</strong> If you can't find the device, try power cycling the phone, moving closer to your router, or checking if the blinking light is blue.
        </AlertDescription>
      </Alert>
    </div>
  );
}