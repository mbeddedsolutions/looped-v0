
import React, { useState, useEffect, useCallback } from "react";
import { CallHistory, Phone } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Phone as PhoneIcon, Users } from "lucide-react";

import CallHistoryList from "../components/calls/CallHistoryList";
import CallStats from "../components/calls/CallStats";

export default function CallHistoryPage() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const selectedPhoneId = urlParams.get('phone');
  
  const [callHistory, setCallHistory] = useState([]);
  const [phones, setPhones] = useState([]);
  const [currentPhoneId, setCurrentPhoneId] = useState(selectedPhoneId || '');
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const [callData, phoneData] = await Promise.all([
      CallHistory.list('-call_date'),
      Phone.list()
    ]);
    setCallHistory(callData);
    setPhones(phoneData);
    
    if (!currentPhoneId && phoneData.length > 0) {
      setCurrentPhoneId(phoneData[0].id);
    }
    setIsLoading(false);
  }, [currentPhoneId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const currentPhoneCalls = callHistory.filter(c => c.phone_id === currentPhoneId);
  const currentPhone = phones.find(p => p.id === currentPhoneId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to={createPageUrl("Dashboard")}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">Call History</h1>
            <p className="text-slate-600 mt-1">
              {currentPhone ? `Call activity for ${currentPhone.name}` : 'Monitor family call activity'}
            </p>
          </div>
        </div>

        {phones.length > 1 && (
          <div className="mb-6">
            <div className="flex gap-2 flex-wrap">
              {phones.map((phone) => (
                <Button
                  key={phone.id}
                  variant={currentPhoneId === phone.id ? "default" : "outline"}
                  onClick={() => setCurrentPhoneId(phone.id)}
                  className="flex items-center gap-2"
                >
                  <PhoneIcon className="w-4 h-4" />
                  {phone.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CallHistoryList 
              calls={currentPhoneCalls}
              isLoading={isLoading}
            />
          </div>
          
          <div>
            <CallStats 
              calls={currentPhoneCalls}
              phoneName={currentPhone?.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
