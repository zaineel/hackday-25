import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(
  process.env.EXPO_PUBLIC_GEMINI_API_KEY || ""
);

export type Expression =
  | "happy"
  | "sad"
  | "angry"
  | "neutral"
  | "surprised"
  | "fearful"
  | "disgusted";

export class ExpressionService {
  private model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  async analyzeExpression(imageData: string): Promise<Expression> {
    try {
      const prompt = `Analyze this image and determine the primary facial expression. 
      Respond with exactly one of these words: happy, sad, angry, neutral, surprised, fearful, disgusted.
      Only respond with the word, nothing else.`;

      const result = await this.model.generateContent([
        prompt,
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: imageData,
          },
        },
      ]);

      const response = await result.response;
      const text = response.text().trim().toLowerCase() as Expression;

      // Validate the response
      if (!this.isValidExpression(text)) {
        return "neutral";
      }

      return text;
    } catch (error) {
      console.error("Error analyzing expression:", error);
      return "neutral";
    }
  }

  private isValidExpression(expression: string): expression is Expression {
    const validExpressions: Expression[] = [
      "happy",
      "sad",
      "angry",
      "neutral",
      "surprised",
      "fearful",
      "disgusted",
    ];
    return validExpressions.includes(expression as Expression);
  }

  mapExpressionToSoundCategory(expression: Expression): string {
    const mapping: Record<Expression, string> = {
      happy: "elevating",
      sad: "calming",
      angry: "calming",
      neutral: "ambient",
      surprised: "elevating",
      fearful: "calming",
      disgusted: "calming",
    };
    return mapping[expression];
  }
}
