// src/api/integrations.js
export const Core = {
  InvokeLLM: async (prompt) => ({
    output: `LLM mock response for: "${prompt}"`,
  }),
  SendEmail: async ({ to, subject }) => ({
    status: "success",
    message: `Pretend sent email to ${to} (${subject})`,
  }),
  UploadFile: async (file) => ({
    url: `/mock/uploads/${file.name}`,
  }),
  GenerateImage: async (prompt) => ({
    url: `/mock/generated/${encodeURIComponent(prompt)}.png`,
  }),
  ExtractDataFromUploadedFile: async () => ({
    data: { key: "value", example: 123 },
  }),
  CreateFileSignedUrl: async (fileName) => ({
    url: `/mock/signed/${fileName}`,
  }),
  UploadPrivateFile: async (file) => ({
    status: "ok",
    path: `/mock/private/${file.name}`,
  }),
};
