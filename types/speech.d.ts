declare global {
  interface Window {
    webkitSpeechRecognition?: {
      new (): SpeechRecognition;
      prototype: SpeechRecognition;
    };
    SpeechRecognition?: {
      new (): SpeechRecognition;
      prototype: SpeechRecognition;
    };
  }
}
export {};