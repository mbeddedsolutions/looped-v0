import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Phone, UserPlus, CreditCard, WifiOff } from "lucide-react";

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    callStarted: true,
    callEnded: false,
    contactRequest: true,
    subscriptionIssues: true,
    deviceOffline: true,
    quietHours: false
  });

  const handleToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationOptions = [
    {
      key: "callStarted",
      title: "Call Started",
      description: "Get notified when a call begins",
      icon: Phone
    },
    {
      key: "callEnded", 
      title: "Call Ended",
      description: "Get notified when a call ends",
      icon: Phone
    },
    {
      key: "contactRequest",
      title: "Contact Requests",
      description: "New contact requests received/approved",
      icon: UserPlus
    },
    {
      key: "subscriptionIssues",
      title: "Billing Issues",
      description: "Payment failures or subscription changes",
      icon: CreditCard
    },
    {
      key: "deviceOffline",
      title: "Device Offline",
      description: "When a phone has been offline for over 24 hours",
      icon: WifiOff
    }
  ];

  return (
    <Card className="shadow-lg border-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notification Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {notificationOptions.map((option) => (
          <div key={option.key} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <option.icon className="w-5 h-5 text-slate-500" />
              <div>
                <Label className="font-medium">{option.title}</Label>
                <p className="text-sm text-slate-500">{option.description}</p>
              </div>
            </div>
            <Switch
              checked={notifications[option.key]}
              onCheckedChange={() => handleToggle(option.key)}
            />
          </div>
        ))}

        <div className="pt-4 border-t">
          <p className="text-sm text-slate-500">
            Notifications respect quiet hours settings for each phone
          </p>
        </div>
      </CardContent>
    </Card>
  );
}