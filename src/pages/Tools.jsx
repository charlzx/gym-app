import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';


// --- Original Unit Toggle ---
const UnitToggle = ({ unit, onToggle, labels }) => (
  <div className="flex items-center justify-end">
    <span className={`text-sm font-bold ${unit === labels[0] ? 'text-white' : 'text-gray-500'}`}>{labels[0]}</span>
    <button
      type="button"
      onClick={onToggle}
      className={`relative inline-flex flex-shrink-0 h-6 w-11 mx-2 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 ${unit === labels[1] ? 'bg-blue-600' : 'bg-gray-600'}`}
    >
      <span
        aria-hidden="true"
        className={`inline-block w-5 h-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${unit === labels[1] ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
    <span className={`text-sm font-bold ${unit === labels[1] ? 'text-white' : 'text-gray-500'}`}>{labels[1]}</span>
  </div>
);

// --- BMI Calculator ---
const BMICalculator = () => {
  const [heightCm, setHeightCm] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBmi = (e) => {
    e.preventDefault();
    const weightInKg = weightUnit === 'lbs' ? weight / 2.20462 : parseFloat(weight);
    let heightInMeters;

    if (heightUnit === 'cm') {
      heightInMeters = parseFloat(heightCm) / 100;
    } else {
      const totalInches = (parseInt(heightFt) * 12) + parseInt(heightIn);
      heightInMeters = totalInches * 0.0254;
    }

    if (heightInMeters > 0 && weightInKg > 0) {
      const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);
      if (bmiValue < 18.5) setCategory('Underweight');
      else if (bmiValue < 24.9) setCategory('Normal weight');
      else if (bmiValue < 29.9) setCategory('Overweight');
      else setCategory('Obesity');
    }
  };

  return (
    <div>
      <form onSubmit={calculateBmi} className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold text-gray-400">Height</label>
            <UnitToggle unit={heightUnit} onToggle={() => setHeightUnit(prev => prev === 'cm' ? 'ft/in' : 'cm')} labels={['cm', 'ft/in']} />
          </div>
          {heightUnit === 'cm' ? (
            <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 180" required />
          ) : (
            <div className="flex gap-4">
              <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="w-1/2 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white" placeholder="e.g., 5" required />
              <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="w-1/2 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white" placeholder="e.g., 9" required />
            </div>
          )}
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold text-gray-400">Weight</label>
            <UnitToggle unit={weightUnit} onToggle={() => setWeightUnit(prev => prev === 'kg' ? 'lbs' : 'kg')} labels={['kg', 'lbs']} />
          </div>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white" placeholder={`e.g., ${weightUnit === 'kg' ? '75' : '165'}`} required />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">Calculate BMI</button>
      </form>
      {bmi && (
        <div className="mt-8 text-center p-6 bg-gray-900 rounded-lg">
          <p className="text-gray-400 text-lg">Your BMI is</p>
          <p className="text-5xl font-extrabold text-white my-2">{bmi}</p>
          <p className="text-lg font-semibold text-blue-400">{category}</p>
        </div>
      )}
    </div>
  );
};

// --- BMR Calculator ---
const BMRCalculator = () => {
  const [bmrData, setBmrData] = useState({ weight: '', age: '', gender: 'male' });
  const [heightCm, setHeightCm] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [bmr, setBmr] = useState(null);

  const calculateBmr = (e) => {
    e.preventDefault();
    const { weight, age, gender } = bmrData;
    const weightInKg = weightUnit === 'lbs' ? weight / 2.20462 : parseFloat(weight);
    let heightInCm;

    if (heightUnit === 'cm') {
      heightInCm = parseFloat(heightCm);
    } else {
      const totalInches = (parseInt(heightFt) * 12) + parseInt(heightIn);
      heightInCm = totalInches * 2.54;
    }

    if (weightInKg > 0 && heightInCm > 0 && age > 0) {
      let bmrValue = gender === 'male'
        ? 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5
        : 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
      setBmr(bmrValue.toFixed(0));
    }
  };

  const handleChange = (e) => {
    setBmrData({ ...bmrData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={calculateBmr} className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold text-gray-400">Weight</label>
            <UnitToggle unit={weightUnit} onToggle={() => setWeightUnit(prev => prev === 'kg' ? 'lbs' : 'kg')} labels={['kg', 'lbs']} />
          </div>
          <input type="number" name="weight" value={bmrData.weight} onChange={handleChange} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold text-gray-400">Height</label>
            <UnitToggle unit={heightUnit} onToggle={() => setHeightUnit(prev => prev === 'cm' ? 'ft/in' : 'cm')} labels={['cm', 'ft/in']} />
          </div>
          {heightUnit === 'cm' ? (
            <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
          ) : (
            <div className="flex gap-4">
              <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="w-1/2 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
              <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="w-1/2 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
            </div>
          )}
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-bold text-gray-400 mb-2">Age</label>
          <input type="number" id="age" name="age" value={bmrData.age} onChange={handleChange} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-bold text-gray-400 mb-2">Gender</label>
          <select id="gender" name="gender" value={bmrData.gender} onChange={handleChange} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg">Calculate BMR</button>
      </form>
      {bmr && (
        <div className="mt-8 text-center p-6 bg-gray-900 rounded-lg">
          <p className="text-gray-400 text-lg">Your estimated Basal Metabolic Rate is</p>
          <p className="text-5xl font-extrabold text-white my-2">{bmr}</p>
          <p className="text-lg font-semibold text-blue-400">calories/day (at rest)</p>
        </div>
      )}
    </div>
  );
};

// --- One-Rep Max Calculator ---
const OneRepMaxCalculator = () => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [oneRepMax, setOneRepMax] = useState(null);

  const calculate1RM = (e) => {
    e.preventDefault();
    if (weight > 0 && reps > 0) {
      const weightInKg = weightUnit === 'lbs' ? weight / 2.20462 : weight;
      const max = weightInKg / (1.0278 - 0.0278 * reps);
      setOneRepMax(max.toFixed(1));
    }
  };

  return (
    <div>
      <form onSubmit={calculate1RM} className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold text-gray-400">Weight Lifted</label>
            <UnitToggle unit={weightUnit} onToggle={() => setWeightUnit(prev => prev === 'kg' ? 'lbs' : 'kg')} labels={['kg', 'lbs']} />
          </div>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
        </div>
        <div>
          <label htmlFor="reps" className="block text-sm font-bold text-gray-400 mb-2">Repetitions</label>
          <input type="number" id="reps" value={reps} onChange={(e) => setReps(e.target.value)} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg">Calculate 1RM</button>
      </form>
      {oneRepMax && (
        <div className="mt-8 text-center p-6 bg-gray-900 rounded-lg">
          <p className="text-gray-400 text-lg">Your estimated One-Rep Max is</p>
          <p className="text-5xl font-extrabold text-white my-2">{oneRepMax} kg</p>
          <p className="text-lg font-semibold text-blue-400">on this exercise</p>
        </div>
      )}
    </div>
  );
};

// --- Page Wrapper ---
const ToolsPage = () => {
  const [activeTab, setActiveTab] = useState('bmi');
  const tabs = [
    { id: 'bmi', label: 'BMI Calculator', component: <BMICalculator /> },
    { id: 'bmr', label: 'BMR Calculator', component: <BMRCalculator /> },
    { id: '1rm', label: 'One-Rep Max', component: <OneRepMaxCalculator /> }
  ];

  return (
    <div className="bg-gray-900 min-h-screen" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <Header />
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">Fitness Tools & Calculators</h1>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Track your progress and get valuable insights into your fitness journey with our set of easy-to-use calculators.</p>
          </div>
          <div className="max-w-xl mx-auto">
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row border-b border-gray-700">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 px-6 font-semibold transition-colors duration-300 ${activeTab === tab.id ? 'text-white border-b-2 border-blue-500' : 'text-gray-500 hover:text-white'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-2xl p-8">
              {tabs.find(tab => tab.id === activeTab).component}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ToolsPage;
