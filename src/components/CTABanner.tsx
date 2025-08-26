// components/CTABanner.tsx
import React from 'react';

const CTABanner: React.FC = () => {
  return (
      <section className="cta-banner py-24 px-5 text-center bg-gradient-to-br from-[rgba(124,92,255,0.15)] to-[rgba(0,209,255,0.1)] mt-16 animate-[fadeUp_1s_ease]" id={"pricing"}>
          <div className="max-w-[1200px] mx-auto">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] bg-clip-text text-transparent">Ready to experience smarter & more accurate AI answers?</h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto">Unlock the full power of LuminaAI (DrishtiAI) with cutting-edge AI models, seamless workflows, and unlimited conversations.</p>
          </div>
          <PricingSection />
      </section>
  );
};

export default CTABanner;

const PricingSection = () => {
    return (
        <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] bg-clip-text text-transparent">
                Choose Your Plan
            </h2>
            <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
                Select the plan that works best for your AI needs. All plans include access to our growing suite of AI tools.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Free Plan */}
                <div className="bg-[#101418] rounded-2xl p-8 border border-[rgba(255,255,255,0.1)] shadow-xl transform hover:-translate-y-2 transition-transform duration-500 flex flex-col h-full">
                    <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] bg-clip-text text-transparent">Free</h3>
                        <p className="text-gray-300 mb-6">Perfect for beginners exploring AI capabilities</p>

                        <div className="mb-6">
                            <span className="text-4xl font-bold">$0</span>
                            <span className="text-gray-400">/forever</span>
                        </div>

                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>5 AI generations per day</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Basic AI models access</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Community support</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Standard processing speed</span>
                            </li>
                        </ul>
                    </div>
                    <a
                        href="#"
                        className="w-full bg-gradient-to-br from-[#7c5cff] to-[#00d1ff] hover:from-[#6a4ce6] hover:to-[#00b8e6] text-white font-medium py-3 px-6 rounded-lg text-center transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Get Started
                    </a>
                </div>

                {/* Pro Plan */}
                <div className="bg-[#101418] rounded-2xl p-8 border-2 border-[#7c5cff] shadow-xl transform hover:-translate-y-2 transition-transform duration-500 relative flex flex-col h-full">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] text-white text-sm font-semibold px-4 py-1 rounded-full">
                            Most Popular
                        </span>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] bg-clip-text text-transparent">Pro</h3>
                        <p className="text-gray-300 mb-6">For power users and small teams</p>

                        <div className="mb-6">
                            <span className="text-4xl font-bold">$15</span>
                            <span className="text-gray-400">/month</span>
                        </div>

                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Unlimited AI generations</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>All AI models access</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Priority support</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>2x faster processing</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Commercial usage rights</span>
                            </li>
                        </ul>
                    </div>
                    <a
                        href="#"
                        className="w-full bg-gradient-to-br from-[#7c5cff] to-[#00d1ff] hover:from-[#6a4ce6] hover:to-[#00b8e6] text-white font-medium py-3 px-6 rounded-lg text-center transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-[#7c5cff]/30"
                    >
                        Get Started
                    </a>
                </div>

                {/* Enterprise Plan */}
                <div className="bg-[#101418] rounded-2xl p-8 border border-[rgba(255,255,255,0.1)] shadow-xl transform hover:-translate-y-2 transition-transform duration-500 flex flex-col h-full">
                    <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] bg-clip-text text-transparent">Enterprise</h3>
                        <p className="text-gray-300 mb-6">For organizations with advanced needs</p>

                        <div className="mb-6">
                            <span className="text-4xl font-bold">Custom</span>
                        </div>

                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Everything in Pro, plus:</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Dedicated instance</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Custom AI model training</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>24/7 dedicated support</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>SLA guarantees</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>On-premise deployment options</span>
                            </li>
                        </ul>
                    </div>
                    <a
                        href="#"
                        className="w-full bg-gradient-to-br from-[#7c5cff] to-[#00d1ff] hover:from-[#6a4ce6] hover:to-[#00b8e6] text-white font-medium py-3 px-6 rounded-lg text-center transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Contact Sales
                    </a>
                </div>
            </div>
        </div>
    )
}