'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, MessageCircle, Sun, TrendingUp, Zap, Clock } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import { whatsappLink } from '@/lib/constants';

const STATES = ['Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Uttar Pradesh', 'Gujarat', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Other'];

const TARIFF: Record<string, number> = {
  'Madhya Pradesh': 7.5,
  'Maharashtra': 9.0,
  'Rajasthan': 8.0,
  'Uttar Pradesh': 7.0,
  'Gujarat': 6.5,
  'Delhi': 8.5,
  'Karnataka': 7.0,
  'Tamil Nadu': 8.0,
  'Other': 7.5,
};

const SUBSIDY: Record<string, number> = {
  '1': 18000,
  '2': 30000,
  '3': 78000,
};

interface CalcResult {
  systemSize: number;
  annualSavings: number;
  roi: number;
  payback: number;
  subsidy: number;
  netCost: number;
  totalSavings25: number;
  monthlyGen: number;
}

export default function CalculatorPage() {
  const [bill, setBill] = useState('');
  const [state, setState] = useState('Madhya Pradesh');
  const [type, setType] = useState('Residential');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');

  const calculate = () => {
    const billAmt = parseInt(bill);
    if (!billAmt || billAmt < 100) return;

    const tariff = TARIFF[state] || 7.5;
    const monthlyUnits = billAmt / tariff;
    const systemKw = Math.max(1, Math.ceil(monthlyUnits / 120));
    const cappedKw = Math.min(systemKw, type === 'Residential' ? 10 : 500);
    const annualGen = cappedKw * 1500; // ~1500 kWh/kW/year in India
    const annualSavings = Math.round(annualGen * tariff);
    const subsidyKw = Math.min(cappedKw, 3);
    const subsidy = type === 'Residential' ? (SUBSIDY[String(Math.min(Math.ceil(subsidyKw), 3))] || 78000) : 0;
    const grossCost = cappedKw * 65000;
    const netCost = grossCost - subsidy;
    const payback = parseFloat((netCost / annualSavings).toFixed(1));
    const roi = parseFloat(((annualSavings / netCost) * 100).toFixed(1));
    const totalSavings25 = annualSavings * 25 - netCost;

    setResult({ systemSize: cappedKw, annualSavings, roi, payback, subsidy, netCost, totalSavings25, monthlyGen: Math.round(annualGen / 12) });
    setShowLeadForm(true);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!result) return;
    const msg = `Hello RJ Power Solutions! 🌞\n\nSolar Calculator Report Request:\nName: ${leadName}\nPhone: ${leadPhone}\nState: ${state}\nProperty: ${type}\nMonthly Bill: ₹${bill}\n\nEstimated Results:\n⚡ System Size: ${result.systemSize} kW\n💰 Annual Savings: ₹${result.annualSavings.toLocaleString('en-IN')}\n📈 ROI: ${result.roi}%\n⏱ Payback: ${result.payback} years\n🏛️ Subsidy: ₹${result.subsidy.toLocaleString('en-IN')}\n\nPlease send me a detailed report and quote!`;
    window.open(whatsappLink(msg), '_blank');
  };

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-blue text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-solar-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="badge bg-white/10 text-white border-white/20 mb-6">
              <Calculator size={14} /> Solar Savings Calculator
            </div>
            <h1 className="section-title text-white mb-4">Calculate Your<br /><span className="text-solar-orange">Solar Savings</span></h1>
            <p className="text-blue-100 max-w-xl mx-auto text-lg">
              Enter your monthly electricity bill and get an instant, accurate estimate of your solar savings, system size, and payback period.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section className="section-padding bg-solar-grey">
        <div className="container-custom max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-2xl p-8 shadow-card"
            >
              <h2 className="font-poppins font-bold text-xl text-solar-dark mb-6 flex items-center gap-2">
                <Calculator size={20} className="text-solar-orange" />
                Enter Your Details
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-solar-dark mb-2 font-poppins">Monthly Electricity Bill (₹) *</label>
                  <input
                    type="number"
                    value={bill}
                    onChange={e => setBill(e.target.value)}
                    placeholder="e.g. 3000"
                    className="input-field text-lg"
                    min="100"
                  />
                  <p className="text-xs text-gray-400 mt-1">Enter your average monthly bill including all taxes</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-solar-dark mb-2 font-poppins">State</label>
                  <select value={state} onChange={e => setState(e.target.value)} className="input-field">
                    {STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-solar-dark mb-2 font-poppins">Property Type</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Residential', 'Commercial', 'Industrial'].map(t => (
                      <button
                        key={t}
                        onClick={() => setType(t)}
                        className={`py-3 px-2 rounded-xl text-sm font-semibold font-poppins border-2 transition-all ${
                          type === t ? 'border-solar-orange bg-solar-orange-tint text-solar-orange' : 'border-gray-200 text-gray-500 hover:border-solar-orange'
                        }`}
                      >
                        {t === 'Residential' ? '🏠' : t === 'Commercial' ? '🏢' : '🏭'} {t}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={calculate}
                  disabled={!bill || parseInt(bill) < 100}
                  className="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Calculator size={18} /> Calculate Savings
                </button>
              </div>
            </motion.div>

            {/* Results */}
            {result ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-5"
              >
                <div className="bg-white rounded-2xl p-6 shadow-card">
                  <h3 className="font-poppins font-bold text-solar-dark text-lg mb-5 flex items-center gap-2">
                    <Sun size={18} className="text-solar-orange" /> Your Solar Report
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Zap, label: 'System Size', value: `${result.systemSize} kW`, color: 'text-solar-orange' },
                      { icon: TrendingUp, label: 'Annual Savings', value: `₹${result.annualSavings.toLocaleString('en-IN')}`, color: 'text-green-600' },
                      { icon: Clock, label: 'Payback Period', value: `${result.payback} yrs`, color: 'text-solar-blue' },
                      { icon: TrendingUp, label: 'ROI', value: `${result.roi}% / yr`, color: 'text-purple-600' },
                    ].map(({ icon: Icon, label, value, color }) => (
                      <div key={label} className="bg-solar-grey rounded-xl p-4 text-center">
                        <Icon size={18} className={`${color} mx-auto mb-2`} />
                        <div className={`font-poppins font-bold text-xl ${color}`}>{value}</div>
                        <div className="text-xs text-gray-500 mt-1">{label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 space-y-3">
                    <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                      <span className="text-gray-500">Monthly Generation</span>
                      <span className="font-semibold font-poppins">{result.monthlyGen} kWh</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                      <span className="text-gray-500">Govt. Subsidy (Residential)</span>
                      <span className="font-semibold font-poppins text-green-600">₹{result.subsidy.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                      <span className="text-gray-500">Net Investment</span>
                      <span className="font-semibold font-poppins">₹{result.netCost.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2">
                      <span className="text-gray-500">25-Year Net Profit</span>
                      <span className="font-bold font-poppins text-green-600 text-base">₹{result.totalSavings25.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Lead Form */}
                {showLeadForm && (
                  <div className="bg-solar-orange rounded-2xl p-6 text-white">
                    <h3 className="font-poppins font-bold text-lg mb-2">📩 Get Detailed Report</h3>
                    <p className="text-orange-100 text-sm mb-4">Get a detailed PDF report + exact quote via WhatsApp</p>
                    <form onSubmit={handleLeadSubmit} className="space-y-3">
                      <input
                        type="text"
                        required
                        value={leadName}
                        onChange={e => setLeadName(e.target.value)}
                        placeholder="Your Name *"
                        className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 text-sm outline-none focus:bg-white/30"
                      />
                      <input
                        type="tel"
                        required
                        value={leadPhone}
                        onChange={e => setLeadPhone(e.target.value)}
                        placeholder="Phone Number *"
                        className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 text-sm outline-none focus:bg-white/30"
                      />
                      <button type="submit" className="w-full bg-white text-solar-orange font-poppins font-bold py-3 rounded-xl hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                        <MessageCircle size={16} /> Send Report via WhatsApp
                      </button>
                    </form>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-white rounded-2xl p-8 shadow-card flex flex-col items-center justify-center text-center"
              >
                <div className="text-6xl mb-4">☀️</div>
                <h3 className="font-poppins font-bold text-solar-dark text-xl mb-3">Ready to See Your Savings?</h3>
                <p className="text-gray-500 mb-6">Fill in your details and hit Calculate to see how much you can save with solar energy.</p>
                <div className="grid grid-cols-2 gap-4 w-full">
                  {['Free Consultation', 'Accurate Results', 'Subsidy Info', 'Instant Report'].map(f => (
                    <div key={f} className="bg-solar-grey rounded-xl p-4 text-center text-sm font-semibold font-poppins text-solar-dark">
                      ✅ {f}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <div className="badge mb-5">How It Works</div>
          <h2 className="section-title mb-12">From Bill to Solar<br /><span className="gradient-text-orange">in 3 Simple Steps</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { step: '1', title: 'Enter Your Bill', desc: 'Enter your monthly electricity bill and select your state and property type.' },
              { step: '2', title: 'Get Instant Results', desc: 'We calculate system size, savings, payback period, and subsidy eligibility.' },
              { step: '3', title: 'Claim Your Savings', desc: 'Share your details via WhatsApp to get a detailed quote and book a free site visit.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-solar-orange text-white font-poppins font-extrabold text-2xl flex items-center justify-center mb-5 shadow-solar">
                  {step}
                </div>
                <h3 className="font-poppins font-bold text-solar-dark text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
