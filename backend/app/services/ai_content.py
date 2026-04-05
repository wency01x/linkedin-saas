from google import genai
from app.core.config import settings
from app.services.research import research_trending_topics
import uuid

client = genai.Client(api_key=settings.GEMINI_API_KEY)


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

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    content = response.text.strip()

    return {
        "id": str(uuid.uuid4()),
        "content": content,
        "topic": topic
    }