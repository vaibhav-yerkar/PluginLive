import DefaultHOC from "../layout/Default.HOC";
import React, { useState, useRef } from "react";
import { getUserName } from "../utils/auth";

const questionBank = [
  { id: 1, question: "Tell us about yourself?" },
  { id: 2, question: "What's your view on remote work culture?" },
  { id: 3, question: "How do you stay updated with industry trends?" },
  { id: 4, question: "What inspired you to choose your career path?" },
  { id: 5, question: "Custom Question" },
];

function MockInterviewPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [customQuestion, setCustomQuestion] = useState("");

  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const recognitionRef = useRef(null);
  const streamRef = useRef(null);
  const accumulatedTranscript = useRef("");

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;

      mediaRecorderRef.current = new MediaRecorder(stream);

      const videoChunks = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        videoChunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const videoBlob = new Blob(videoChunks, { type: "video/webm" });
        const videoUrl = URL.createObjectURL(videoBlob);
        setVideoUrl(videoUrl);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        recognitionRef.current = new (window.SpeechRecognition ||
          window.webkitSpeechRecognition)();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event) => {
          let newTranscript = "";

          Array.from(event.results).forEach((result) => {
            if (result.isFinal) {
              if (
                !accumulatedTranscript.current.includes(result[0].transcript)
              ) {
                accumulatedTranscript.current += result[0].transcript + " ";
              }
            } else if (!isPaused) {
              newTranscript += result[0].transcript;
            }
          });

          setTranscript(accumulatedTranscript.current + newTranscript);
        };

        recognitionRef.current.start();
      }
    } catch (err) {
      console.error("Error accessing media devices: ", err);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    accumulatedTranscript.current += transcript;
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        recognitionRef.current.start();
        setIsPaused(false);
      } else {
        mediaRecorderRef.current.pause();
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
        setIsPaused(true);
      }
    }
  };

  const handleRetake = () => {
    if (recognitionRef.current) {
      recognitionRef.current.onresult = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setTranscript("");
    accumulatedTranscript.current = "";
    setVideoUrl(null);
    setIsModalOpen(false);
    setIsRecording(false);
    setIsPaused(false);
  };

  const handleUpload = async () => {
    let userName = getUserName();
    let timestamp =
      new Date().toISOString().slice(0, 10).replace(/-/g, "").slice(0, -4) +
      "-" +
      new Date().toTimeString().split(" ")[0].replace(/:/g, ""); // YYYYMMDD-HHmmss
    const fileName = `${userName}_${timestamp}.webm`;

    let questionAnswered;
    if (selectedQuestion !== "5") {
      const questionObj = questionBank.find(
        (q) => q.id === parseInt(selectedQuestion)
      );
      questionAnswered = questionObj
        ? questionObj.question
        : "Unknown question";
    } else {
      questionAnswered = customQuestion;
    }
    const videoBlob = await fetch(videoUrl).then((res) => res.blob());

    const renamedVideoFile = new File([videoBlob], newFileName, {
      type: videoBlob.type,
    });
    const formData = new FormData();
    formData.append("video", renamedVideoFile);
    formData.append("question", questionToUpload);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Video and question uploaded successfully!");
    } else {
      console.error("Failed to upload video and question");
    }

    setIsModalOpen(false);
  };

  const handleQuestionChange = (e) => {
    const value = e.target.value;
    console.log(value);
    setSelectedQuestion(value);
    if (value !== "5") {
      setCustomQuestion("");
    }
  };

  const handleCustomQuestionChange = (e) => {
    setCustomQuestion(e.target.value);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Mock Interview</h1>

      {/* Question Dropdown */}
      <div className="mb-4">
        <label htmlFor="question" className="text-lg font-semibold">
          Select a Question:
        </label>
        <select
          id="question"
          value={selectedQuestion}
          onChange={handleQuestionChange}
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          {questionBank.map((question) => (
            <option key={question.id} value={question.id}>
              {question.question}
            </option>
          ))}
        </select>

        {/* Input field for custom question */}
        {selectedQuestion === "5" && (
          <div className="mt-4">
            <label
              htmlFor="custom-question"
              className="block text-lg font-semibold"
            >
              Enter Custom Question:
            </label>
            <input
              type="text"
              id="custom-question"
              value={customQuestion}
              onChange={handleCustomQuestionChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        )}
      </div>

      {/* Video Preview */}
      <div className="mb-4">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full max-w-md border border-gray-300 rounded-lg"
        />
      </div>

      {/* Recording Controls */}
      <div className="mb-6 flex space-x-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Start Recording
          </button>
        ) : (
          <>
            <button
              onClick={stopRecording}
              className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition duration-200"
            >
              Stop Recording
            </button>
            <button
              onClick={pauseRecording}
              className={`$ {
                isPaused ? bg-green-500 : bg-yellow-500
              } text-white py-2 px-6 rounded-md hover:opacity-80 transition duration-200`}
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
          </>
        )}
      </div>

      {/* Transcript Section */}
      <div className="w-full max-w-2xl mb-6">
        <h2 className="text-xl font-semibold mb-2">Transcript:</h2>
        <p className="bg-white p-4 rounded-lg shadow-md">{transcript}</p>
      </div>

      {/* Review Recording Button */}
      {videoUrl && !isModalOpen && (
        <div className="mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-200"
          >
            Review Recording
          </button>
        </div>
      )}

      {/* Modal for Reviewing Video */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">
              Review Your Recording
            </h2>
            <video src={videoUrl} controls className="w-full mb-4 rounded-lg" />
            <div className="flex justify-start gap-4 mt-4">
              <button
                onClick={handleRetake}
                className="bg-yellow-500 text-white py-2 px-6 rounded-md hover:bg-yellow-600 transition duration-200"
              >
                Retake Video
              </button>
              <button
                onClick={handleUpload}
                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Upload Video
              </button>
            </div>
            <div className="mt-4 flex flex-row justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white py-2 px-6 rounded-md hover:bg-gray-500 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DefaultHOC(MockInterviewPage);
