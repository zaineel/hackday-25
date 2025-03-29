import { useState, useEffect } from "react";
import { Camera } from "react-native-vision-camera";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.EXPO_PUBLIC_GEMINI_API_KEY || ""
);

function useExpressionRecognition() {
  const [emotion, setEmotion] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission !== "granted") {
      console.error("Camera permission not granted");
    }
  };

  const analyzeExpression = async (imageBase64: string) => {
    try {
      setIsProcessing(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

      const prompt =
        "Analyze this facial expression and return a single emotion word (e.g., happy, sad, angry, calm, anxious, relaxed). Only return the emotion word, nothing else.";

      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: imageBase64,
            mimeType: "image/jpeg",
          },
        },
      ]);

      const response = await result.response;
      const emotion = response.text().trim().toLowerCase();
      setEmotion(emotion);
    } catch (error) {
      console.error("Error analyzing expression:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    emotion,
    isProcessing,
    analyzeExpression,
  };
}

export default useExpressionRecognition;
