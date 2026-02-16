import requests

OLLAMA_URL = "http://localhost:11434/api/generate"

def generate_with_mistral(prompt: str):

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": "phi",
            "prompt": prompt,
            "stream": False
        }
    )

    print("OLLAMA RAW RESPONSE:", response.text)  # 👈 ADD THIS

    return response.json().get("response", "No response field found")
