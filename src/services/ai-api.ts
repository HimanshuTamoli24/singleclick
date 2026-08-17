import { apiClient } from "~/lib/axios";

export interface AIResponse {
  response?: string;
  text?: string;
  result?: string;
  slides?: unknown[];
  [key: string]: unknown;
}

export const askAI = async ({
  prompt,
}: {
  prompt: string;
}): Promise<AIResponse> => {
  const res = await apiClient.post<AIResponse>("/ai/askai", { prompt });
  return res.data;
};
