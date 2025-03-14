import { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

export default function VideoCall() {
  const APP_ID = "YOUR_AGORA_APP_ID"; // Replace with your Agora App ID
  const CHANNEL = "test-channel"; // Channel name (same for both users)
  const TOKEN = null; // If using a token, generate it in Agora Console

  const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const joinCall = async () => {
      await client.join(APP_ID, CHANNEL, TOKEN, null);
      
      // Create local video/audio stream
      const localStream = AgoraRTC.createStream({ video: true, audio: true });
      await localStream.init();

      // Play local stream
      localStream.play(localVideoRef.current);

      // Publish local stream to channel
      client.publish(localStream);

      // Subscribe to remote users when they join
      client.on("stream-added", ({ stream }) => {
        client.subscribe(stream);
      });

      client.on("stream-subscribed", ({ stream }) => {
        stream.play(remoteVideoRef.current);
      });

      setJoined(true);
    };

    joinCall();

    return () => {
      client.leave();
      setJoined(false);
    };
  }, []);

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-lg font-bold mb-4">Agora Video Call</h2>
      <div className="flex gap-4">
        <div className="w-1/2 border">
          <h3 className="text-center">Your Video</h3>
          <div ref={localVideoRef} className="w-full h-64 bg-gray-200"></div>
        </div>
        <div className="w-1/2 border">
          <h3 className="text-center">Remote Video</h3>
          <div ref={remoteVideoRef} className="w-full h-64 bg-gray-200"></div>
        </div>
      </div>
      <button
        onClick={() => client.leave()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        disabled={!joined}
      >
        Leave Call
      </button>
    </div>
  );
}
