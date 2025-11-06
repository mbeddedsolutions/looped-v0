
import React, { useState, useEffect, useCallback } from "react";
import { Contact, Phone } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Users, Plus, Crown } from "lucide-react";

import ContactList from "../components/contacts/ContactList";
import ContactForm from "../components/contacts/ContactForm";
import UpgradePrompt from "../components/contacts/UpgradePrompt";

export default function Contacts() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const selectedPhoneId = urlParams.get('phone');
  
  const [contacts, setContacts] = useState([]);
  const [phones, setPhones] = useState([]);
  const [currentPhoneId, setCurrentPhoneId] = useState(selectedPhoneId || '');
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const [contactData, phoneData] = await Promise.all([
      Contact.list('-created_date'),
      Phone.list()
    ]);
    setContacts(contactData);
    setPhones(phoneData);
    
    if (!currentPhoneId && phoneData.length > 0) {
      setCurrentPhoneId(phoneData[0].id);
    }
    setIsLoading(false);
  }, [currentPhoneId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const currentPhoneContacts = contacts.filter(c => c.phone_id === currentPhoneId);
  const totalContacts = contacts.length; // Total across all phones
  const canAddMoreContacts = totalContacts < 5; // Check global limit

  const handleAddContact = () => {
    if (!canAddMoreContacts) {
      setShowUpgrade(true);
      return;
    }
    setShowForm(true);
  };

  const handleSaveContact = async (contactData) => {
    const dataWithPhone = { ...contactData, phone_id: currentPhoneId };
    
    if (editingContact) {
      await Contact.update(editingContact.id, dataWithPhone);
    } else {
      await Contact.create(dataWithPhone);
    }
    
    setShowForm(false);
    setEditingContact(null);
    loadData();
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const currentPhone = phones.find(p => p.id === currentPhoneId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to={createPageUrl("Dashboard")}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">Contacts</h1>
            <p className="text-slate-600 mt-1">
              {currentPhone ? `Managing contacts for ${currentPhone.name}` : 'Manage your family contacts'}
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
                  <Users className="w-4 h-4" />
                  {phone.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Contacts ({currentPhoneContacts.length} on this phone, {totalContacts}/5 total)
              </h2>
              <p className="text-sm text-slate-500">
                {canAddMoreContacts 
                  ? `${5 - totalContacts} free contacts remaining across all household phones`
                  : 'Contact limit reached across all phones - upgrade for unlimited contacts'
                }
              </p>
            </div>
            <Button 
              onClick={handleAddContact}
              className={canAddMoreContacts ? "bg-blue-600 hover:bg-blue-700" : "bg-amber-600 hover:bg-amber-700"}
            >
              {canAddMoreContacts ? (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Contact
                </>
              ) : (
                <>
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Add More
                </>
              )}
            </Button>
          </div>

          {showForm && (
            <ContactForm
              contact={editingContact}
              onSave={handleSaveContact}
              onCancel={() => {
                setShowForm(false);
                setEditingContact(null);
              }}
            />
          )}

          <ContactList 
            contacts={currentPhoneContacts}
            onEdit={handleEditContact}
            isLoading={isLoading}
          />
        </div>
      </div>

      {showUpgrade && (
        <UpgradePrompt 
          onClose={() => setShowUpgrade(false)}
          onUpgrade={() => {
            setShowUpgrade(false);
            // Navigate to subscription page
          }}
        />
      )}
    </div>
  );
}
