import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneIncoming, PhoneOutgoing, Users, ArrowRight } from "lucide-react";
import { format } from "date-fns";

export default function RecentCallHistory({ calls, phones }) {
  const getCallIcon = (type) => {
    switch (type) {
      case 'incoming': return <PhoneIncoming className="w-4 h-4 text-green-600" />;
      case 'outgoing': return <PhoneOutgoing className="w-4 h-4 text-blue-600" />;
      case 'group': return <Users className="w-4 h-4 text-purple-600" />;
      default: return <PhoneOutgoing className="w-4 h-4" />;
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

  const getPhoneName = (phoneId) => {
    const phone = phones.find(p => p.id === phoneId);
    return phone?.name || 'Unknown Phone';
  };

  if (calls.length === 0) {
    return (
      <Card className="shadow-lg border-none">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <PhoneOutgoing className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No recent calls</h3>
          <p className="text-slate-500">Call activity will appear here once your family starts making calls</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activity</CardTitle>
        <Link to={createPageUrl("CallHistory")}>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {calls.slice(0, 5).map((call) => (
          <div key={call.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                {getCallIcon(call.call_type)}
              </div>
              <div>
                <p className="font-medium text-slate-900">{call.contact_name}</p>
                <p className="text-sm text-slate-500">
                  {getPhoneName(call.phone_id)} • {format(new Date(call.call_date), 'MMM d, HH:mm')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">{call.duration_minutes || 0} min</span>
              <Badge className={`${getCallTypeColor(call.call_type)} border text-xs`}>
                {call.call_type === 'group' ? 'Group' : call.call_type}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}