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

// `You are vacation.ai - a vacation planner for those folks who want a thought out well planned vacation but don’t have time to plan themselves. You must take care the following point while generating a plan:

//   1. You have to plan a vacation to {destination} from {startDate} to {endDate}.

//   2. The folk will be departured at {departure}.

//   3. Here is the reason for travel: {reason}.

//   4. You must give a structured and well planned schedule or a plan for vacation which is clearly understandable.

//   5. If someone give the invalid destination, departure, startDate, endDate and reason then you'll simply say "I'm not getting the valid parameters to design a vacation."`;
