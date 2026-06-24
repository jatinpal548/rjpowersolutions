'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator, Sun, TrendingUp, Zap, Clock,
  CheckCircle2, Building2, Factory, Home, Leaf, ArrowRight,
  ShieldCheck, PhoneCall, Download, ChevronDown, IndianRupee
} from 'lucide-react';
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

interface YearlyProjection {
  year: number;
  savings: number;
  cumulativeSavings: number;
  netProfit: number;
}

interface CalcResult {
  monthlyEnergyKwh: number;
  systemSize: number;
  annualGeneration: number;
  monthlySavings: number;
  annualSavings: number;
  subsidy: number;
  grossCost: number;
  netCost: number;
  payback: number;
  totalSavings25: number;
  co2Reduction: number;
  roi: number;
  projections: YearlyProjection[];
}

export default function CalculatorPage() {
  const [bill, setBill] = useState('');
  const [state, setState] = useState('Madhya Pradesh');
  const [type, setType] = useState('Residential');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculate = () => {
    const billAmt = parseInt(bill);
    if (!billAmt || billAmt < 100) return;

    setIsCalculating(true);

    // Simulate a brief calculation loading state for better UX
    setTimeout(() => {
      // 1. Estimated Monthly Energy Consumption (kWh)
      const tariff = TARIFF[state] || 7.5;
      const monthlyUnits = billAmt / tariff;

      // 2. Recommended Solar System Size (kW)
      // Assuming 1 kW produces roughly 120 units/month (varies slightly by state)
      const rawSystemKw = monthlyUnits / 120;
      // Round to 1 decimal place, minimum 1kW. Cap commercial at 500kW, residential at 15kW
      let systemKw = Math.max(1, Math.round(rawSystemKw * 10) / 10);
      if (type === 'Residential') systemKw = Math.min(systemKw, 15);
      if (type === 'Commercial' || type === 'Industrial') systemKw = Math.min(systemKw, 500);

      // 3. Annual Energy Generation (kWh)
      // Benchmark: 1500 kWh per kW per year in Central India
      const annualGeneration = systemKw * 1500;

      // 4. Monthly & Annual Savings (₹)
      const annualSavings = annualGeneration * tariff;
      const monthlySavings = annualSavings / 12;

      // 5. Net Installation Cost & Subsidy
      // Benchmark Cost: ₹65,000 per kW (scales slightly cheaper for very large commercial)
      let costPerKw = 65000;
      if (systemKw > 10) costPerKw = 60000;
      if (systemKw > 50) costPerKw = 55000;
      if (systemKw > 100) costPerKw = 50000;

      const grossCost = systemKw * costPerKw;

      // Subsidy: Only residential gets PM Surya Ghar subsidy
      let subsidy = 0;
      if (type === 'Residential') {
        if (systemKw >= 3) subsidy = 78000;
        else if (systemKw >= 2) subsidy = 60000;
        else subsidy = 30000;
      }

      const netCost = grossCost - subsidy;

      // 6. Payback Period & CO2
      const payback = parseFloat((netCost / annualSavings).toFixed(1));
      // Factor: 0.85 kg CO2 avoided per kWh
      const co2Reduction = parseFloat(((annualGeneration * 0.85) / 1000).toFixed(1)); // in Tons

      // 7. 25-Year Projections (5% tariff inflation, 0.5% degradation)
      const projections: YearlyProjection[] = [];
      let currentTariff = tariff;
      let currentGeneration = annualGeneration;
      let cumulativeSavings = 0;

      for (let year = 1; year <= 25; year++) {
        const yearSavings = currentGeneration * currentTariff;
        cumulativeSavings += yearSavings;

        projections.push({
          year,
          savings: Math.round(yearSavings),
          cumulativeSavings: Math.round(cumulativeSavings),
          netProfit: Math.round(cumulativeSavings - netCost)
        });

        currentTariff *= 1.05; // 5% electricity cost inflation
        currentGeneration *= 0.995; // 0.5% panel degradation
      }

      const totalSavings25 = projections[24].netProfit;
      const roi = parseFloat(((annualSavings / netCost) * 100).toFixed(1));

      setResult({
        monthlyEnergyKwh: Math.round(monthlyUnits),
        systemSize: systemKw,
        annualGeneration: Math.round(annualGeneration),
        monthlySavings: Math.round(monthlySavings),
        annualSavings: Math.round(annualSavings),
        subsidy,
        grossCost: Math.round(grossCost),
        netCost: Math.round(netCost),
        payback,
        totalSavings25,
        co2Reduction,
        roi,
        projections
      });
      setIsCalculating(false);
    }, 600);
  };

  // Helper for formatting currency
  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakh`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <PageWrapper>
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#F8FAF7] overflow-hidden">
        {/* Soft Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E8F5EE] rounded-bl-full opacity-60 pointer-events-none blur-3xl"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FEF2ED] rounded-full opacity-50 pointer-events-none blur-3xl"></div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Left Column: Typography */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 mb-6">
                <Zap size={16} className="text-[#16A34A]" />
                <span className="text-[#16A34A] font-bold text-sm tracking-wide">Solar Savings Calculator</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold text-[#111827] mb-6 tracking-tight leading-[1.1] font-poppins">
                Calculate Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#E66E00]">Solar Savings</span> in <br />
                30 Seconds
              </h1>

              <p className="text-[#64748B] text-lg md:text-xl font-medium mb-8 leading-relaxed max-w-lg">
                Discover your ideal solar system size, estimated monthly savings, government subsidy benefits, and ROI instantly.
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-3">
                {[
                  { text: 'Instant Results', icon: Clock },
                  { text: 'Government Subsidy Included', icon: ShieldCheck },
                  { text: 'Commercial & Industrial Ready', icon: Building2 },
                ].map((chip, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full shadow-sm border border-gray-100 text-[#111827] text-sm font-semibold">
                    <CheckCircle2 size={16} className="text-[#16A34A]" /> {chip.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Illustration & Floating Cards */}
            <div className="relative w-full h-[500px] lg:h-[600px] hidden md:block">
              {/* Central Illustration (We'll use the existing commercial image or a stylized setup) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="relative w-full h-full scale-110 lg:scale-[1.3] xl:scale-[1.6] 2xl:scale-[1.7]"
                >
                  <Image
                    src="/calculator-hero-img.png"
                    alt="Solar Building Group"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
                    priority
                  />

                </motion.div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CALCULATOR SECTION */}
      <section className="py-20 bg-white relative" id="calculator">
        <div className="container-custom max-w-6xl overflow-hidden">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start w-full">

            {/* Left: Calculator Form (40% roughly lg:col-span-5) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 sticky top-28">
                <h2 className="font-poppins font-bold text-2xl text-[#111827] mb-8 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F5EE] flex items-center justify-center">
                    <Calculator size={18} className="text-[#16A34A]" />
                  </div>
                  Enter Your Details
                </h2>

                <div className="space-y-6">
                  {/* Bill Input */}
                  <div>
                    <label className="block text-sm font-bold text-[#111827] mb-2 font-poppins">Monthly Electricity Bill (₹) *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                      <input
                        type="number"
                        value={bill}
                        onChange={e => setBill(e.target.value)}
                        placeholder="e.g. 5000"
                        className="w-full pl-8 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 outline-none transition-all text-base min-h-[48px] font-medium text-[#111827]"
                        min="100"
                      />
                    </div>
                    <p className="text-xs text-[#64748B] mt-2 font-medium">Enter your average monthly bill including all taxes</p>
                  </div>

                  {/* State Dropdown */}
                  <div>
                    <label className="block text-sm font-bold text-[#111827] mb-2 font-poppins">State</label>
                    <div className="relative">
                      <select
                        value={state}
                        onChange={e => setState(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 outline-none transition-all appearance-none text-base min-h-[48px] text-[#111827] font-medium bg-white"
                      >
                        {STATES.map(s => <option key={s}>{s}</option>)}
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Property Type Segmented Control */}
                  <div>
                    <label className="block text-sm font-bold text-[#111827] mb-3 font-poppins">Property Type</label>
                    <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2 bg-[#F8FAF7] p-1.5 rounded-xl border border-gray-100">
                      {[
                        { id: 'Residential', icon: Home },
                        { id: 'Commercial', icon: Building2 },
                        { id: 'Industrial', icon: Factory }
                      ].map(t => {
                        const Icon = t.icon;
                        const isActive = type === t.id;
                        return (
                          <button
                            key={t.id}
                            onClick={() => setType(t.id)}
                            className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-lg text-sm font-bold transition-all ${isActive
                              ? 'bg-[#16A34A] text-white shadow-md transform scale-[1.02]'
                              : 'text-[#64748B] hover:bg-white hover:shadow-sm'
                              }`}
                          >
                            <Icon size={18} className={isActive ? "text-white" : "text-gray-400"} />
                            {t.id}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Calculate Button */}
                  <button
                    onClick={calculate}
                    disabled={!bill || parseInt(bill) < 100 || isCalculating}
                    className="w-full mt-4 bg-gradient-to-r from-[#16A34A] to-[#22C55E] text-white font-bold rounded-2xl py-4 flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(22,163,74,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-h-[52px] text-base shadow-md"
                  >
                    {isCalculating ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Calculator size={20} /> Calculate Savings
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-[#64748B] font-medium flex items-center justify-center gap-1 mt-2">
                    <ShieldCheck size={14} className="text-[#16A34A]" /> 100% Secure • No Spam • Instant Results
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Results / Preview (60% roughly lg:col-span-7) */}
            <div className="lg:col-span-7 w-full overflow-hidden">
              <AnimatePresence mode="wait">
                {!result ? (
                  // Preview Placeholder State
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-[#F8FAF7] rounded-3xl p-10 h-full flex flex-col justify-center items-center text-center border border-gray-100"
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                      <Sun size={32} className="text-[#F97316]" />
                    </div>
                    <h3 className="font-poppins font-bold text-2xl text-[#111827] mb-3">Your Solar Savings Preview</h3>
                    <p className="text-[#64748B] font-medium mb-10 max-w-sm">
                      Enter your details on the left to generate a personalized, real-time solar report.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mb-10">
                      {[
                        { title: 'Free Consultation', desc: 'Expert guidance from our solar experts', icon: PhoneCall },
                        { title: 'Accurate Savings Estimate', desc: 'Real-time calculations with subsidy benefits', icon: Calculator },
                        { title: 'Subsidy Insights', desc: 'Central & State subsidy information', icon: ShieldCheck },
                        { title: 'Instant PDF Report', desc: 'Detailed report sent to your email', icon: Download },
                      ].map((item, i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl shadow-sm text-left border border-gray-50 flex flex-col gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#E8F5EE] flex items-center justify-center">
                            <item.icon size={18} className="text-[#16A34A]" />
                          </div>
                          <div>
                            <div className="font-bold text-[#111827] text-sm mb-1">{item.title}</div>
                            <div className="text-xs text-[#64748B] leading-relaxed">{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="w-full max-w-sm opacity-50 pointer-events-none mix-blend-multiply">
                      <Image src="/hero-3d-house.png" alt="Illustration" width={400} height={200} className="w-full h-auto" />
                    </div>
                  </motion.div>
                ) : (
                  // Calculated Results State
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-poppins font-bold text-xl text-[#111827]">Estimated Results</h3>
                      <span className="inline-flex items-center gap-1.5 bg-[#E8F5EE] text-[#16A34A] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        <div className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></div>
                        Real-time calculation
                      </span>
                    </div>
                    <p className="text-sm text-[#64748B] font-medium -mt-4 mb-4">Based on industry averages for {state}.</p>

                    {/* 4 Dashboard Metric Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Card 1 */}
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex items-start gap-4 w-full overflow-hidden">
                        <div className="w-12 h-12 rounded-xl bg-[#E8F5EE] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <IndianRupee size={24} className="text-[#16A34A]" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs text-[#64748B] font-bold uppercase tracking-wider mb-1 truncate">Monthly Savings</div>
                          <div className="font-poppins font-bold text-xl md:text-3xl text-[#111827] leading-none mb-1 break-words">
                            ₹{result.monthlySavings.toLocaleString('en-IN')}
                          </div>
                          <div className="text-xs text-[#16A34A] font-semibold truncate">Estimated Savings</div>
                        </div>
                      </div>

                      {/* Card 2 */}
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex items-start gap-4 w-full overflow-hidden">
                        <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <Zap size={24} className="text-[#3B82F6]" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs text-[#64748B] font-bold uppercase tracking-wider mb-1 truncate">System Size</div>
                          <div className="font-poppins font-bold text-xl md:text-3xl text-[#111827] leading-none mb-1 break-words">
                            {result.systemSize} kW
                          </div>
                          <div className="text-xs text-[#3B82F6] font-semibold truncate">Recommended Size</div>
                        </div>
                      </div>

                      {/* Card 3 */}
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex items-start gap-4 w-full overflow-hidden">
                        <div className="w-12 h-12 rounded-xl bg-[#FEF2ED] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <TrendingUp size={24} className="text-[#F97316]" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs text-[#64748B] font-bold uppercase tracking-wider mb-1 truncate">Payback Period</div>
                          <div className="font-poppins font-bold text-xl md:text-3xl text-[#111827] leading-none mb-1 break-words">
                            {result.payback} Years
                          </div>
                          <div className="text-xs text-[#F97316] font-semibold truncate">Return on Investment</div>
                        </div>
                      </div>

                      {/* Card 4 */}
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex items-start gap-4 w-full overflow-hidden">
                        <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <Leaf size={24} className="text-[#22C55E]" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs text-[#64748B] font-bold uppercase tracking-wider mb-1 truncate">CO₂ Reduction</div>
                          <div className="font-poppins font-bold text-xl md:text-3xl text-[#111827] leading-none mb-1 break-words">
                            {result.co2Reduction} Tons
                          </div>
                          <div className="text-xs text-[#22C55E] font-semibold truncate">Annual Env. Impact</div>
                        </div>
                      </div>
                    </div>

                    {/* Financial Summary Table */}
                    <div className="bg-[#F8FAF7] rounded-2xl p-6 border border-gray-100 mt-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-[#64748B] font-medium">Estimated Gross Cost</span>
                          <span className="font-bold text-[#111827]">₹{result.grossCost.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-4">
                          <span className="text-[#64748B] font-medium">Applicable Subsidy</span>
                          <span className="font-bold text-[#16A34A] bg-[#E8F5EE] px-2 py-0.5 rounded">
                            - ₹{result.subsidy.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-2">
                          <span className="font-bold text-[#111827]">Net Payable Amount</span>
                          <span className="font-poppins font-bold text-xl md:text-2xl text-[#111827] break-words">
                            ₹{result.netCost.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* 3. ANALYTICS SECTION (Only visible after calculation) */}
      <AnimatePresence>
        {result && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 bg-white border-t border-gray-50"
          >
            <div className="container-custom max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Chart 1: Savings Growth (Visual Approximation) */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
                  <h4 className="font-bold text-[#111827] mb-1">Savings Growth Over Time</h4>
                  <p className="text-xs text-[#64748B] mb-6">With 5% annual tariff increase</p>

                  <div className="flex-grow flex items-end gap-1 h-40 relative">
                    {/* CSS Line Chart visualization using bars with border-radius to simulate curve points */}
                    {result.projections.filter((p, i) => i % 5 === 0 || i === 24).map((p, i, arr) => {
                      const maxSavings = arr[arr.length - 1].savings;
                      const heightPct = (p.savings / maxSavings) * 100;
                      return (
                        <div key={p.year} className="flex-1 flex flex-col items-center justify-end h-full group">
                          <div className="w-full relative flex items-end justify-center" style={{ height: `${heightPct}%` }}>
                            {/* Line dot */}
                            <div className="w-3 h-3 rounded-full bg-[#16A34A] z-10 absolute top-0 group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(22,163,74,0.5)]"></div>
                            {/* Area under curve */}
                            <div className="w-full h-full bg-gradient-to-t from-[#16A34A]/20 to-[#16A34A]/5 rounded-t-sm"></div>
                            {/* Tooltip */}
                            <div className="absolute -top-8 bg-[#111827] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
                              ₹{p.savings.toLocaleString('en-IN')}
                            </div>
                          </div>
                          <div className="text-[10px] text-[#64748B] mt-2 font-medium">Yr {p.year}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Chart 2: 25-Year ROI */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
                  <h4 className="font-bold text-[#111827] mb-1">25-Year ROI Projection</h4>
                  <div className="font-poppins font-bold text-2xl text-[#16A34A] mb-6">{formatCurrency(result.totalSavings25)} <span className="text-sm font-medium text-[#64748B]">Total Profit</span></div>

                  <div className="flex-grow flex items-end gap-1.5 h-32">
                    {/* CSS Bar Chart */}
                    {result.projections.filter((p, i) => i % 2 === 0).map((p) => {
                      const maxProfit = result.totalSavings25;
                      const heightPct = Math.max(2, (p.netProfit / maxProfit) * 100);
                      const isNegative = p.netProfit < 0;
                      return (
                        <div key={p.year} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                          {/* Tooltip */}
                          <div className="absolute -top-8 bg-[#111827] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-20">
                            Yr {p.year}: {formatCurrency(p.netProfit)}
                          </div>
                          <div
                            className={`w-full rounded-t-sm transition-all duration-500 ${isNegative ? 'bg-[#EF4444]/60' : 'bg-[#16A34A]/80 group-hover:bg-[#16A34A]'}`}
                            style={{ height: `${Math.abs(heightPct)}%` }}
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-[10px] text-[#64748B] mt-3 font-medium text-center">Break-even at Year {Math.ceil(result.payback)}</div>
                </div>

                {/* Chart 3: Energy Production */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#F97316] opacity-5 rounded-full blur-2xl"></div>
                  <h4 className="font-bold text-[#111827] mb-1 z-10">Energy Production</h4>
                  <div className="font-poppins font-bold text-3xl text-[#111827] mb-1 z-10">{result.annualGeneration.toLocaleString()} kWh</div>
                  <p className="text-xs text-[#64748B] mb-6 z-10">Annual Generation Capacity</p>

                  <div className="relative w-32 h-32 z-10">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      <path
                        className="text-gray-100"
                        strokeWidth="3"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#16A34A] drop-shadow-sm"
                        strokeDasharray="85, 100"
                        strokeWidth="3"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-bold text-xl text-[#111827]">85%</span>
                      <span className="text-[8px] font-bold text-[#64748B] uppercase">Efficiency</span>
                    </div>
                  </div>
                </div>

              </div>
              <p className="text-center text-xs text-[#64748B] mt-6 flex items-center justify-center gap-1">
                <ShieldCheck size={14} className="text-[#16A34A]" /> Actual results may vary based on location, roof orientation, shading, and electricity usage patterns.
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 4. TRUST SECTION */}
      <section className="py-20 bg-[#F8FAF7]">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-poppins font-bold text-3xl md:text-4xl text-[#111827] mb-4">
                Trusted By Businesses Across Central India
              </h2>
              <p className="text-[#64748B] font-medium mb-10 text-lg">
                From residential rooftops to large-scale industrial complexes, we deliver high-performance solar solutions.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: 'Housing Societies', img: '/hero-3d-commercial.png' },
                  { title: 'Residential Homes', img: '/hero-3d-house.png' },
                ].map((item, i) => (
                  <div key={i} className="group">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-white border border-gray-100 shadow-sm">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="font-bold text-[#111827] text-sm text-center">{item.title}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '500+', label: 'Installations', icon: Sun, color: 'text-[#F97316]' },
                { value: '₹2 Cr+', label: 'Monthly Client Savings', icon: IndianRupee, color: 'text-[#16A34A]' },
                { value: '25 MW+', label: 'Installed Capacity', icon: Zap, color: 'text-[#3B82F6]' },
                { value: '98%', label: 'Client Satisfaction', icon: ShieldCheck, color: 'text-[#22C55E]' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4 ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                  <div className="font-poppins font-bold text-3xl text-[#111827] mb-1">{stat.value}</div>
                  <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. LEAD GENERATION SECTION */}
      <section className="py-24 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="bg-gradient-to-br from-[#E8F5EE] to-[#DCFCE7] rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden border border-[#16A34A]/20">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <h2 className="font-poppins font-extrabold text-4xl text-[#111827] mb-4">
                  Want an Exact <br /><span className="text-[#F97316]">Solar Proposal?</span>
                </h2>
                <p className="text-[#111827]/70 font-medium mb-8 text-lg">
                  Get a free site assessment and customized engineering quotation tailored to your roof.
                </p>

                <div className="flex flex-col md:flex-row gap-3">
                  <a
                    href={whatsappLink(`Hello! I used the calculator and want a free site assessment. My estimated bill is ₹${bill || '...'}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto bg-[#16A34A] text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 hover:bg-[#15803d] hover:-translate-y-1 hover:shadow-lg transition-all min-h-[48px]"
                  >
                    Get Free Consultation <ArrowRight size={18} />
                  </a>
                  <a
                    href="tel:+919876543210"
                    className="w-full md:w-auto bg-white text-[#111827] font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 hover:-translate-y-1 hover:shadow-md transition-all border border-gray-200 min-h-[48px]"
                  >
                    <PhoneCall size={18} /> Call Now
                  </a>
                </div>
              </div>

              <div className="hidden md:flex flex-col gap-5 justify-center pl-8">
                {[
                  'Expert Site Assessment',
                  'Custom System Design',
                  'Best Price Guarantee',
                  'Hassle-Free Installation'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white">
                    <div className="w-8 h-8 rounded-full bg-[#16A34A] flex items-center justify-center text-white shrink-0">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="font-bold text-[#111827]">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
