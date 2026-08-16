import { useMutation } from "@tanstack/react-query";
import { askAI } from "~/services/ai-api";

export const useAskAI = () => {
  return useMutation({
    mutationFn: askAI
  });
};
