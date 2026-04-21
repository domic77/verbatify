export interface AnalysisResult {
  executiveSummary: string;
  diagnosis: string[];
  missedOpportunities: string[];
  missedUpsell: string[];
  praise: string[];
  exactFixes: { severity: 'CRITICAL' | 'MINOR'; text: string }[];
  recoveryScript: string;
}

export const analyzeTranscript = async (transcript: string, mode: 'human' | 'ai' = 'human'): Promise<AnalysisResult> => {
  const response = await fetch('/api/analyze', { 
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ transcript, mode }) 
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || 'Failed to analyze transcript');
  }

  return await response.json();
};