// src/api/base44client.js
// Local replacement for @base44/sdk

console.log("Running in LOCAL MODE — Base44 API disabled.");

export const base44 = {
  entities: {},
  integrations: {},
  auth: {
    currentUser: {
      id: "local-user-001",
      name: "Offline Mode User",
      email: "offline@example.com",
    },
    signIn: async () => ({ message: "Local sign-in (mock)" }),
    signOut: async () => ({ message: "Local sign-out (mock)" }),
  },
};
