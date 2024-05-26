import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatAnthropic } from "@langchain/anthropic";

export const generateVacation = async (
  destination: string,
  startDate: string,
  endDate: string,
  reason: string
) => {
  const model = new ChatAnthropic({
    temperature: 0,
    model: "claude-3-sonnet-20240229",
    apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
    maxTokens: 1024,
  });

  const prompt = ChatPromptTemplate.fromTemplate(
    `Plan a {reason} vacation itinerary for me from {startDate} to {endDate} in {destination}. Include popular places to visit and activities to do. You must give the response in a list format so that the plan is visually understandable. If someone gives an invalid destination which is not there then you'll simply say "I'm not getting the valid destination to design a vacation."
    
    Note: Use markdown in response, if needed.`
  );

  const chain = prompt.pipe(model);

  const response = await chain.invoke({
    destination,
    endDate,
    reason,
    startDate,
  });

  return response.content;
};
