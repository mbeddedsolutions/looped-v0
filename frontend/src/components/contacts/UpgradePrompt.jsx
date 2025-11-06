import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, X, Check, Users, Shield, Headphones } from "lucide-react";
import { motion } from "framer-motion";

export default function UpgradePrompt({ onClose, onUpgrade }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <Card className="w-full max-w-lg bg-white shadow-2xl border-none">
          <CardHeader className="text-center relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
            
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            
            <CardTitle className="text-2xl font-bold">
              Upgrade to Premium
            </CardTitle>
            <p className="text-slate-600">Unlock unlimited contacts and premium features</p>
            
            <div className="flex justify-center mt-4">
              <Badge className="bg-amber-100 text-amber-800 border-amber-200 px-4 py-1">
                Contact limit reached (5/5)
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Unlimited Contacts</p>
                  <p className="text-sm text-slate-500">Add as many family & friends as you need</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Advanced Safety Controls</p>
                  <p className="text-sm text-slate-500">Enhanced monitoring & parental controls</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Headphones className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Priority Support</p>
                  <p className="text-sm text-slate-500">Get help when you need it most</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">Premium Monthly</p>
                  <p className="text-sm text-slate-500">Cancel anytime</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">£9.99</p>
                  <p className="text-sm text-slate-500">/month</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Not Now
              </Button>
              <Button onClick={onUpgrade} className="flex-1 bg-amber-600 hover:bg-amber-700">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade Now
              </Button>
            </div>

            <p className="text-xs text-slate-400 text-center">
              Secure payment • Cancel anytime • 30-day money back guarantee
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}