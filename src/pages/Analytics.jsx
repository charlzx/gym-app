import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  AreaChart,
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';


// --- Dummy Data ---
const kpiData = {
  totalMembers: '1,284',
  avgDailyVisits: '352',
  classAttendanceRate: '82%',
  memberRetention: '91%',
};

const membershipGrowthData = [
  { month: 'Jan', newMembers: 65 },
  { month: 'Feb', newMembers: 59 },
  { month: 'Mar', newMembers: 80 },
  { month: 'Apr', newMembers: 81 },
  { month: 'May', newMembers: 56 },
  { month: 'Jun', newMembers: 75 },
  { month: 'Jul', newMembers: 90 },
  { month: 'Aug', newMembers: 85 },
  { month: 'Sep', newMembers: 110 },
  { month: 'Oct', newMembers: 120 },
  { month: 'Nov', newMembers: 130 },
  { month: 'Dec', newMembers: 150 }
];

const peakHoursData = [
  { hour: '6-8am', visits: 120 }, { hour: '8-10am', visits: 150 },
  { hour: '10am-12pm', visits: 90 }, { hour: '12-2pm', visits: 180 },
  { hour: '2-4pm', visits: 80 }, { hour: '4-6pm', visits: 250 },
  { hour: '6-8pm', visits: 310 }, { hour: '8-10pm', visits: 190 }
];

const ageDemographicsData = [
  { name: '18-24', value: 400, fill: '#3b82f6' },
  { name: '25-34', value: 540, fill: '#8b5cf6' },
  { name: '35-44', value: 240, fill: '#10b981' },
  { name: '45+', value: 104, fill: '#f97316' }
];

const classPopularityData = [
  { name: 'Power HIIT', popularity: 92, fill: '#ef4444' },
  { name: 'Spin Cycle', popularity: 85, fill: '#f97316' },
  { name: 'Yoga Flow', popularity: 78, fill: '#10b981' },
  { name: 'Powerlifting', popularity: 72, fill: '#3b82f6' },
  { name: 'Zumba', popularity: 65, fill: '#8b5cf6' }
];

const AnalyticsPage = () => {
  const [expandedChart, setExpandedChart] = useState(null);

  const renderChart = (type) => {
    switch (type) {
      case 'membership':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={membershipGrowthData}>
              <defs>
                <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis dataKey="month" stroke="#a0aec0" fontSize={12} />
              <YAxis stroke="#a0aec0" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #4a5568' }} />
              <Legend />
              <Area type="monotone" dataKey="newMembers" stroke="#3b82f6" fill="url(#colorNew)" />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'peakHours':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={peakHoursData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis dataKey="hour" stroke="#a0aec0" fontSize={12} />
              <YAxis stroke="#a0aec0" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #4a5568' }} />
              <Bar dataKey="visits" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'age':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #4a5568' }} />
              <Pie data={ageDemographicsData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label>
                {ageDemographicsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'popularity':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={classPopularityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" stroke="#a0aec0" fontSize={12} width={100} />
              <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #4a5568' }} />
              <Bar dataKey="popularity" barSize={20}>
                {classPopularityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  const ChartCard = ({ title, chartType }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative">
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <button
        onClick={() => setExpandedChart({ title, chartType })}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        ⛶
      </button>
      <div className="h-72">{renderChart(chartType)}</div>
    </div>
  );

  const KpiCard = ({ title, value, icon }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center">
        <div className="p-3 bg-gray-700 rounded-full mr-4 text-2xl">{icon}</div>
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <Header />
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl font-extrabold text-white">Analytics Dashboard</h1>
            <p className="text-gray-400 mt-2">An interactive overview of gym performance and member engagement.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <KpiCard title="Total Members" value={kpiData.totalMembers} icon="👥" />
            <KpiCard title="Avg. Daily Visits" value={kpiData.avgDailyVisits} icon="🏃" />
            <KpiCard title="Class Attendance" value={kpiData.classAttendanceRate} icon="📈" />
            <KpiCard title="Member Retention" value={kpiData.memberRetention} icon="🔄" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ChartCard title="Membership Growth (Last 12 Months)" chartType="membership" />
            <ChartCard title="Peak Usage Hours" chartType="peakHours" />
            <ChartCard title="Age Demographics" chartType="age" />
            <ChartCard title="Most Popular Classes" chartType="popularity" />
          </div>
        </section>
      </main>
      <Footer />

      {expandedChart && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[60] p-4">
          <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full h-[90vh] max-w-6xl flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-white">{expandedChart.title}</h3>
              <button onClick={() => setExpandedChart(null)} className="text-gray-400 hover:text-white">&times;</button>
            </div>
            <div className="flex-grow">{renderChart(expandedChart.chartType)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
