const API_BASE = "http://looped.local:3000/api";

// -------------------- Contacts --------------------
export const Contact = {
  list: async () => {
    const res = await fetch(`${API_BASE}/contacts`);
    return res.json();
  },
  create: async (data) => {
    const res = await fetch(`${API_BASE}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};

// -------------------- Phones --------------------
export const Phone = {
  list: async () => {
    const res = await fetch(`${API_BASE}/phones`);
    return res.json();
  },
};

// -------------------- Call History --------------------
export const CallHistory = {
  list: async () => {
    const res = await fetch(`${API_BASE}/calls`);
    return res.json();
  },
};

// -------------------- Subscription --------------------
export const Subscription = {
  get: async () => {
    const res = await fetch(`${API_BASE}/subscription`);
    return res.json();
  },
};

// -------------------- User --------------------
export const User = {
  get: async () => {
    const res = await fetch(`${API_BASE}/users/me`);
    return res.json();
  },
};
