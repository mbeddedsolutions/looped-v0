import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Smartphone, Shield, Heart } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="max-w-md mx-auto text-center">
        <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-xl">
          <Shield className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Welcome to Looped
        </h1>
        
        <p className="text-slate-600 mb-8 leading-relaxed">
          Keep your family connected safely. Start by adding your child's phone to monitor calls and manage contacts.
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-green-600" />
            </div>
            <span>Easy phone pairing with Wi-Fi setup</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-blue-600" />
            </div>
            <span>5 free contacts to get you started</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-purple-600" />
            </div>
            <span>Safe, encrypted family communication</span>
          </div>
        </div>

        <Link to={createPageUrl("Setup")} className="w-full">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg py-6 shadow-xl">
            <Smartphone className="w-6 h-6 mr-3" />
            Add Your First Phone
          </Button>
        </Link>

        <p className="text-xs text-slate-500 mt-6">
          No credit card required • 5 free contacts included
        </p>
      </div>
    </div>
  );
}