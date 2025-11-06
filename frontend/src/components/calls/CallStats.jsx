import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Clock, Users, TrendingUp } from "lucide-react";

export default function CallStats({ calls, phoneName }) {
  const totalCalls = calls.length;
  const totalMinutes = calls.reduce((sum, call) => sum + (call.duration_minutes || 0), 0);
  const groupCalls = calls.filter(call => call.call_type === 'group').length;
  const averageCallLength = totalCalls > 0 ? (totalMinutes / totalCalls).toFixed(1) : 0;

  const stats = [
    {
      title: "Total Calls",
      value: totalCalls,
      icon: Phone,
      color: "text-blue-600"
    },
    {
      title: "Total Minutes",
      value: totalMinutes,
      icon: Clock,
      color: "text-green-600"
    },
    {
      title: "Group Calls",
      value: groupCalls,
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Avg Duration",
      value: `${averageCallLength} min`,
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-4">
      <Card className="shadow-lg border-none">
        <CardHeader>
          <CardTitle className="text-lg">Call Statistics</CardTitle>
          {phoneName && (
            <p className="text-sm text-slate-500">for {phoneName}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.title} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-slate-700">{stat.title}</span>
              </div>
              <span className="font-semibold text-slate-900">{stat.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-lg border-none">
        <CardHeader>
          <CardTitle className="text-lg">This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Monday</span>
              <span className="font-medium">2 calls, 15 min</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Tuesday</span>
              <span className="font-medium">0 calls</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Today</span>
              <span className="font-medium text-blue-600">1 call, 8 min</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}