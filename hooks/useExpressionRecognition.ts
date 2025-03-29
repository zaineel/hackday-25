import { useEffect, useRef } from "react";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { ExpressionService, Expression } from "../services/expressionService";
import { AudioService } from "../services/audioService";
import SoundLibraryService, {
  SoundCategory,
} from "../services/soundLibraryService";
import { useStore } from "../store/useStore";
import * as FileSystem from "expo-file-system";

const EXPRESSION_CHECK_INTERVAL = 2000; // Check expression every 2 seconds

export function useExpressionRecognition() {
  const devices = useCameraDevices();
  const device = devices.find((d) => d.position === "front");
  const cameraRef = useRef<Camera>(null);
  const intervalRef = useRef<NodeJS.Timeout>();
  const { setCurrentExpression, isCameraActive } = useStore();
  const expressionService = new ExpressionService();
  const audioService = AudioService.getInstance();
  const soundLibrary = SoundLibraryService.getInstance();

  useEffect(() => {
    if (isCameraActive) {
      startExpressionRecognition();
    } else {
      stopExpressionRecognition();
    }

    return () => {
      stopExpressionRecognition();
    };
  }, [isCameraActive]);

  const startExpressionRecognition = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(async () => {
      if (!cameraRef.current || !device) return;

      try {
        const photo = await cameraRef.current.takePhoto({
          flash: "off",
          enableShutterSound: false,
        });

        // Convert photo to base64
        const base64 = await FileSystem.readAsStringAsync(photo.path, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const expression = await expressionService.analyzeExpression(base64);
        setCurrentExpression(expression);

        // Map expression to sound category and play appropriate sound
        const soundCategory = expressionService.mapExpressionToSoundCategory(
          expression
        ) as SoundCategory;
        const sound = soundLibrary.getRandomSoundByCategory(soundCategory);

        if (sound && sound.url && sound.title && sound.artist) {
          await audioService.playTrack({
            id: sound.id,
            url: sound.url,
            title: sound.title,
            artist: sound.artist,
          });
        }
      } catch (error) {
        console.error("Error in expression recognition:", error);
      }
    }, EXPRESSION_CHECK_INTERVAL);
  };

  const stopExpressionRecognition = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  return {
    device,
    cameraRef,
  };
}
