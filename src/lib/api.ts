import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const apiClient = {
  // Processes
  createProcess: async (data: { name: string; description: string }) => {
    const response = await api.post("/processes", data);
    return response.data.data;
  },

  getProcesses: async () => {
    const response = await api.get("/processes");
    return response.data.data;
  },

  getProcess: async (id: string) => {
    const response = await api.get(`/processes/${id}`);
    return response.data.data;
  },

  updateProcess: async (id: string, data: { name?: string; description?: string }) => {
    const response = await api.put(`/processes/${id}`, data);
    return response.data.data;
  },

  deleteProcess: async (id: string) => {
    const response = await api.delete(`/processes/${id}`);
    return response.data.data;
  },

  // Analysis
  analyzeProcess: async (processId: string) => {
    const response = await api.post(`/processes/${processId}/analyze`);
    return response.data.data;
  },

  // Dashboard
  getDashboardStats: async () => {
    const response = await api.get("/dashboard/stats");
    return response.data.data;
  },

  getDashboardOverview: async () => {
    const response = await api.get("/dashboard/overview");
    return response.data.data;
  },
};