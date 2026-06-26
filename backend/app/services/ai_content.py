from google import genai
from app.core.config import settings
from app.services.research import research_trending_topics
import uuid
import json



async def generate_linkedin_post(
    topic: str,
    industry: str,
    target_audience: str,
    tone: str,
    formatting_style: str = None,
    vocabulary_rules: str = None,
    example_posts: str = None
) -> dict:
    client = genai.Client(api_key=settings.GEMINI_API_KEY)
    
    prompt = f"""
    You are a LinkedIn content expert. Write a high-performing LinkedIn post with these details:

    Industry: {industry}
    Target Audience: {target_audience}
    Tone: {tone}
    Topic: {topic}
    """

    if formatting_style:
        prompt += f"\n    CRITICAL Formatting & Style Rules (You MUST STRICTLY follow these):\n    {formatting_style}\n"

    if vocabulary_rules:
        prompt += f"\n    Vocabulary Rules (Words to use/avoid):\n    {vocabulary_rules}\n"

    prompt += """
    General Rules:
    - Maximum 3000 characters
    - Use line breaks to make it readable
    - Start with a strong hook, not "I"
    - End with a question to drive comments
    - No hashtags more than 3
    - Sound human, not like AI wrote it
    - Do NOT use markdown formatting like **bold** or *italics*. Use plain text only.
    """

    if example_posts:
        prompt += f"\n\n    Here are some of my best performing past posts. Analyze their exact cadence, rhythm, spacing, and sentence structure, and strictly mimic this writing style in the new post:\n    {example_posts}\n"

    prompt += "\n    Return only the post content, nothing else.\n    "

    response = await client.aio.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    content = response.text.strip()

    return {
        "id": str(uuid.uuid4()),
        "content": content,
        "topic": topic
    }

async def generate_bulk_linkedin_posts(
    topics: list[str],
    industry: str,
    target_audience: str,
    tone: str,
    formatting_style: str = None,
    vocabulary_rules: str = None,
    example_posts: str = None
) -> list[dict]:
    client = genai.Client(api_key=settings.GEMINI_API_KEY)
    
    prompt = f"""
    You are a LinkedIn content expert. Write {len(topics)} high-performing LinkedIn posts, one for each of these topics:
    {json.dumps(topics)}

    Industry: {industry}
    Target Audience: {target_audience}
    Tone: {tone}
    """

    if formatting_style:
        prompt += f"\n    CRITICAL Formatting & Style Rules (You MUST STRICTLY follow these):\n    {formatting_style}\n"

    if vocabulary_rules:
        prompt += f"\n    Vocabulary Rules (Words to use/avoid):\n    {vocabulary_rules}\n"

    prompt += """
    General Rules:
    - Maximum 3000 characters per post
    - Use line breaks to make it readable
    - Start with a strong hook, not "I"
    - End with a question to drive comments
    - Sound human, not like AI wrote it
    - Do NOT use markdown formatting like **bold** or *italics*. Use plain text only.

    Return EXACTLY a JSON array of objects. You MUST use these exact fixed keys:
    [
      {
        "topic": "The topic being covered",
        "content": "The generated LinkedIn post content"
      }
    ]
    Do NOT include markdown formatting like ```json or any other text outside the JSON array.
    """

    if example_posts:
        prompt += f"\n\n    Here are some of my best performing past posts. Analyze their exact cadence, rhythm, spacing, and sentence structure, and strictly mimic this writing style in the new post:\n    {example_posts}\n"

    response = await client.aio.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    
    content = response.text.strip()
    if content.startswith("```json"):
        content = content[7:-3].strip()
    elif content.startswith("```"):
        content = content[3:-3].strip()
        
    return json.loads(content)