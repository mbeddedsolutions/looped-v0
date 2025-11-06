import React, { useState } from "react";
import { Phone } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Smartphone, Wifi, CheckCircle, QrCode, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

import SetupSteps from "../components/setup/SetupSteps";
import DeviceDiscovery from "../components/setup/DeviceDiscovery";
import WiFiSetup from "../components/setup/WiFiSetup";

export default function Setup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [phoneData, setPhoneData] = useState({
    name: "",
    device_id: "",
    wifi_network: "",
    status: "setup"
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSavePhone = async () => {
    setIsProcessing(true);
    try {
      await Phone.create({
        ...phoneData,
        status: "online",
        last_seen: new Date().toISOString()
      });
      navigate(createPageUrl("Dashboard"));
    } catch (error) {
      console.error("Error saving phone:", error);
    }
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to={createPageUrl("Dashboard")}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Add New Phone</h1>
            <p className="text-slate-600 mt-1">Set up a secure connection to your child's device</p>
          </div>
        </div>

        <SetupSteps currentStep={currentStep} />

        <Card className="bg-white shadow-xl border-none">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl">
              {currentStep === 1 && "Prepare the Phone"}
              {currentStep === 2 && "Find Your Device"}
              {currentStep === 3 && "Connect to Wi-Fi"}
              {currentStep === 4 && "Name Your Phone"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <Smartphone className="w-10 h-10 text-blue-600" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Get the phone ready</h3>
                  <div className="text-left space-y-2 max-w-md mx-auto">
                    <p className="text-slate-600">1. Plug the child's phone into power</p>
                    <p className="text-slate-600">2. Wait for the blinking light indicator</p>
                    <p className="text-slate-600">3. Make sure both devices are on the same Wi-Fi</p>
                  </div>
                  <Alert>
                    <AlertDescription>
                      The phone should show a blinking blue light when ready for pairing.
                    </AlertDescription>
                  </Alert>
                </div>
                <Button 
                  onClick={handleNext} 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Phone is Ready - Start Pairing
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <DeviceDiscovery onDeviceFound={(deviceId) => {
                setPhoneData(prev => ({ ...prev, device_id: deviceId }));
                handleNext();
              }} />
            )}

            {currentStep === 3 && (
              <WiFiSetup onWiFiConnected={(network) => {
                setPhoneData(prev => ({ ...prev, wifi_network: network }));
                handleNext();
              }} />
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Almost Done!</h3>
                  <p className="text-slate-600">Give this phone a name so you can easily identify it</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="phone-name">Phone Name</Label>
                    <Input
                      id="phone-name"
                      placeholder="e.g., Jack's Phone"
                      value={phoneData.name}
                      onChange={(e) => setPhoneData(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1"
                    />
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Device ID:</span>
                      <span className="font-mono text-slate-900">{phoneData.device_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Wi-Fi Network:</span>
                      <span className="text-slate-900">{phoneData.wifi_network}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={handleSavePhone}
                    disabled={!phoneData.name.trim() || isProcessing}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {isProcessing ? "Setting up..." : "Complete Setup"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}