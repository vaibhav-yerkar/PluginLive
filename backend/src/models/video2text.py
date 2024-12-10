import os
import subprocess
import whisper

def video_to_text(video_path):
    # Step 1: Extract audio from the video
    audio_path = "extracted_audio.mp3"
    try:
        print("Extracting audio from video...")
        subprocess.run(
            ["ffmpeg", "-i", video_path, "-q:a", "0", "-map", "a", audio_path, "-y"],
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
        print(f"Audio extracted successfully to {audio_path}")
    except subprocess.CalledProcessError as e:
        print(f"Error in audio extraction: {e.stderr.decode()}")
        return None

    # Step 2: Convert audio to text using Whisper
    try:
        print("Converting audio to text...")
        model = whisper.load_model("base")
        result = model.transcribe(audio_path)
        text = result["text"]
        print("Transcription complete.")
    except Exception as e:
        print(f"Error in transcription: {str(e)}")
        return None
    finally:
        # Clean up the audio file
        if os.path.exists(audio_path):
            os.remove(audio_path)

    return text

if __name__ == "__main__":
    # Set your video file path here
    video_path = "abc.mp4"
    if not os.path.exists(video_path):
        print(f"Video file not found: {video_path}")
    else:
        transcription = video_to_text(video_path)
        if transcription:
            print("Transcribed Text:")
            print(transcription)
        else:
            print("Failed to transcribe the video.")
