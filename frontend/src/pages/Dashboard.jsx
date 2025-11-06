import React, { useState, useEffect } from "react";
import { Phone, Contact, CallHistory } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Plus, Smartphone, Phone as PhoneIcon } from "lucide-react";

import PhoneCard from "../components/dashboard/PhoneCard";
import EmptyState from "../components/dashboard/EmptyState";
import QuickStats from "../components/dashboard/QuickStats";
import RecentCallHistory from "../components/dashboard/RecentCallHistory";

export default function Dashboard() {
  const [phones, setPhones] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [callHistory, setCallHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const [phoneData, contactData, callData] = await Promise.all([
      Phone.list('-created_date'),
      Contact.list(),
      CallHistory.list('-call_date', 10)
    ]);
    setPhones(phoneData);
    setContacts(contactData);
    setCallHistory(callData);
    setIsLoading(false);
  };

  if (phones.length === 0 && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Family Dashboard</h1>
            <p className="text-slate-600 mt-1">Monitor and manage your family's connected phones</p>
          </div>
          <Link to={createPageUrl("Setup")} className="w-full md:w-auto">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg">
              <Plus className="w-5 h-5 mr-2" />
              Add New Phone
            </Button>
          </Link>
        </div>

        <QuickStats phones={phones} contacts={contacts} />

        <div className="space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Smartphone className="w-6 h-6 text-slate-600" />
              <h2 className="text-xl font-semibold text-slate-900">Connected Phones</h2>
              <span className="text-sm text-slate-500">({phones.length})</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {phones.map((phone) => (
                <PhoneCard 
                  key={phone.id} 
                  phone={phone} 
                  contacts={contacts.filter(c => c.phone_id === phone.id)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <PhoneIcon className="w-6 h-6 text-slate-600" />
              <h2 className="text-xl font-semibold text-slate-900">Recent Call Activity</h2>
            </div>
            <RecentCallHistory calls={callHistory} phones={phones} />
          </div>
        </div>
      </div>
    </div>
  );
}