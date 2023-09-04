import { OpenAIGptCostOptions, OpenAIGptModelSettings } from "./types";

const openAIToolkit = () => {
  const defineModel = <T>(settings: T): T => settings;

  const calculateGptCost = ({
    model,
    promptTokens,
    completionTokens,
  }: OpenAIGptCostOptions & { model: keyof typeof gptModels }) => {
    const promptCost =
      (promptTokens / 1000) * gptModels[model].promptCostPer1000Tokens;
    const completionCost =
      (completionTokens / 1000) * gptModels[model].completionsCostPer1000Tokens;

    return {
      promptCost,
      completionCost,
    };
  };

  const gptModels = {
    ["gpt-3.5-turbo"]: defineModel<OpenAIGptModelSettings>({
      promptCostPer1000Tokens: 0.0015,
      completionsCostPer1000Tokens: 0.002,
      maxTokens: 4096,
    }),
    ["ft:gpt-3.5-turbo-0613"]: defineModel<OpenAIGptModelSettings>({
      promptCostPer1000Tokens: 0.0120,
      completionsCostPer1000Tokens: 0.0160,
      maxTokens: 4096,
      trainingCostPer1000Tokens: 0.0080,
    }),
    ["gpt-4"]: defineModel<OpenAIGptModelSettings>({
      promptCostPer1000Tokens: 0.03,
      completionsCostPer1000Tokens: 0.06,
      maxTokens: 8192,
    }),

    ["gpt-3.5-turbo-16k"]: defineModel<OpenAIGptModelSettings>({
      promptCostPer1000Tokens: 0.003,
      completionsCostPer1000Tokens: 0.004,
      maxTokens: 16384,
    }),
  };


  return {
    calculateGptCost,
    gptModels,
  };
};

export const OpenAIToolkit = openAIToolkit();
