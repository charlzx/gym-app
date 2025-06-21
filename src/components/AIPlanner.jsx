import { useState } from "react";

const AIPlanner = () => {
  const [formData, setFormData] = useState({ goal: 'Build Muscle', level: 'Beginner', days: '3' });
  const [includeMealPlan, setIncludeMealPlan] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(plan);
      setCopySuccess("Plan copied!");
      setTimeout(() => setCopySuccess(""), 2500);
    } catch (err) {
      setCopySuccess("Failed to copy.");
    }
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById("workout-plan-result");
    if (element) {
      html2pdf().from(element).set({
        margin: 0.5,
        filename: `Workout_Plan_${formData.goal.replace(/\s/g, "_")}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }).save();
    }
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
      You are an expert fitness coach and a creative web designer. Create a visually appealing and detailed workout plan based on the user's choices.
      User's Goal: ${formData.goal}
      User's Experience Level: ${formData.level}
      Days per week: ${formData.days}
      Include Meal Plan: ${includeMealPlan}

      Your task is to generate a complete HTML snippet (no <html>, <body>, or <head> tags needed) that presents this plan in a beautiful, modern, and useful way.

      ... [rest of your detailed HTML instructions as previously written]

      ${includeMealPlan ? mealPlanInstructions : ''}
    `;

    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };

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
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text || '';
      setPlan(text.replace(/^```html\s*/, '').replace(/```$/, ''));
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
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
              {/* Select Inputs */}
              {["goal", "level", "days"].map((name) => (
                <div key={name}>
                  <label htmlFor={name} className="block text-gray-300 text-sm font-bold mb-2">
                    {name === "goal" ? "Primary Goal" : name === "level" ? "Experience Level" : "Days per Week"}
                  </label>
                  <select
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {name === "goal" && ["Build Muscle", "Lose Fat", "Improve Endurance", "General Fitness"].map(opt => <option key={opt}>{opt}</option>)}
                    {name === "level" && ["Beginner", "Intermediate", "Advanced"].map(opt => <option key={opt}>{opt}</option>)}
                    {name === "days" && ["3", "4", "5"].map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center pt-2 pb-6">
              <label htmlFor="includeMealPlan" className="mr-3 text-gray-300 text-sm font-bold">Include Meal Plan?</label>
              <button
                type="button"
                onClick={() => setIncludeMealPlan(!includeMealPlan)}
                className={`relative inline-flex h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none ${includeMealPlan ? 'bg-blue-600' : 'bg-gray-600'}`}
                aria-pressed={includeMealPlan}
              >
                <span
                  aria-hidden="true"
                  style={{margin: '1.5px 0 0 1.5px'}}
                  className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition ${includeMealPlan ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </button>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 inline-flex items-center justify-center disabled:bg-gray-500"
              >
                ✨ {isLoading ? 'Generating...' : 'Generate My Plan'}
              </button>
            </div>
          </form>

          {/* Output Area */}
          <div className="mt-8">
            {isLoading && (
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-400">Our AI trainer is building your plan...</p>
              </div>
            )}

            <div className="p-1 bg-gray-800 rounded-lg border border-gray-700">
              {plan && !error && (
                <div id="workout-plan-result" className="p-6" dangerouslySetInnerHTML={{ __html: plan }} />
              )}
              {!plan && !isLoading && <p className="text-gray-500 p-6">{error || 'Your personalized workout plan will be displayed here.'}</p>}
              {error && <p className="text-red-400 font-semibold p-6">{error}</p>}
            </div>

            {/* Action Buttons */}
            {plan && !error && !isLoading && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 relative">
                <button onClick={handleCopy} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">Copy Plan</button>
                <button onClick={handleDownloadPDF} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">Download PDF</button>
                <button onClick={() => setShowSaveModal(true)} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">Save to Profile</button>
                {copySuccess && <p className="text-green-400 text-sm absolute -bottom-6">{copySuccess}</p>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center max-w-sm mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">Feature Coming Soon!</h3>
            <p className="text-gray-300 mb-6">"Save to Profile" will be available once user accounts are launched. Stay tuned!</p>
            <button onClick={() => setShowSaveModal(false)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">Got it</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AIPlanner;