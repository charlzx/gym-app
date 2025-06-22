import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MembershipTier = ({ tier, billingCycle }) => {
  const { name, monthlyPrice, yearlyPrice, features, popular } = tier;
  const isYearly = billingCycle === 'yearly';
  const price = isYearly ? yearlyPrice : monthlyPrice;

  const popularStyles = popular
    ? 'border-4 border-blue-500 relative transform scale-105'
    : 'border-2 border-gray-700';

  return (
    <div className={`bg-gray-800 p-8 rounded-2xl shadow-lg flex flex-col ${popularStyles} transition-transform duration-300`}>
      {popular && (
        <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
            <span className="bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase">Most Popular</span>
        </div>
      )}
      <h3 className="text-2xl font-bold text-white text-center">{name}</h3>
      <div className="mt-4 text-center text-white">
        <span className="text-5xl font-extrabold">₦{price.toLocaleString()}</span>
        <span className="text-lg text-gray-400">/{isYearly ? 'year' : 'month'}</span>
      </div>
      <ul className="mt-8 space-y-4 text-gray-300 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full mt-10 font-bold py-3 px-6 rounded-lg transition-colors duration-300 ${popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}>
        Choose Plan
      </button>
    </div>
  );
};

const WhyChooseUs = () => {
    const advantages = [
        { icon: '🕒', title: '24/7 Access', description: 'Workout on your schedule, not ours. Our doors are always open for members.' },
        { icon: '⭐', title: 'Expert Trainers', description: 'Our certified trainers are here to guide you and help you achieve your goals safely.' },
        { icon: '🏋️', title: 'Premium Equipment', description: 'State-of-the-art equipment from leading brands to maximize your workout.' },
        { icon: '🤝', title: 'Vibrant Community', description: 'Join a supportive and motivating community of like-minded fitness enthusiasts.' }
    ];

    return (
        <div className="mt-24">
            <h2 className="text-3xl font-bold text-white text-center mb-12">The SMART Advantage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {advantages.map(adv => (
                    <div key={adv.title} className="bg-gray-800 p-6 rounded-lg text-center">
                        <div className="text-4xl mb-4">{adv.icon}</div>
                        <h3 className="text-xl font-bold text-white mb-2">{adv.title}</h3>
                        <p className="text-gray-400 text-sm">{adv.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


const ComparisonTable = ({ tiers }) => {
    const allFeatures = [
        'Full Gym Access (Off-Peak Hours)',
        '24/7 Full Gym Access',
        'Standard Locker Room Access',
        'Online Community Access',
        'Initial Fitness Assessment',
        'Unlimited Group Fitness Classes',
        'Access to Sauna & Steam Room',
        'Discount on Merchandise',
        '1 Monthly Guest Pass',
        'Unlimited Guest Passes',
        'Towel Service Included',
        '2 Personal Training Sessions/Month',
        'Priority Class Booking'
    ];

    const Checkmark = () => <svg className="w-6 h-6 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>;
    const Cross = () => <svg className="w-6 h-6 text-gray-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>;

    return (
        <div className="mt-24">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Compare All Features</h2>
            <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
                <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs text-white uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-4 w-1/3">Feature</th>
                            {tiers.map(tier => <th key={tier.name} scope="col" className="px-6 py-4 text-center">{tier.name}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {allFeatures.map((feature, index) => (
                            <tr key={feature} className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700/50'} border-b border-gray-700`}>
                                <td className="px-6 py-4 font-medium whitespace-nowrap">{feature}</td>
                                {tiers.map(tier => (
                                    <td key={`${tier.name}-${feature}`} className="px-6 py-4 text-center">
                                        {tier.features.includes(feature) ? <Checkmark /> : <Cross />}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Testimonials = () => {
    const testimonials = [
        { name: "Adebayo S.", quote: "The All-Access Plus plan is perfect. The 24/7 hours fit my crazy schedule and the community here is incredibly motivating.", img: "https://source.unsplash.com/100x100/?man,smiling,gym" },
        { name: "Chiamaka O.", quote: "I was new to fitness, and the Basic Access plan was a great start. The initial assessment helped me get on the right track without feeling overwhelmed.", img: "https://source.unsplash.com/100x100/?woman,smiling,gym" },
        { name: "Musa I.", quote: "The VIP Premium plan is worth every Naira. The personal training sessions have completely transformed my results.", img: "https://source.unsplash.com/100x100/?person,fitness" }
    ];

    return (
        <div className="mt-24">
            <h2 className="text-3xl font-bold text-white text-center mb-12">What Our Members Are Saying</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {testimonials.map(t => (
                    <div key={t.name} className="bg-gray-800 p-8 rounded-2xl shadow-lg flex flex-col items-center text-center">
                        <img src={t.img} alt={t.name} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-500" />
                        <p className="text-gray-400 flex-grow">"{t.quote}"</p>
                        <h4 className="mt-6 text-lg font-bold text-white">- {t.name}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

const FaqItem = ({ item, isOpen, onClick }) => (
    <div className="bg-gray-800 rounded-lg">
        <button onClick={onClick} className="faq-question w-full flex justify-between items-center text-left text-lg font-semibold text-white p-6 focus:outline-none" aria-expanded={isOpen}>
            <span>{item.q}</span>
            <svg className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div className={`faq-answer overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
            <p className="text-gray-400 p-6 pt-0">{item.a}</p>
        </div>
    </div>
);

const MembershipFaq = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const faqData = [
        { q: "What is your cancellation policy?", a: "We believe in flexibility. You can cancel your membership anytime with a 30-day notice. No hassle, no questions asked." },
        { q: "Can I pause my membership if I travel?", a: "Yes! All our plans can be frozen for up to 3 months per calendar year. Just speak to our front desk staff to arrange it." },
        { q: "Are there any hidden fees?", a: "Absolutely not. The price you see is the price you pay. We pride ourselves on transparency." },
        { q: "How do guest passes work?", a: "Guest passes allow you to bring a friend to work out with you. Plus and VIP members get monthly passes to share the fitness love." }
    ];
    
    return (
        <div className="mt-24">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Membership Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
                {faqData.map((item, index) => (
                    <FaqItem key={index} item={item} isOpen={openIndex === index} onClick={() => setOpenIndex(openIndex === index ? null : index)} />
                ))}
            </div>
        </div>
    );
};

const MembershipPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const tiers = [
    {
      name: 'Basic Access',
      monthlyPrice: 20000,
      yearlyPrice: 200000, // Approx. 2 months free
      features: [
        'Full Gym Access (Off-Peak Hours)',
        'Standard Locker Room Access',
        'Online Community Access',
        'Initial Fitness Assessment'
      ],
      popular: false
    },
    {
      name: 'All-Access Plus',
      monthlyPrice: 35000,
      yearlyPrice: 350000, // Approx. 2 months free
      features: [
        '24/7 Full Gym Access',
        'Unlimited Group Fitness Classes',
        'Access to Sauna & Steam Room',
        '1 Monthly Guest Pass',
        'Discount on Merchandise'
      ],
      popular: true
    },
    {
      name: 'VIP Premium',
      monthlyPrice: 55000,
      yearlyPrice: 550000, // Approx. 2 months free
      features: [
        'All Features of Plus Plan',
        '2 Personal Training Sessions/Month',
        'Unlimited Guest Passes',
        'Towel Service Included',
        'Priority Class Booking'
      ],
      popular: false
    }
  ];

  return (
    <div className="bg-gray-900" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <Header />
      <section id="membership" className="py-16 sm:py-24 pt-30">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Membership Plans</h1>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Choose the plan that fits your lifestyle. No hidden fees, no commitments. Cancel anytime.</p>
          </div>

          {/* Pricing Toggle */}
          <div className="flex justify-center items-center space-x-4 mb-12">
            <span className={`font-semibold transition-colors ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 ${billingCycle === 'yearly' ? 'bg-blue-600' : 'bg-gray-600'}`}
              aria-pressed={billingCycle === 'yearly'}
            >
              <span
                aria-hidden="true"
                className={`inline-block w-5 h-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${billingCycle === 'yearly' ? 'translate-x-5' : 'translate-x-0'}`}
              />
            </button>
            <span className={`font-semibold transition-colors ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-500'}`}>
              Yearly <span className="text-green-400 text-xs">(Save ~16%)</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {tiers.map((tier) => (
              <MembershipTier key={tier.name} tier={tier} billingCycle={billingCycle} />
            ))}
          </div>
          
          <WhyChooseUs />
          <ComparisonTable tiers={tiers} />
          <Testimonials />
          <MembershipFaq />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MembershipPage;
