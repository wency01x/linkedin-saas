import google.generativeai as genai
from app.core.config import settings
import uuid

genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash")

async def generate_linkedin_post(
    topic: str,
    industry: str,
    target_audience: str,
    tone: str
) -> dict:
    prompt = f"""
    You are a LinkedIn content expert. Write a high-performing LinkedIn post with these details:

    Industry: {industry}
    Target Audience: {target_audience}
    Tone: {tone}
    Topic: {topic}

    Rules:
    - Maximum 3000 characters
    - Use line breaks to make it readable
    - Start with a strong hook, not "I"
    - End with a question to drive comments
    - No hashtags more than 3
    - Sound human, not like AI wrote it

    Return only the post content, nothing else.
    """

    response = model.generate_content(prompt)
    content = response.text.strip()

    return {
        "id": str(uuid.uuid4()),
        "content": content,
        "topic": topic
    }