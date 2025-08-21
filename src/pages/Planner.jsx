import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import html2pdf from 'html2pdf.js';

// --- End Placeholder Components ---


const AIPlannerPage = () => {
    const [formData, setFormData] = useState({ goal: 'Build Muscle', level: 'Beginner', days: '3' });
    const [includeMealPlan, setIncludeMealPlan] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [plan, setPlan] = useState('');
    const [error, setError] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    const [showSaveModal, setShowSaveModal] = useState(false);
    const planResultRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCopy = async () => {
        if (!planResultRef.current) return;
        try {
            // Using innerText gets the visible text, which is better for copying
            await navigator.clipboard.writeText(planResultRef.current.innerText);
            setCopySuccess('Plan copied to clipboard!');
            setTimeout(() => setCopySuccess(''), 3000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            setCopySuccess('Failed to copy plan.');
             setTimeout(() => setCopySuccess(''), 3000);
        }
    };
    
    const handleDownloadPDF = () => {
        if (!planResultRef.current) return;
        setIsLoading(true);

        const element = planResultRef.current;
        const elementToPrint = element.cloneNode(true);
        
        elementToPrint.classList.add('print-container');

        // --- FIX: Add these lines to hide the cloned element from view ---
        // By positioning it off-screen, we prevent the "flash" on the UI.
        const styleForHiding = {       // Makes it fully transparent as an extra precaution
        };
        Object.assign(elementToPrint.style, styleForHiding);
        // --- End of FIX ---

        // Now, this line will append a hidden element instead of a visible one.
        document.body.appendChild(elementToPrint);

        const style = document.createElement('style');
        style.id = 'temp-print-style';
        // --- TWEAK: Adjusted styles for the new card layout to ensure clean PDF output ---
        style.innerHTML = `
            .print-container {
                padding: 20px;
                background-color: #ffffff !important;
            }
            .print-container, .print-container * {
                color: #000000 !important;
                background-color: #ffffff !important;
                border-color: #dddddd !important;
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
            /* Style for the new exercise and meal cards in the PDF */
            .print-container .exercise-card, .print-container .meal-card {
                border: 1px solid #cccccc !important;
                padding: 12px !important;
                margin-bottom: 12px !important;
                page-break-inside: avoid; /* Prevents cards from splitting across pages */
            }
            .print-container a {
                color: #0000EE !important; 
                text-decoration: underline !important;
            }
            .print-container .no-print {
                display: none !important;
            }
        `;
        document.head.appendChild(style);

        const opt = {
            margin:       0.5,
            filename:     'Gym-Workout-Plan.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { 
                scale: 2, 
                useCORS: true, 
                logging: false,
                onclone: (doc) => {
                    const printStyle = doc.getElementById('temp-print-style');
                    if (printStyle) {
                        doc.head.appendChild(printStyle.cloneNode(true));
                    }
                }
            },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' },
            pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
        };

        html2pdf().from(elementToPrint).set(opt).save()
            .catch(err => {
                console.error("PDF generation failed:", err);
                setError('Failed to generate PDF. Please try again.');
            })
            .finally(() => {
                document.body.removeChild(elementToPrint);
                const tempStyle = document.getElementById('temp-print-style');
                if (tempStyle) {
                    document.head.removeChild(tempStyle);
                }
                setIsLoading(false);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setPlan('');
        setError('');

        const apiKey = "";
        if (apiKey === "YOUR_API_KEY_HERE") {
            setError("Please add your Google AI API key to the code.");
            setIsLoading(false);
            return;
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        // --- FIX: The prompt is updated to generate a mobile-friendly card layout instead of a table. ---
        const prompt = `
        You are an expert fitness coach and a creative web designer specializing in responsive, mobile-first design. Create a visually appealing and detailed workout plan based on the user's choices, formatted entirely as a single HTML snippet using Tailwind CSS classes. The output must NOT use <table>, <thead>, <tbody>, <th>, or <tr> tags.

        User's Goal: ${formData.goal}
        User's Experience Level: ${formData.level}
        Days per week: ${formData.days}
        Include Meal Plan: ${includeMealPlan}

        **Instructions:**
        1.  **Main Container:** Wrap the entire plan in a <div class="space-y-8">.
        2.  **Introduction:** Start with a friendly, encouraging paragraph (<p class="text-gray-300 mb-6">).
        3.  **Workout Day Structure:** For each workout day:
            * Start with a title: <h3 class="text-2xl font-bold text-white mb-4">Day 1: Upper Body Strength</h3> (customize the title).
            * Create a list of exercises using a <div class="space-y-4">.
            * **For each exercise, create a responsive card:**
                * Use this exact wrapper: <div class="exercise-card bg-gray-800 rounded-lg p-4 border border-gray-700">.
                * Inside the card, create a grid layout: <div class="grid grid-cols-2 gap-x-4 gap-y-3">.
                * **Exercise Name:** Must be in the first column, spanning the full width: <div class="col-span-2 font-bold text-white text-lg">Bench Press</div>.
                * **Sets & Reps:** Display the label and value in two columns: <div class="text-gray-400">Sets & Reps</div><div class="text-right text-white font-medium">3 sets of 8-12 reps</div>.
                * **Video Link:** Display the label and value in two columns: <div class="text-gray-400">Tutorial</div><div class="text-right"><a href="https://www.youtube.com/results?search_query=${'exercise'}+tutorial" target="_blank" class="text-blue-400 hover:underline">Watch Video</a></div>.
        4.  **Meal Plan (If requested):**
            * If 'Include Meal Plan' is true, add a meal plan section after the workout.
            * Start with a title: <h2 class='text-3xl font-bold text-white mt-10 mb-4 text-center'>Complementary Meal Plan</h2>.
            * For each workout day, provide a meal plan. Start with a day title like <h4 class="text-xl font-bold text-white mb-3">Day 1 Meals</h4>.
            * Use a card for each meal with this exact wrapper: <div class="meal-card bg-gray-800 rounded-lg p-4 border border-gray-700 mb-4">.
            * Inside the meal card, structure it like this: <strong class="text-white text-lg">Breakfast</strong><p class="text-gray-300 mt-1">Oatmeal with berries, nuts, and a scoop of protein powder.</p>.
        5.  **Final Note:** Conclude with a final encouraging note about consistency, rest, and listening to one's body, wrapped in a <p class="text-gray-400 mt-8 text-center">.

        Generate only the raw HTML snippet. Do not include \`\`\`html or any other markdown formatting.
        `;

        const payload = { contents: [{ parts: [{ text: prompt }] }] };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `API Error: ${response.status}`);
            }
            const result = await response.json();
            if (result.candidates && result.candidates[0].content.parts[0]) {
                let text = result.candidates[0].content.parts[0].text;
                // Clean up potential markdown artifacts
                text = text.replace(/^```html\s*/, '').replace(/```$/, '');
                setPlan(text);
            } else {
                throw new Error("The AI returned an empty or invalid plan.");
            }
        } catch (err) {
            console.error("Error generating workout plan:", err);
            setError(`An error occurred: ${err.message}. Check your API key and network connection.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="ai-planner" className="py-24 sm:py-32 bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Your Personal AI Trainer</h1>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Craft a unique workout plan tailored to your goals. Just set your preferences and let our AI do the rest.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            {/* Form Inputs */}
                            <div>
                                <label htmlFor="goal" className="block text-gray-300 text-sm font-bold mb-2">Primary Goal</label>
                                <select id="goal" name="goal" value={formData.goal} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Build Muscle</option>
                                    <option>Lose Fat</option>
                                    <option>Improve Endurance</option>
                                    <option>General Fitness</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="level" className="block text-gray-300 text-sm font-bold mb-2">Experience Level</label>
                                <select id="level" name="level" value={formData.level} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Beginner</option>
                                    <option>Intermediate</option>
                                    <option>Advanced</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="days" className="block text-gray-300 text-sm font-bold mb-2">Days per Week</label>
                                <select id="days" name="days" value={formData.days} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                        </div>

                        {/* <div className="flex items-center justify-center pt-2 pb-6">
                            <label htmlFor="includeMealPlan" className="mr-3 text-gray-300 text-sm font-bold">Include Meal Plan?</label>
                            <button type="button" onClick={() => setIncludeMealPlan(!includeMealPlan)} className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 ${includeMealPlan ? 'bg-blue-600' : 'bg-gray-600'}`}>
                                <span aria-hidden="true" className={`inline-block w-5 h-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${includeMealPlan ? 'translate-x-5' : 'translate-x-0'}`} />
                            </button>
                        </div> */}
                        
                        <div className="text-center">
                            <button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg w-full md:w-auto transition-all duration-300 inline-flex items-center justify-center disabled:bg-gray-500 disabled:cursor-not-allowed transform hover:scale-105">
                                 {isLoading ? (
                                     <>
                                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                         </svg>
                                         Generating...
                                     </>
                                 ) : ( '✨ Generate My Plan' )}
                            </button>
                        </div>
                    </form>
                    
                    {/* --- Results Section --- */}
                    <div className="mt-10">
                         {isLoading && !plan && (
                            <div className="flex flex-col items-center justify-center text-center">
                                <p className="mt-4 text-gray-400">Our AI trainer is building your personalized plan...</p>
                            </div>
                        )}
                        
                        <div className="bg-gray-900/50 rounded-lg border border-gray-700">
                             {plan && !error ? (
                                <div ref={planResultRef} className="p-4 sm:p-6" dangerouslySetInnerHTML={{ __html: plan }} />
                            ) : (
                                <p className="text-gray-500 p-6 text-center">
                                    {error ? (
                                        <span className="text-red-400 font-semibold">{error}</span>
                                    ) : (
                                        'Your personalized workout plan will appear here.'
                                    )}
                                </p>
                            )}
                        </div>

                        {plan && !error && !isLoading && (
                            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 relative">
                                <button onClick={handleCopy} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors w-full sm:w-auto text-center">Copy Plan</button>
                                <button onClick={handleDownloadPDF} disabled={isLoading} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors w-full sm:w-auto text-center disabled:bg-gray-500">Download PDF</button>
                                <button onClick={() => setShowSaveModal(true)} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors w-full sm:w-auto text-center">Save to Profile</button>
                                {copySuccess && <p className="text-green-400 text-sm absolute -bottom-6 animate-pulse">{copySuccess}</p>}
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

export default function App() {
    return (
        <div className="bg-gray-900 text-gray-300" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            <Header />
            <main>
                <AIPlannerPage />
            </main>
            <Footer />
        </div>
    );
}
