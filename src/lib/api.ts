import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const apiClient = {
  // Processes
  createProcess: async (data: { title: string; description?: string; user_story: string }) => {
    const response = await api.post("/processes", data);
    return response.data;
  },

  getProcesses: async () => {
    const response = await api.get("/processes");
    return response.data;
  },

  getProcess: async (id: string) => {
    const response = await api.get(`/processes/${id}`);
    return response.data;
  },

  updateProcess: async (id: string, data: any) => {
    const response = await api.put(`/processes/${id}`, data);
    return response.data;
  },

  deleteProcess: async (id: string) => {
    const response = await api.delete(`/processes/${id}`);
    return response.data;
  },

  // Analysis
  analyzeProcess: async (processId: string) => {
    const response = await api.post("/analyze", { process_id: processId });
    return response.data;
  },

  getAnalysis: async (processId: string) => {
    const response = await api.get(`/analyze/${processId}`);
    return response.data;
  },

  // Evaluation
  evaluateProcess: async (data: any) => {
    const response = await api.post("/evaluate", data);
    return response.data;
  },

  getEvaluation: async (processId: string) => {
    const response = await api.get(`/evaluate/${processId}`);
    return response.data;
  },

  // Recommendations
  getRecommendations: async (evaluationId: string) => {
    const response = await api.get(`/recommendations/${evaluationId}`);
    return response.data;
  },

  // Dashboard
  getDashboardStats: async () => {
    const response = await api.get("/dashboard/stats");
    return response.data;
  },

  getDashboardProcesses: async () => {
    const response = await api.get("/dashboard/processes");
    return response.data;
  },
};