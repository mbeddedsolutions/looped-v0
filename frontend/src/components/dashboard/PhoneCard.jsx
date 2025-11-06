import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Wifi, 
  Users, 
  Settings, 
  Circle,
  WifiOff,
  Phone,
  UserPlus
} from "lucide-react";
import { format } from "date-fns";

export default function PhoneCard({ phone, contacts = [] }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800 border-green-200';
      case 'offline': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'setup': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return <Circle className="w-3 h-3 fill-green-500 text-green-500" />;
      case 'offline': return <WifiOff className="w-4 h-4 text-gray-500" />;
      default: return <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500" />;
    }
  };

  return (
    <Card className="bg-white border-none shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold text-slate-900">{phone.name}</CardTitle>
            <p className="text-sm text-slate-500 mt-1">Device ID: {phone.device_id}</p>
          </div>
          <Badge className={`${getStatusColor(phone.status)} border`}>
            <div className="flex items-center gap-1">
              {getStatusIcon(phone.status)}
              {phone.status}
            </div>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Wi-Fi Network:</span>
            <span className="font-medium text-slate-900 flex items-center gap-1">
              <Wifi className="w-4 h-4" />
              {phone.wifi_network || 'Not connected'}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Contacts:</span>
            <span className="font-medium text-slate-900">{contacts.length}</span>
          </div>

          {phone.last_seen && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Last Seen:</span>
              <span className="font-medium text-slate-900">
                {format(new Date(phone.last_seen), 'MMM d, HH:mm')}
              </span>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-100 flex gap-2">
          <Link to={createPageUrl(`Contacts?phone=${phone.id}`)} className="flex-1">
            <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300">
              <UserPlus className="w-4 h-4 mr-2" />
              Contacts
            </Button>
          </Link>
          
          <Link to={createPageUrl(`CallHistory?phone=${phone.id}`)} className="flex-1">
            <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300">
              <Phone className="w-4 h-4 mr-2" />
              Calls
            </Button>
          </Link>
        </div>

        <Link to={createPageUrl(`PhoneDetails?id=${phone.id}`)} className="block">
          <Button variant="ghost" className="w-full text-slate-500 hover:text-slate-700 hover:bg-slate-100">
            <Settings className="w-4 h-4 mr-2" />
            Phone Settings
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}