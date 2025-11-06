import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone, Wifi, Settings, Trash2 } from "lucide-react";

export default function PhoneSettings({ phones }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800 border-green-200';
      case 'offline': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  if (phones.length === 0) {
    return (
      <Card className="shadow-lg border-none">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Smartphone className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No phones added</h3>
          <p className="text-slate-500">Add your first phone to get started</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {phones.map((phone) => (
        <Card key={phone.id} className="shadow-lg border-none">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-blue-600" />
                <div>
                  <CardTitle className="text-lg">{phone.name}</CardTitle>
                  <p className="text-sm text-slate-500">Device ID: {phone.device_id}</p>
                </div>
              </div>
              <Badge className={`${getStatusColor(phone.status)} border`}>
                {phone.status}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`name-${phone.id}`}>Phone Name</Label>
                <Input
                  id={`name-${phone.id}`}
                  defaultValue={phone.name}
                  placeholder="e.g., Jack's Phone"
                />
              </div>
              <div className="space-y-2">
                <Label>Wi-Fi Network</Label>
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-md">
                  <Wifi className="w-4 h-4 text-slate-500" />
                  <span className="text-sm">{phone.wifi_network || 'Not connected'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-medium text-slate-900">Controls</h5>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Group Calls</p>
                  <p className="text-sm text-slate-500">Allow this phone to join group calls</p>
                </div>
                <Switch defaultChecked={phone.group_calls_enabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">School Mode</p>
                  <p className="text-sm text-slate-500">Restrict calls during school hours (9AM-3PM)</p>
                </div>
                <Switch defaultChecked={phone.school_mode_enabled} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`quiet-start-${phone.id}`}>Quiet Hours Start</Label>
                <Input
                  id={`quiet-start-${phone.id}`}
                  type="time"
                  defaultValue={phone.quiet_hours_start || "20:00"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`quiet-end-${phone.id}`}>Quiet Hours End</Label>
                <Input
                  id={`quiet-end-${phone.id}`}
                  type="time"
                  defaultValue={phone.quiet_hours_end || "07:00"}
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Settings className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
                <Trash2 className="w-4 h-4 mr-2" />
                Remove Phone
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}