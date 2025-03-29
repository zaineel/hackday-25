# MoodSound - Emotion-Based Sound Therapy App

MoodSound is a React Native application that uses facial expression recognition to provide personalized sound therapy. The app analyzes your facial expressions in real-time and plays appropriate sounds to help regulate your emotions.

## Features

### Core Features

- **Facial Expression Recognition**: Real-time analysis of facial expressions using the Gemini API
- **Adaptive Sound Therapy**: Automatically plays sounds based on detected emotions
- **Sound Categories**:
  - Calming sounds for negative emotions
  - Elevating sounds for positive emotions
  - Nature sounds for neutral states
  - Meditation and focus sounds
  - Sleep sounds

### Technical Features

- Built with React Native and Expo
- Uses Vision Camera for facial expression capture
- Integrates with Google's Gemini API for emotion analysis
- Implements react-native-track-player for audio playback
- State management with Zustand
- Dark mode support
- Responsive and intuitive UI

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/moodsound.git
cd moodsound
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Gemini API key:

```
EXPO_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm start
```

5. Run on your preferred platform:

```bash
# For iOS
npm run ios

# For Android
npm run android
```

## Project Structure

```
moodsound/
├── app/                    # Main app screens
│   ├── camera.tsx         # Camera and expression recognition screen
│   ├── sounds.tsx         # Sound selection screen
│   └── settings.tsx       # App settings screen
├── components/            # Reusable UI components
├── services/             # Business logic and API services
│   ├── audioService.ts   # Audio playback service
│   ├── expressionService.ts # Expression recognition service
│   └── soundLibraryService.ts # Sound library management
├── hooks/                # Custom React hooks
│   └── useExpressionRecognition.ts
├── store/               # State management
│   └── useStore.ts
└── assets/             # Static assets (sounds, images)
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini API for facial expression recognition
- React Native community for excellent tools and libraries
- All sound artists and contributors to the sound library
