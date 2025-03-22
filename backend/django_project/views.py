import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from openai import OpenAI

# Configure OpenAI client (make sure to add the API key to your Django settings)
# In settings.py: OPENAI_API_KEY = 'your-api-key'
client = OpenAI(api_key='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')

@csrf_exempt
def api_endpoint(request):
    if request.method == 'POST':
        try:
            # Parse the incoming JSON data
            data = json.loads(request.body)
            user_goals = data.get('message', '')
            
            if not user_goals:
                return JsonResponse({
                    'status': 'error',
                    'message': 'No goals provided'
                }, status=400)

            # Call the OpenAI API to generate a therapy plan
            response = client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": """
                    You are a professional therapist assistant. Generate a customized therapy plan based on the user's goals.
                    Your response must strictly follow this JSON format:
                    {
                        "therapy_plan": {
                            "summary": "Brief summary of the presenting concerns and goals",
                            "goals": [
                                {
                                    "goal": "Goal 1",
                                    "objectives": ["Measurable objective 1", "Measurable objective 2"]
                                },
                                {
                                    "goal": "Goal 2",
                                    "objectives": ["Measurable objective 1", "Measurable objective 2"]
                                }
                            ],
                            "interventions": [
                                {
                                    "name": "Intervention name",
                                    "description": "Brief description of the intervention",
                                    "frequency": "How often to practice",
                                    "resources": ["Resource 1", "Resource 2"]
                                }
                            ],
                            "timeline": {
                                "short_term": "1-2 week activities",
                                "medium_term": "1 month expectations",
                                "long_term": "3 month goals"
                            },
                            "progress_metrics": [
                                "How to measure progress 1",
                                "How to measure progress 2"
                            ]
                        }
                    }
                    You must maintain this exact structure in your response.
                    """},
                    {"role": "user", "content": f"My therapy goals: {user_goals}"}
                ],
                temperature=0.7,
            )
            
            # Extract the generated therapy plan
            therapy_plan_text = response.choices[0].message.content
            
            # Parse the response to ensure it's valid JSON
            try:
                therapy_plan = json.loads(therapy_plan_text)
                return JsonResponse({
                    'status': 'success',
                    'message': therapy_plan
                })
            except json.JSONDecodeError:
                # If the API doesn't return valid JSON, log the raw response for debugging
                print(f"Failed to parse JSON: {therapy_plan_text}")
                return JsonResponse({
                    'status': 'error',
                    'message': 'Failed to parse therapy plan. Please try again.'
                }, status=500)
                
        except json.JSONDecodeError as e:
            return JsonResponse({
                'status': 'error',
                'message': f'Invalid JSON in request: {str(e)}'
            }, status=400)
        except Exception as e:
            print(f"Error in api_endpoint: {str(e)}")  # Add logging for debugging
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=500)
    else:
        return JsonResponse({
            'status': 'error',
            'message': 'Only POST method is allowed'
        }, status=405)


@csrf_exempt
def prompt_generation(request):
    """
    Generate a therapeutic journal prompt tailored to the user's emotional state or needs.
    
    POST parameters:
        mood (optional): Current mood or emotional state
        focus_area (optional): Area of life to focus on (e.g., "relationships", "work", "self-care")
        prompt_type (optional): Type of prompt (e.g., "reflection", "gratitude", "goal-setting")
        
    Returns:
        JSON response with a journal prompt
    """
    if request.method == 'POST':
        try:
            # Parse request data
            data = json.loads(request.body)
            mood = data.get('mood', '')
            focus_area = data.get('focus_area', '')
            prompt_type = data.get('prompt_type', '')
            
            # Build context for the prompt
            context = ""
            if mood:
                context += f"My current mood is: {mood}. "
            if focus_area:
                context += f"I'd like to focus on: {focus_area}. "
            if prompt_type:
                context += f"I'm looking for a {prompt_type} prompt. "
            
            if not context:
                context = "I'm looking for a therapeutic journal prompt for today."
            
            # Call OpenAI API to generate journal prompt
            response = client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": """
                    You are a therapeutic journaling assistant. Create a thoughtful journal prompt that encourages 
                    self-reflection, emotional processing, or personal growth.
                    
                    Your response must follow this exact JSON format:
                    {
                        "journal_entry": {
                            "title": "A brief, engaging title for the prompt",
                            "prompt": "The main journal prompt question or directive",
                            "follow_up_questions": [
                                "Additional question 1 to deepen reflection",
                                "Additional question 2 to deepen reflection",
                                "Additional question 3 to deepen reflection"
                            ],
                            "intention": "A brief statement about the therapeutic intention of this prompt",
                            "estimated_time": "Suggested time to spend on this prompt (e.g., '10-15 minutes')"
                        }
                    }
                    
                    Make the prompt specific, thought-provoking, and appropriate for therapeutic journaling.
                    """},
                    {"role": "user", "content": context}
                ],
                temperature=0.7,
            )
            
            # Extract and parse the journal prompt
            prompt_text = response.choices[0].message.content
            
            try:
                prompt_data = json.loads(prompt_text)
                return JsonResponse({
                    'status': 'success',
                    'message': prompt_data
                })
            except json.JSONDecodeError:
                # Log the raw response for debugging
                print(f"Failed to parse JSON: {prompt_text}")
                return JsonResponse({
                    'status': 'error',
                    'message': 'Failed to parse journal prompt response. Please try again.'
                }, status=500)
                
        except json.JSONDecodeError as e:
            return JsonResponse({
                'status': 'error',
                'message': f'Invalid JSON in request: {str(e)}'
            }, status=400)
        except Exception as e:
            print(f"Error in prompt_generation: {str(e)}")  # Add logging for debugging
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=500)
    else:
        return JsonResponse({
            'status': 'error',
            'message': 'Only POST method is allowed'
        }, status=405)