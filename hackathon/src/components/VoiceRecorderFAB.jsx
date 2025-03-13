import { useState } from "react";
import { Mic, MicOff } from "lucide-react";

export default function VoiceRecorderFAB() {
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    console.log("Recording started...");
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    console.log("Recording stopped.");
  };

  return (
    <button
      onMouseDown={handleStartRecording} // Start Recording on Press
      onMouseUp={handleStopRecording} // Stop Recording on Release
      onTouchStart={handleStartRecording} // Mobile Support
      onTouchEnd={handleStopRecording}
      className={`flex items-center justify-center w-16 h-16 rounded-full shadow-xl transition-all border-4 border-white ${
        isRecording ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      {isRecording ? <MicOff size={28} className="text-white" /> : <Mic size={28} className="text-white" />}
    </button>
  );
}
