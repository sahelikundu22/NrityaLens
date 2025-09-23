from fastapi import APIRouter, File, UploadFile, HTTPException
from app.models.mudra_model import MudraClassifier
import base64
import io
from PIL import Image
import numpy as np

router = APIRouter()

# Initialize classifier (placeholder - you'll implement the actual ML model)
classifier = MudraClassifier()

@router.post("/analyze-mudra")
async def analyze_mudra(image: UploadFile = File(...)):
    """
    Analyze uploaded image and identify mudra
    """
    try:
        # Read image file
        image_data = await image.read()
        img = Image.open(io.BytesIO(image_data))
        
        # Convert to RGB if necessary
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Analyze using ML model
        result = classifier.analyze_image(img)
        
        return {
            "success": True,
            "mudra_name": result["name"],
            "accuracy": result["accuracy"],
            "meaning": result["meaning"],
            "feedback": result["feedback"]
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@router.get("/random-mudra")
async def get_random_mudra():
    """
    Get a random mudra for practice mode
    """
    # Placeholder data - replace with your mudra database
    mudras = [
        {"name": "Pataka", "meaning": "Flag"},
        {"name": "Tripataka", "meaning": "Three parts of flag"},
        {"name": "Ardhachandra", "meaning": "Half moon"},
        {"name": "Kartarimukha", "meaning": "Scissors face"},
    ]
    
    import random
    mudra = random.choice(mudras)
    
    return {
        "mudra_name": mudra["name"],
        "meaning": mudra["meaning"]
    }

@router.post("/practice-analysis")
async def practice_analysis(mudra_name: str, image_data: str):
    """
    Analyze practice attempt from camera feed
    """
    try:
        # Decode base64 image data
        image_bytes = base64.b64decode(image_data.split(',')[1])
        img = Image.open(io.BytesIO(image_bytes))
        
        # Analyze using ML model
        result = classifier.analyze_practice(mudra_name, img)
        
        return {
            "success": True,
            "accuracy": result["accuracy"],
            "feedback": result["feedback"],
            "correct": result["accuracy"] > 70  # Threshold for correctness
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing practice: {str(e)}")