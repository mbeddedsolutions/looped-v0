
import React, { useState, useEffect } from "react";
import { User, Phone } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  User as UserIcon, 
  Shield, 
  Bell, 
  CreditCard,
  Smartphone,
  Crown,
  LogOut
} from "lucide-react";

import PhoneSettings from "../components/settings/PhoneSettings";
import NotificationSettings from "../components/settings/NotificationSettings";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [phones, setPhones] = useState([]);
  const [activeTab, setActiveTab] = useState("account");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [userData, phoneData] = await Promise.all([
        User.me(),
        Phone.list()
      ]);
      setUser(userData);
      setPhones(phoneData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await User.logout();
  };

  const tabs = [
    { id: "account", label: "Account", icon: UserIcon },
    { id: "phones", label: "Devices", icon: Smartphone },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "subscription", label: "Subscription", icon: Crown },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
              <p className="text-slate-600 mt-1">Manage your account and family preferences</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-lg">Settings</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {tabs.map((tab) => (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? "default" : "ghost"}
                      className="w-full justify-start gap-3"
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            {activeTab === "account" && (
              <Card className="shadow-lg border-none">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        defaultValue={user?.full_name || ""}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user?.email || ""}
                        placeholder="your@email.com"
                        disabled
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900">Privacy & Security</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Biometric Lock</p>
                        <p className="text-sm text-slate-500">Require fingerprint/face to access app</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Data Encryption</p>
                        <p className="text-sm text-slate-500">End-to-end encryption enabled</p>
                      </div>
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                  </div>

                  <Separator />

                  <Button variant="destructive" onClick={handleLogout} className="w-full">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "phones" && (
              <PhoneSettings phones={phones} />
            )}

            {activeTab === "notifications" && (
              <NotificationSettings />
            )}

            {activeTab === "subscription" && (
              <Card className="shadow-lg border-none">
                <CardHeader>
                  <CardTitle>Subscription</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-6 border border-amber-200">
                    <div className="flex items-center gap-4">
                      <Crown className="w-8 h-8 text-amber-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-amber-900">Free Plan</h3>
                        <p className="text-amber-700">5 contacts total across all household phones • Basic features</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Contact Limit Explained</h4>
                    <p className="text-sm text-blue-800">
                      The 5 free contacts limit applies to your entire household. For example, if you have 3 connected phones, 
                      once you've added a total of 5 contacts across all phones combined, you'll need to upgrade to add more.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Upgrade Benefits</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        Unlimited contacts on all phones
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        Priority customer support
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        Enhanced family safety features
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        Detailed call analytics and reporting
                      </li>
                    </ul>
                  </div>

                  <Button className="w-full bg-amber-600 hover:bg-amber-700">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade to Premium - £9.99/month
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
