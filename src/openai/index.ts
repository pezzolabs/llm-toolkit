import { OpenAIModelSettings } from "./types";

const openAIToolkit = () => {
  const defineModel = (settings: OpenAIModelSettings): OpenAIModelSettings =>
    settings;

  const calculateCostByTokens = (
    promptTokens: number,
    completionTokens: number,
    model: keyof typeof models
  ) => {
    const promptCost =
      (promptTokens / 1000) * models[model].promptCostPer1000Tokens;
    const completionCost =
      (completionTokens / 1000) * models[model].completionsCostPer1000Tokens;

    return {
      promptCost,
      completionCost,
    };
  };

  const models = {
    ["gpt-3.5-turbo"]: defineModel({
      promptCostPer1000Tokens: 0.0015,
      completionsCostPer1000Tokens: 0.002,
    }),

    ["gpt-4"]: defineModel({
      promptCostPer1000Tokens: 0.03,
      completionsCostPer1000Tokens: 0.06,
    }),

    ["gpt-3.5-turbo-16k"]: defineModel({
      promptCostPer1000Tokens: 0.003,
      completionsCostPer1000Tokens: 0.004,
    }),
  };

  return {
    calculateCostByTokens,
    models,
  };
};

export const OpenAIToolkit = openAIToolkit();
