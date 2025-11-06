
import React, { useState, useEffect, useCallback } from "react";
import { Phone, Contact } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Smartphone, Wifi, Users, Settings, Shield } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";

export default function PhoneDetails() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const phoneId = urlParams.get('id');
  
  const [phone, setPhone] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadData = useCallback(async () => {
    if (!phoneId) return;
    
    setIsLoading(true);
    const [phoneData, contactData] = await Promise.all([
      Phone.filter({ id: phoneId }),
      Contact.filter({ phone_id: phoneId })
    ]);
    
    if (phoneData.length > 0) {
      setPhone(phoneData[0]);
    }
    setContacts(contactData);
    setIsLoading(false);
  }, [phoneId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSave = async () => {
    if (!phone) return;
    
    setIsSaving(true);
    await Phone.update(phone.id, phone);
    setIsSaving(false);
  };

  const updatePhone = (field, value) => {
    setPhone(prev => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800 border-green-200';
      case 'offline': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded w-1/3"></div>
            <div className="h-64 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!phone) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Phone not found</h1>
          <Link to={createPageUrl("Dashboard")}>
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to={createPageUrl("Dashboard")}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{phone.name}</h1>
            <p className="text-slate-600 mt-1">Manage settings and controls for this device</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Phone Status Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-none shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">{phone.name}</CardTitle>
                  <Badge className={`${getStatusColor(phone.status)} border mt-1`}>
                    {phone.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Device ID:</span>
                  <span className="font-mono text-sm">{phone.device_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Wi-Fi:</span>
                  <span className="flex items-center gap-1">
                    <Wifi className="w-4 h-4" />
                    {phone.wifi_network || 'Not connected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Contacts:</span>
                  <span>{contacts.length}</span>
                </div>
                {phone.last_seen && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Last Seen:</span>
                    <span>{format(new Date(phone.last_seen), 'MMM d, HH:mm')}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-xl border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Phone Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phone-name">Phone Name</Label>
                  <Input
                    id="phone-name"
                    value={phone.name}
                    onChange={(e) => updatePhone('name', e.target.value)}
                    placeholder="e.g., Jack's Phone"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quiet-start">Quiet Hours Start</Label>
                    <Input
                      id="quiet-start"
                      type="time"
                      value={phone.quiet_hours_start || "20:00"}
                      onChange={(e) => updatePhone('quiet_hours_start', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quiet-end">Quiet Hours End</Label>
                    <Input
                      id="quiet-end"
                      type="time"
                      value={phone.quiet_hours_end || "07:00"}
                      onChange={(e) => updatePhone('quiet_hours_end', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium">Group Calls</p>
                      <p className="text-sm text-slate-500">Allow this phone to join group calls</p>
                    </div>
                    <Switch
                      checked={phone.group_calls_enabled}
                      onCheckedChange={(checked) => updatePhone('group_calls_enabled', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium">School Mode</p>
                      <p className="text-sm text-slate-500">Restrict calls during school hours (9AM-3PM)</p>
                    </div>
                    <Switch
                      checked={phone.school_mode_enabled}
                      onCheckedChange={(checked) => updatePhone('school_mode_enabled', checked)}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>

            {/* Safety Notice */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Emergency Contacts Always Available</p>
                    <p className="text-sm text-green-700">999 emergency number is always accessible, even during quiet hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
