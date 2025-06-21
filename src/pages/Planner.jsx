import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Main AI Planner Component ---
const AIPlannerPage = () => {
    const [formData, setFormData] = useState({ goal: 'Build Muscle', level: 'Beginner', days: '3' });
    const [includeMealPlan, setIncludeMealPlan] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [plan, setPlan] = useState('');
    const [error, setError] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    const [showSaveModal, setShowSaveModal] = useState(false);

    useEffect(() => {
        const html2pdfScript = document.createElement('script');
        html2pdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        html2pdfScript.async = true;
        document.body.appendChild(html2pdfScript);

        return () => {
            if (document.body.contains(html2pdfScript)) {
                document.body.removeChild(html2pdfScript);
            }
        }
    }, []);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCopy = () => {
        if (!plan) return;
        const planElement = document.getElementById('workout-plan-result');
        if (planElement) {
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = planElement.innerText;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextArea);
            setCopySuccess('Plan copied to clipboard!');
            setTimeout(() => setCopySuccess(''), 3000);
        }
    };

    const handleDownloadPDF = () => {
        if (!plan || typeof html2pdf === 'undefined') {
            setError('Could not generate PDF. The PDF library might still be loading.');
            return;
        }
        setIsLoading(true);
        const element = document.getElementById('workout-plan-result');
        const opt = {
          margin:       0.5,
          filename:     'Gym-Workout-Plan.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2, backgroundColor: '#1f2937', useCORS: true },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(element).set(opt).save().then(() => {
            setIsLoading(false);
        }).catch(err => {
            setError('Failed to generate PDF.');
            setIsLoading(false);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setPlan('');
        setError('');
        
        const apiKey = ""; 
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        
        const mealPlanInstructions = `
            After the workout plan, if 'Include Meal Plan' is true, generate a meal plan section. Start it with a title: "<h2 class='text-3xl font-bold text-white mt-12 mb-4 text-center'>Complementary Meal Plan</h2>". Then, for each workout day, create a corresponding meal plan table. The table should have a title like "<h3 class='text-xl font-bold text-white mb-2'>Day 1 Meals</h3>". The table itself should have two columns: 'Meal' (e.g., Breakfast, Lunch, Dinner, Snack) and 'Suggestion'. Use the same table styling as the workout plan for consistency.
        `;

        const prompt = `
            You are an expert fitness coach and a creative web designer. Create a visually appealing and detailed workout plan based on the user's choices, formatted entirely within HTML tables.
            User's Goal: ${formData.goal}
            User's Experience Level: ${formData.level}
            Days per week: ${formData.days}
            Include Meal Plan: ${includeMealPlan}

            Your task is to generate a complete HTML snippet (no <html>, <body>, or <head> tags needed).

            **Workout Plan Requirements:**
            1.  **Main Container:** Wrap the entire plan in a \`<div class="space-y-8">\`.
            2.  **Introductory Paragraph:** Start with a friendly, encouraging paragraph using Tailwind CSS classes for styling.
            3.  **Workout Day Tables:** For each workout day, create a full-width table.
                * Start with a title like \`<h3 class="text-2xl font-bold text-white mb-2">Day 1: Upper Body Strength</h3>\`.
                * Create a table with \`<table class="w-full text-sm text-left text-gray-300">\`.
                * The table header (\`<thead>\`) should have columns: 'Exercise', 'Sets & Reps', and 'Video'. Use the class \`text-xs text-white uppercase bg-gray-700\` for the header row.
                * The table body (\`<tbody>\`) should list 4-5 exercises. Each row should alternate background color (\`bg-gray-900\` and \`bg-gray-800\`).
                * The 'Video' cell should contain a reliable YouTube search link, not a direct video link. Format it like this: \`<a href="https://www.youtube.com/results?search_query={exercise}+tutorial" target="_blank" class="text-blue-400 hover:underline">Watch Tutorial</a>\`. Replace "{exercise}" with the exercise name (e.g., Bench+Press).
            4.  **Final Note:** Conclude the workout section with a final encouraging note about rest and nutrition.
            
            **Meal Plan Requirements:**
            ${includeMealPlan ? mealPlanInstructions : ''}

            Generate only the HTML snippet based on these instructions.
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
            if (result.candidates && result.candidates[0].content.parts[0]) {
                let text = result.candidates[0].content.parts[0].text;
                text = text.replace(/^```html\s*/, '').replace(/```$/, '');
                setPlan(text);
            } else {
                throw new Error("The AI returned an empty or invalid plan.");
            }
        } catch (err) {
            console.error("Error generating workout plan:", err);
            setError(`An error occurred: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <section id="ai-planner" className="py-16 sm:py-24 bg-gray-900">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Your Personal AI Trainer</h1>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Welcome to the future of fitness. Our advanced AI will craft a unique workout and meal plan tailored precisely to your goals and experience level. Just set your preferences below and let our AI do the rest.</p>
                </div>
                <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-2xl">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div><label htmlFor="goal" className="block text-gray-300 text-sm font-bold mb-2">Primary Goal</label><select id="goal" name="goal" value={formData.goal} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"><option>Build Muscle</option><option>Lose Fat</option><option>Improve Endurance</option><option>General Fitness</option></select></div>
                            <div><label htmlFor="level" className="block text-gray-300 text-sm font-bold mb-2">Experience Level</label><select id="level" name="level" value={formData.level} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div>
                            <div><label htmlFor="days" className="block text-gray-300 text-sm font-bold mb-2">Days per Week</label><select id="days" name="days" value={formData.days} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"><option>3</option><option>4</option><option>5</option></select></div>
                        </div>
                        <div className="flex items-center justify-center pt-2 pb-6">
                            <label htmlFor="includeMealPlan" className="mr-3 text-gray-300 text-sm font-bold">Include Meal Plan?</label>
                            <button
                                type="button"
                                onClick={() => setIncludeMealPlan(!includeMealPlan)}
                                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 ${includeMealPlan ? 'bg-blue-600' : 'bg-gray-600'}`}
                                aria-pressed={includeMealPlan}
                            >
                                <span
                                    aria-hidden="true"
                                    className={`inline-block w-5 h-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${includeMealPlan ? 'translate-x-5' : 'translate-x-0'}`}
                                />
                            </button>
                        </div>
                        <div className="text-center"><button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg w-full md:w-auto transition duration-300 inline-flex items-center justify-center disabled:bg-gray-500 disabled:cursor-not-allowed">✨ {isLoading ? 'Generating...' : 'Generate My Plan'}</button></div>
                    </form>
                    <div className="mt-8">
                         {isLoading && <div className="flex flex-col items-center justify-center text-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div><p className="mt-4 text-gray-400">Our AI trainer is building your plan...</p></div>}
                        <div className="bg-gray-800 rounded-lg border border-gray-700">
                           {plan && !error && <div id="workout-plan-result" className="p-6" dangerouslySetInnerHTML={{ __html: plan }} />}
                           {!plan && !isLoading && <p className="text-gray-500 p-6">{error || 'Your personalized workout plan will be displayed here.'}</p>}
                           {error && <p className="text-red-400 font-semibold p-6">{error}</p>}
                        </div>
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


// --- Main App Component ---

export default function App() {
  return (
    <div className="bg-gray-900 text-gray-300" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <Header />
      <main className="pt-16">
        <AIPlannerPage />
      </main>
      <Footer />
    </div>
  );
}
