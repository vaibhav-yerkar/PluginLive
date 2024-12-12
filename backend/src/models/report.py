from moviepy import VideoFileClip
import speech_recognition as sr
import os
from dotenv import load_dotenv
import google.generativeai as genai
import imageio_ffmpeg as ffmpeg

class VideoAnalysis:
    def __init__(self):
        # Load API key from environment variables
        load_dotenv()  # Ensure .env is loaded
        self.apikey = os.getenv("GOOGLE_API_KEY")
        if not self.apikey:
            raise ValueError("API key not found. Please set GOOGLE_API_KEY in your environment variables.")
        
        # Configure the generative AI model
        genai.configure(api_key=self.apikey)
        self.model = genai.GenerativeModel("gemini-pro")
        
        # Define the analysis prompt
        self.prompt = """You are a professional speech analysis assistant. When provided with a text input representing a transcript of spoken language, analyze the speech based on the following criteria:

        ### Grammar Analysis:
        - Identify grammatical errors and highlight them, excluding cases where sentences after a full stop start with a lowercase letter (common in auto-generated transcripts).
        - Provide a grammatical error score (0-10, where 10 is perfect grammar).

        ### Pronunciation Assessment:
        - Evaluate word clarity and phonetic accuracy.
        - Provide a pronunciation score (0-10, where 10 is excellent clarity).

        ### Fluency Measurement:
        - Analyze the speaking rate (words per minute).
        - Identify pause patterns (e.g., unnatural long pauses or interruptions).
        - Highlight the usage of filler words (e.g., "uh," "um").
        - Provide a fluency score (0-10, where 10 indicates flawless fluency).

        ### Output Format:
        **Grammar Analysis:**
        - Errors: [List of grammatical errors, excluding lowercase beginnings after a full stop]  
        - Score: [Grammar Error Score: X/10]  

        **Pronunciation Assessment:**  
        - Clarity Issues: [List unclear words or phrases]  
        - Score: [Pronunciation Score: X/10]  

        **Fluency Measurement:**  
        - Speaking Rate: [Words per minute]  
        - Pause Patterns: [Details of unnatural pauses]  
        - Filler Words: [List filler words with frequency]  
        - Score: [Fluency Score: X/10]  

        **General Suggestions:**  
        [Provide overall feedback on the speech, focusing on areas to prioritize for improvement, and tips to build confidence and consistency in speaking.]  
        """

    def transcribe_video(self, video_path):
        try:
            # Check if the file exists
            if not os.path.isfile(video_path):
                raise FileNotFoundError(f"File '{video_path}' not found.")
            
            # Load the video
            video = VideoFileClip(video_path)

            # Extract audio
            audio = video.audio
            audio_path = "temp_audio.wav"  # Temporary audio file
            audio.write_audiofile(audio_path, codec="pcm_s16le")

            # Initialize speech recognizer
            r = sr.Recognizer()

            # Load audio file
            with sr.AudioFile(audio_path) as source:
                audio_data = r.record(source)

            # Transcribe audio to text
            text = r.recognize_google(audio_data)

            # Clean up temporary audio file
            os.remove(audio_path)

            return text

        except Exception as e:
            raise RuntimeError(f"An error occurred while transcribing video: {e}")

    def response(self, video_path):
        try:
            text = self.transcribe_video(video_path)
            if not text:
                raise ValueError("Transcription failed. Text is empty.")
            
            # Generate content using generative AI model
            ai_response = self.model.generate_content(self.prompt + "\n\nTranscript: " + text)
            return ai_response.text
        except Exception as e:
            raise RuntimeError(f"An error occurred during response generation: {e}")

