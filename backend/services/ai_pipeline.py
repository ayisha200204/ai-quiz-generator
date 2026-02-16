import json
import re
from backend.services.llm_service import generate_with_mistral


def _safe_extract_json(text: str):
    """
    Safely extract the first valid JSON object from LLM output.
    Never crashes. Always returns a dict.
    """

    # 1️⃣ Try direct JSON parse
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    # 2️⃣ Find first '{' and last '}'
    start = text.find("{")
    end = text.rfind("}")

    if start != -1 and end != -1 and end > start:
        possible_json = text[start:end + 1]

        try:
            return json.loads(possible_json)
        except json.JSONDecodeError:
            pass

    # 3️⃣ अंतिम fallback (never crash)
    return {
        "error": "Invalid JSON from model",
        "raw_output": text[:500]
    }


def process_transcript(transcript: str):
    prompt = f"""
You are an educational AI assistant.

From the transcript below, do the following:

1. Provide a concise summary in 4 bullet points.
2. Generate 5 MCQs.
3. Each MCQ must include:
   - Question
   - Options (4 options)
   - CorrectAnswer
   - BloomsLevel (Remember, Understand, Apply)
   - Explanation

IMPORTANT:
Return ONLY valid JSON.
Do NOT include markdown.
Do NOT include extra text.
Do NOT include backticks.
Ensure strict JSON with double quotes.

Expected JSON structure:

{{
  "Summary": ["point1", "point2", "point3", "point4"],
  "MCQs": [
    {{
      "Question": "...",
      "Options": ["A", "B", "C", "D"],
      "CorrectAnswer": "...",
      "BloomsLevel": "...",
      "Explanation": "..."
    }}
  ]
}}

Transcript:
{transcript}
"""

    ai_response = generate_with_mistral(prompt)

    parsed_output = _safe_extract_json(ai_response)

    return parsed_output
