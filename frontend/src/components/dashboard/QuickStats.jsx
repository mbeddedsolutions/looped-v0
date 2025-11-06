import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Users, Phone, Shield } from "lucide-react";

export default function QuickStats({ phones, contacts }) {
  const onlinePhones = phones.filter(p => p.status === 'online').length;
  const totalContacts = contacts.length;
  
  const stats = [
    {
      title: "Connected Phones",
      value: `${onlinePhones}/${phones.length}`,
      icon: Smartphone,
      color: "bg-green-500",
      description: "online"
    },
    {
      title: "Total Contacts",
      value: totalContacts,
      icon: Users,
      color: "bg-blue-500",
      description: `${5 - totalContacts} free slots left`
    },
    {
      title: "This Week",
      value: "0 calls",
      icon: Phone,
      color: "bg-purple-500",
      description: "call activity"
    },
    {
      title: "Safety Status",
      value: "Protected",
      icon: Shield,
      color: "bg-emerald-500",
      description: "all devices secure"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                <CardTitle className="text-2xl font-bold mt-2 text-slate-900">
                  {stat.value}
                </CardTitle>
                <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.color} bg-opacity-20`}>
                <stat.icon className={`w-5 h-5 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}