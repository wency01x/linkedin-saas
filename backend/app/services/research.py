from tavily import TavilyClient
from app.core.config import settings

tavily = TavilyClient(api_key=settings.TAVILY_API_KEY)

async def research_trending_topics(industry: str, topic: str = None) -> str:

    if topic:
        query = f"latest trends and insights about {topic} in {industry} 2026"
    else:
        query = f"trending topics and insights in {industry} industry 2026"

    results = tavily.search(
        query=query,
        search_depth="basic",
        max_results=3
    )

    context = ""
    for result in results["results"]:
        context += f"- {result['title']}: {result['content'][:200]}\n"

    return context