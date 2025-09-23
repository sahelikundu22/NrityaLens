const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const apiService = {
  // Analyze uploaded image
  async analyzeMudra(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${API_BASE_URL}/api/analyze-mudra`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Analysis failed');
    }

    return await response.json();
  },

  // Get random mudra for practice
  async getRandomMudra() {
    const response = await fetch(`${API_BASE_URL}/api/random-mudra`);
    if (!response.ok) {
      throw new Error('Failed to get mudra');
    }
    return await response.json();
  },

  // Analyze camera feed for practice mode
  async analyzePractice(mudraName, imageData) {
    const response = await fetch(`${API_BASE_URL}/api/practice-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mudra_name: mudraName,
        image_data: imageData,
      }),
    });

    if (!response.ok) {
      throw new Error('Analysis failed');
    }

    return await response.json();
  },
};