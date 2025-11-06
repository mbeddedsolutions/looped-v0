import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Phone, PhoneIncoming, PhoneOutgoing, Users, MoreVertical } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CallHistoryList({ calls, isLoading }) {
  const getCallIcon = (type) => {
    switch (type) {
      case 'incoming': return <PhoneIncoming className="w-4 h-4 text-green-600" />;
      case 'outgoing': return <PhoneOutgoing className="w-4 h-4 text-blue-600" />;
      case 'group': return <Users className="w-4 h-4 text-purple-600" />;
      default: return <Phone className="w-4 h-4" />;
    }
  };

  const getCallTypeColor = (type) => {
    switch (type) {
      case 'incoming': return 'bg-green-100 text-green-800 border-green-200';
      case 'outgoing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'group': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <Card className="shadow-lg border-none">
        <CardHeader>
          <CardTitle>Recent Calls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (calls.length === 0) {
    return (
      <Card className="shadow-lg border-none">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Phone className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No calls yet</h3>
          <p className="text-slate-500">Call history will appear here once your child starts making calls</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-none">
      <CardHeader>
        <CardTitle>Recent Calls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {calls.map((call) => (
          <div key={call.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                {getCallIcon(call.call_type)}
              </div>
              <div>
                <p className="font-medium text-slate-900">{call.contact_name}</p>
                <p className="text-sm text-slate-500">
                  {format(new Date(call.call_date), 'MMM d, HH:mm')} • {call.duration_minutes || 0} min
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className={`${getCallTypeColor(call.call_type)} border`}>
                {call.call_type === 'group' ? 'Group' : call.call_type}
              </Badge>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    Report Issue
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}