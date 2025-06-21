import { useState } from 'react';

const AIPlanner = () => {
  const [formData, setFormData] = useState({ goal: 'Build Muscle', level: 'Beginner', days: '3' });
  const [includeMealPlan, setIncludeMealPlan] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPlan('');
    setError('');

    const pkey = "AIzaSyD3hgy1diI0q7TWtYg_oJeixYN_Eulhy7o";
    const apiKey = pkey; // Add your Gemini API key here
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const mealPlanInstructions = `
      Then, if 'Include Meal Plan' is true, generate a complementary meal plan section. For each workout day, create a corresponding meal plan card with the same image and day title. Inside, provide example meals for Breakfast, Lunch, Dinner, and a Snack that align with the user's fitness goal. Use the same card structure as the workout plan for consistency.
    `;

    const prompt = `
      You are an expert fitness coach and creative web designer. Create a visually appealing workout plan based on:
      Goal: ${formData.goal}
      Level: ${formData.level}
      Days/week: ${formData.days}
      Include Meal Plan: ${includeMealPlan}

      Wrap everything in: <div class="space-y-8">. Follow modern Tailwind structure and include:
      - Image: https://source.unsplash.com/400x400/?{topic}
      - Exercise list with checkmark icon
      - YouTube search link for each exercise
      ${includeMealPlan ? mealPlanInstructions : ""}
      Output only raw HTML inside a div. No extra wrappers.
    `;

    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API request failed: ${response.status}`);
      }

      const result = await response.json();
      if (result.candidates && result.candidates[0].content.parts[0]) {
        let html = result.candidates[0].content.parts[0].text;
        html = html.replace(/^```html\s*/, '').replace(/```$/, '');
        setPlan(html);
      } else {
        throw new Error("The AI returned an empty or invalid plan.");
      }
    } catch (err) {
      console.error("Error generating plan:", err);
      setError(`An error occurred: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 📋 COPY FUNCTION
  const handleCopyToClipboard = () => {
    const planElement = document.getElementById("workout-plan-result");
    if (planElement) {
      const tempEl = document.createElement("textarea");
      tempEl.value = planElement.innerText;
      document.body.appendChild(tempEl);
      tempEl.select();
      document.execCommand("copy");
      document.body.removeChild(tempEl);
      alert("Workout plan copied to clipboard!");
    }
  };

  // 📥 DOWNLOAD FUNCTION
  const handleDownloadPDF = async () => {
    const element = document.getElementById("workout-plan-result");
    if (!element) return alert("No plan to download.");

    const html2pdf = (await import("html2pdf.js")).default;

    const opt = {
      margin: 0.5,
      filename: `Workout_Plan_${formData.goal.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <section id="ai-planner" className="py-16 sm:py-24 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Your AI-Powered Workout Plan</h2>
          <p className="text-gray-400 mt-2">Tell us your goals and get a free, customized plan instantly.</p>
        </div>
        <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label htmlFor="goal" className="block text-gray-300 text-sm font-bold mb-2">Primary Goal</label>
                <select id="goal" name="goal" value={formData.goal} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Build Muscle</option>
                  <option>Lose Fat</option>
                  <option>Improve Endurance</option>
                  <option>General Fitness</option>
                </select>
              </div>
              <div>
                <label htmlFor="level" className="block text-gray-300 text-sm font-bold mb-2">Experience Level</label>
                <select id="level" name="level" value={formData.level} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div>
                <label htmlFor="days" className="block text-gray-300 text-sm font-bold mb-2">Days per Week</label>
                <select id="days" name="days" value={formData.days} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-center pt-2 pb-6">
              <label htmlFor="includeMealPlan" className="mr-3 text-gray-300 text-sm font-bold">Include Meal Plan?</label>
              <button
                type="button"
                onClick={() => setIncludeMealPlan(!includeMealPlan)}
                className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${includeMealPlan ? 'bg-blue-600' : 'bg-gray-600'}`}
                aria-pressed={includeMealPlan}
              >
                <span className={`inline-block w-5 h-5 transform bg-white rounded-full shadow transition ${includeMealPlan ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
            <div className="text-center">
              <button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                ✨ {isLoading ? 'Generating...' : 'Generate My Plan'}
              </button>
            </div>
          </form>
          <div className="mt-8">
            {isLoading && (
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="mt-4 text-gray-400">Our AI trainer is building your plan...</p>
              </div>
            )}
            <div className="p-1 bg-gray-800 rounded-lg border border-gray-700">
              {plan && !error && (
                <>
                  <div id="workout-plan-result" className="p-6" dangerouslySetInnerHTML={{ __html: plan }} />
                  <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button onClick={handleDownloadPDF} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                      📥 Download as PDF
                    </button>
                    <button onClick={handleCopyToClipboard} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                      📋 Copy to Clipboard
                    </button>
                  </div>
                </>
              )}
              {!plan && !isLoading && <p className="text-gray-500 p-6">{error || 'Your personalized workout plan will be displayed here.'}</p>}
              {error && <p className="text-red-400 font-semibold p-6">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPlanner;
