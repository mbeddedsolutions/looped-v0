import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Users, 
  Smartphone, 
  Phone, 
  MoreVertical, 
  Edit,
  UserMinus,
  PhoneCall
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const relationEmojis = {
  parent: "👨‍👩‍👧‍👦",
  grandparent: "👴👵",
  sibling: "👫",
  friend: "👥",
  family: "❤️",
  other: "👤"
};

export default function ContactList({ contacts, onEdit, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(3).fill(0).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <Card className="border-dashed border-2 border-slate-300">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No contacts yet</h3>
          <p className="text-slate-500 mb-4">Add family and friends to get started</p>
          <p className="text-sm text-slate-400">You have 5 free contacts available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <motion.div
          key={contact.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-xl">
                      {contact.emoji || relationEmojis[contact.relation] || "👤"}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{contact.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {contact.relation}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          contact.contact_type === 'kid_device' 
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-green-50 text-green-700 border-green-200'
                        }`}
                      >
                        {contact.contact_type === 'kid_device' ? (
                          <>
                            <Smartphone className="w-3 h-3 mr-1" />
                            Kid Device
                          </>
                        ) : (
                          <>
                            <Phone className="w-3 h-3 mr-1" />
                            Adult
                          </>
                        )}
                      </Badge>
                      {contact.status === 'pending' && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {contact.can_join_group_calls && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <PhoneCall className="w-3 h-3 mr-1" />
                      Group Calls
                    </Badge>
                  )}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(contact)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Contact
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <UserMinus className="w-4 h-4 mr-2" />
                        Remove Contact
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}