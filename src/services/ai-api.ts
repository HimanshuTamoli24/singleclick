import { apiClient } from "~/lib/axios";

export const askAI = async ({ prompt }: { prompt: string }) => {
  const { data } = await apiClient.post("/ai/askai", { prompt });
  return data;
};
