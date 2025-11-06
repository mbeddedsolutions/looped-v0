import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Smartphone, Phone, X } from "lucide-react";

const relationOptions = [
  { value: "parent", label: "Parent", emoji: "👨‍👩‍👧‍👦" },
  { value: "grandparent", label: "Grandparent", emoji: "👴👵" },
  { value: "sibling", label: "Sibling", emoji: "👫" },
  { value: "friend", label: "Friend", emoji: "👥" },
  { value: "family", label: "Family", emoji: "❤️" },
  { value: "other", label: "Other", emoji: "👤" }
];

const avatarOptions = [
  "👨", "👩", "👴", "👵", "👦", "👧", "👶", "🧑‍🦳", "🧑‍🦰", "🧑‍🦱", "🧑‍🦲", "👨‍🦳", "👨‍🦰", "👨‍🦱", "👨‍🦲",
  "👩‍🦳", "👩‍🦰", "👩‍🦱", "👩‍🦲", "🤶", "🎅", "👼", "🧚", "🦸‍♀️", "🦸‍♂️", "👑", "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁"
];

export default function ContactForm({ contact, onSave, onCancel }) {
  const [formData, setFormData] = useState(contact || {
    name: "",
    relation: "family",
    contact_type: "trusted_adult",
    phone_number: "",
    device_id: "",
    can_join_group_calls: true,
    emoji: "👤"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="shadow-xl border-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-blue-600" />
          {contact ? "Edit Contact" : "Add New Contact"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Contact Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="e.g., Grandma Sarah"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Choose Avatar/Emoji</Label>
            <div className="grid grid-cols-8 gap-2 p-4 border rounded-lg bg-slate-50 max-h-32 overflow-y-auto">
              {avatarOptions.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleInputChange("emoji", emoji)}
                  className={`p-2 text-2xl hover:bg-white rounded-lg transition-colors ${
                    formData.emoji === emoji ? 'bg-white border-2 border-blue-500' : 'hover:bg-white'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <p className="text-sm text-slate-500">Selected: <span className="text-2xl">{formData.emoji}</span></p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="relation">Relation</Label>
            <Select
              value={formData.relation}
              onValueChange={(value) => handleInputChange("relation", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {relationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <span>{option.emoji}</span>
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Tabs 
            value={formData.contact_type} 
            onValueChange={(value) => handleInputChange("contact_type", value)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="trusted_adult">
                <Phone className="w-4 h-4 mr-2" />
                Trusted Adult
              </TabsTrigger>
              <TabsTrigger value="kid_device">
                <Smartphone className="w-4 h-4 mr-2" />
                Another Kid's Phone
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trusted_adult" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone_number}
                  onChange={(e) => handleInputChange("phone_number", e.target.value)}
                  placeholder="+44 7700 900123"
                />
              </div>
            </TabsContent>

            <TabsContent value="kid_device" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="device">Device ID or Invite Link</Label>
                <Input
                  id="device"
                  value={formData.device_id}
                  onChange={(e) => handleInputChange("device_id", e.target.value)}
                  placeholder="LP001234 or invite link"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Group Calls</Label>
              <p className="text-xs text-slate-500">Allow this contact to join group calls</p>
            </div>
            <Switch
              checked={formData.can_join_group_calls}
              onCheckedChange={(checked) => handleInputChange("can_join_group_calls", checked)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {contact ? "Update Contact" : "Save Contact"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}