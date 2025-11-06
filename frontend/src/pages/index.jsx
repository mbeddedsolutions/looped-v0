import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import Setup from "./Setup";

import Contacts from "./Contacts";

import CallHistory from "./CallHistory";

import Settings from "./Settings";

import PhoneDetails from "./PhoneDetails";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Dashboard: Dashboard,
    
    Setup: Setup,
    
    Contacts: Contacts,
    
    CallHistory: CallHistory,
    
    Settings: Settings,
    
    PhoneDetails: PhoneDetails,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Dashboard />} />
                
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/Setup" element={<Setup />} />
                
                <Route path="/Contacts" element={<Contacts />} />
                
                <Route path="/CallHistory" element={<CallHistory />} />
                
                <Route path="/Settings" element={<Settings />} />
                
                <Route path="/PhoneDetails" element={<PhoneDetails />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}