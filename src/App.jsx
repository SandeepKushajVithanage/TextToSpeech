import React, { useState, useEffect } from "react";
import { useSpeechSynthesis, synthesizeSpeech } from "react-speech-kit";

const synth = window.speechSynthesis;

const App = () => {
  const [value, setValue] = useState("");
  const [voice, setVoice] = useState(null);
  const { speak, voices, cancel } = useSpeechSynthesis();

  useEffect(() => {
    const [voice] = voices;
    if (voices.length) setVoice(voice);
  }, [voices]);

  const handleVoiceChange = (event) => {
    const voiceName = event.target.value;
    const voice = voices.find((v) => v.name === voiceName);
    setVoice(voice);
  };

  const handleDownload = async () => {
    // const audioData = await synthesizeSpeech({ text: "Hello, World!" });
    // const blob = new Blob([audioData], { type: "audio/mp3" });
  };

  const onSpeak = () => {
    // speak({ text: value, voice });
    const utterThis = new SpeechSynthesisUtterance(value);
    utterThis.voice = voice;
    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
    console.log(utterThis);
  };

  return (
    <div className="bg-white p-4 h-screen flex flex-col max-w-screen-xl mx-auto">
      <select
        className="border-2 rounded-md p-3 border-blue-600 w-full focus:outline-none"
        value={voice?.name || ""}
        onChange={handleVoiceChange}
      >
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </select>
      <div className="flex-1 py-3">
        <textarea
          className="w-full border-2 focus:outline-none h-full rounded-md resize-none p-3 border-blue-600"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
      <Button color="green" onClick={onSpeak}>
        Speak
      </Button>
      <Button color="red" onClick={() => cancel()}>
        Cancel
      </Button>
      <Button color="blue" onClick={handleDownload}>
        Download
      </Button>
    </div>
  );
};

export default App;

const Button = ({ children, onClick, color }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group w-full bg-${color}-600 text-white p-3 rounded-md hover:bg-${color}-500 mb-3 font-medium`}
  >
    <div className="group-hover:scale-105">{children}</div>
  </button>
);
