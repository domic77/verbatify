export interface AnalysisResult {
  diagnosis: string[];
  missedOpportunities: string[];
  missedUpsell: string[];
  praise: string[];
  exactFixes: { severity: 'CRITICAL' | 'MINOR'; text: string }[];
  recoveryScript: string;
}

export const analyzeTranscript = async (_transcript: string): Promise<AnalysisResult> => {
  // Simulate network delay for AI processing
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // In the future, this is where you will make the fetch call to OpenAI or Gemini:
  // const response = await fetch('/api/analyze', { method: 'POST', body: JSON.stringify({ transcript }) });
  // return await response.json();

  return {
    diagnosis: [
      "You defended the price immediately instead of isolating the core objection.",
      "You accepted a vague \"we'll review it\" without establishing a firm next step."
    ],
    missedOpportunities: [
      "When the prospect mentioned \"team adoption,\" that was a massive buying signal for the Enterprise onboarding package. You missed it."
    ],
    missedUpsell: [
      "Left $3,000 on the table by failing to pitch the Migration Service."
    ],
    praise: [
      "Excellent upfront contract. You set the agenda clearly.",
      "Good pacing. You let the prospect speak for 65% of the first 10 minutes."
    ],
    exactFixes: [
      { severity: 'CRITICAL', text: 'When price is objected to, counter with: "Are you comparing that to the cost of doing nothing?"' },
      { severity: 'MINOR', text: 'Never hang up without a calendar invite sent for the follow-up.' }
    ],
    recoveryScript: "\"Hey [Name], I was reviewing my notes from our call. You mentioned data migration was a big worry. If I can guarantee our implementation team will handle 100% of that historical data migration for you this week, would that clear the runway for us to get started on Monday?\""
  };
};