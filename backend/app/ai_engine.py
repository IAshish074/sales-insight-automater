import google.generativeai as genai
from .config import GEMINI_API_KEY

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

def generate_summary(data):
    if not GEMINI_API_KEY:
        return "Warning: GEMINI_API_KEY not configured. This is a mock summary. \nTotal Revenue: $200,000 \nTop Region: North \nTrends: Electronics are selling well."
        
    prompt = f"""
You are a sales analyst.

Analyze the following sales data and create a professional executive summary.

DATA:
{data}

Include:
- Total revenue
- Top performing region
- Product trends
- Any anomalies

Format the output nicely using Markdown. Use headings, bullet points, and bold text for emphasis.
"""

    try:
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        raise Exception(f"AI Engine Error: {str(e)}")