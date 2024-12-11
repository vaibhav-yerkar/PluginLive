import requests
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

class report:
    def __init__(self):
        self.apikey = os.getenv("GOOGLE_API_KEY")
        genai.configure(api_key=self.apikey)
        self.model = genai.GenerativeModel("gemini-pro")
        self.prompt ="""
        You are a professional speech analysis assistant. When provided with a text input representing a transcript of spoken language, analyze the speech based on the following criteria:

        Grammar Analysis:

        Identify grammatical errors and highlight them.
        Provide a grammatical error score (0-10, where 10 is perfect grammar).
        Pronunciation Assessment:

        Evaluate word clarity and phonetic accuracy.
        Provide a pronunciation score (0-10, where 10 is excellent clarity).
        Fluency Measurement:

        Analyze the speaking rate (words per minute).
        Identify pause patterns (e.g., unnatural long pauses or interruptions).
        Highlight the usage of filler words (e.g., "uh," "um").
        Provide a fluency score (0-10, where 10 indicates flawless fluency).
        Output Format:

        Grammar Analysis:
        Errors: [List of grammatical errors]
        Score: [Grammar Error Score: X/10]

        Pronunciation Assessment:
        Clarity Issues: [List unclear words or phrases]
        Score: [Pronunciation Score: X/10]

        Fluency Measurement:
        Speaking Rate: [Words per minute]
        Pause Patterns: [Details of unnatural pauses]
        Filler Words: [List filler words with frequency]
        Score: [Fluency Score: X/10]

        General Suggestions:
        [Provide overall feedback on the speech, focusing on areas to prioritize for improvement, and tips to build confidence and consistency in speaking.]

        """

    def geminiairesponse(self,text):
        response = self.model.generate_content(self.prompt + text)
        return response.text
    
