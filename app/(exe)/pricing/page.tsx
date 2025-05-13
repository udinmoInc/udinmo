'use client';

import { motion } from "framer-motion";
import { CheckCircle, Star, Info, ShieldCheck, Lock, CreditCard } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$5/mo",
    features: [
      "1 Website",
      "10GB SSD",
      "Free SSL",
      "Email Support",
      "Domain $54",
      "Wordpress",
      "One click installation",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$15/mo",
    features: [
      "1 Website",
      "10GB SSD",
      "Free SSL",
      "Email Support",
      "Domain $54",
      "Wordpress",
      "One click installation",
      "Backup",
      "New Apps Early access",
      "Ide",
    ],
    highlighted: true,
  },
  {
    name: "Business",
    price: "$30/mo",
    features: [
      "1 Website",
      "10GB SSD",
      "Free SSL",
      "Email Support",
      "Domain $54",
      "Wordpress",
      "One click installation",
      "Backup",
      "New Apps Early access",
      "Ide",
      "10 Domains",
    ],
    highlighted: false,
  },
];

const featureList = [
  "1 Website",
  "10GB SSD",
  "Free SSL",
  "Email Support",
  "Domain $54",
  "Wordpress",
  "One click installation",
  "Backup",
  "New Apps Early access",
  "Ide",
  "10 Domains",
];

export default function PricingPage() {
  return (
    <section className="bg-[#0b0c0d] text-white px-4 py-20">
      <div className="max-w-6xl mx-auto text-center">
  
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4"
        >
          What Plan Fits For You?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-slate-400 mb-12"
        >
          Choose the perfect plan based on your needs.
        </motion.p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-[1280px] mx-auto mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.4 }}
              className={`relative w-full max-w-[370px] mx-auto p-6 rounded-2xl shadow-2xl border border-neutral-800 transition-all hover:scale-105 ${
                plan.highlighted
                  ? "bg-[#111111] border-yellow-400"
                  : "bg-[#0b0c0d]"
              }`}
            >
              {plan.highlighted && (
                <>
                  <div className="absolute top-4 right-4 text-yellow-400">
                    <Star className="w-5 h-5" />
                  </div>
                  <div className="absolute top-4 left-4 flex items-center gap-1 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-semibold uppercase tracking-wide group">
                    Recommended
                    <div className="relative group">
                      <Info className="w-3.5 h-3.5 text-black opacity-70 cursor-pointer" />
                      <div className="absolute top-6 left-0 w-40 text-xs text-white bg-black px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                        Our best plan for growing websites.
                      </div>
                    </div>
                  </div>
                </>
              )}
              <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold mb-4">{plan.price}</div>

              <button
                className={`mb-4 w-full py-2 rounded-xl font-medium transition-all ${
                  plan.highlighted
                    ? "bg-yellow-400 text-black hover:bg-yellow-500"
                    : "bg-neutral-800 text-white hover:bg-neutral-700"
                }`}
              >
                {plan.highlighted ? "Get Pro Plan" : "Choose Plan"}
              </button>

              <ul className="space-y-2 text-sm text-slate-300 text-left">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto"
        >
          <table className="w-full table-auto border-collapse text-sm text-slate-300 mb-16">
            <thead>
              <tr>
                <th className="text-left p-4 border-b border-slate-700">Features</th>
                {plans.map((plan) => (
                  <th key={plan.name} className="text-center p-4 border-b border-slate-700">
                    <div className="text-xl font-bold">{plan.name}</div>
                    <div className="text-slate-400">{plan.price}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureList.map((feature, idx) => (
                <tr key={idx} className="border-t border-slate-800">
                  <td className="p-4 text-left">{feature}</td>
                  {plans.map((plan) => (
                    <td key={plan.name} className="text-center p-4">
                      {plan.features.includes(feature) ? (
                        <CheckCircle className="inline-block w-4 h-4 text-green-400" />
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-10 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
        >
          <div>
            <ShieldCheck className="mx-auto w-10 h-10 text-green-400" />
            <div className="mt-2 text-sm font-medium text-white">SSL Secured</div>
          </div>
          <div>
            <Lock className="mx-auto w-10 h-10 text-blue-400" />
            <div className="mt-2 text-sm font-medium text-white">End-to-End Encrypted</div>
          </div>
          <div>
            <CreditCard className="mx-auto w-10 h-10 text-yellow-400" />
            <div className="mt-2 text-sm font-medium text-white">Secure Billing</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
