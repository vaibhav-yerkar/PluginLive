import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

class Solver:
    def __init__(self):
        self.apikey = os.getenv("GOOGLE_API_KEY")
        genai.configure(api_key=self.apikey)
        self.model = genai.GenerativeModel("gemini-pro")
        self.system = "You are a helpful assistant. Please respond to the user queries based on context only."

    def generate_response(self, context, question):
        full_prompt = f"{self.system}\n\nContext: {context}\n\nQuestion: {question}"
        
        try:
            response = self.model.generate_content(full_prompt)
            return response.text
        except Exception as e:
            return f"An error occurred: {str(e)}"

