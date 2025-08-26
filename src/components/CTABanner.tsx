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

type PlanId = 'free' | 'pro' | 'enterprise';

interface PricingSectionProps {
    disabledPlans?: PlanId[];
}

const PricingSection: React.FC<PricingSectionProps> = ({ disabledPlans = ["pro", "enterprise"] }) => {
    const plans = [
        {
            id: 'free',
            name: 'Free',
            description: 'Perfect for beginners exploring AI capabilities',
            price: '$0',
            period: '/forever',
            features: [
                'AI generations',
                'Basic AI models access',
                'Community support',
                'Standard processing speed'
            ],
            buttonText: 'Get Started',
            popular: false,
            border: 'border-2 border-[#7c5cff]'
        },
        {
            id: 'pro',
            name: 'Pro',
            description: 'For power users and small teams',
            price: '$5',
            period: '/year',
            features: [
                'Unlimited AI generations',
                'All AI models access',
                'Priority support',
                '2x faster processing',
                'Commercial usage rights'
            ],
            buttonText: 'Get Started',
            popular: true,
            border: 'border border-[rgba(255,255,255,0.1)]'
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            description: 'For organizations with advanced needs',
            price: 'Custom',
            period: '',
            features: [
                'Everything in Pro, plus:',
                'Dedicated instance',
                'Custom AI model training',
                '24/7 dedicated support',
                'SLA guarantees',
                'On-premise deployment options'
            ],

            popular: false,
            border: 'border border-[rgba(255,255,255,0.1)]'
        }
    ];

    const isDisabled = (planId: PlanId) => disabledPlans.includes(planId);

    return (
        <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] bg-clip-text text-transparent">
                Choose Your Plan
            </h2>
            <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
                Select the plan that works best for your AI needs. All plans include access to our growing suite of AI tools.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {plans.map((plan: any) => {
                    const disabled = isDisabled(plan.id);

                    return (
                        <div
                            key={plan.id}
                            className={`bg-[#101418] rounded-2xl p-8 ${plan.border} shadow-xl flex flex-col h-full ${disabled
                                ? 'opacity-70 grayscale cursor-not-allowed'
                                : 'transform hover:-translate-y-2 transition-transform duration-500'
                                }`}
                        >
                            {plan.popular && !disabled && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] text-white text-sm font-semibold px-4 py-1 rounded-full">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            {disabled && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-gray-500 to-gray-400 text-white text-sm font-semibold px-4 py-1 rounded-full">
                                        Coming Soon
                                    </span>
                                </div>
                            )}

                            <div className="flex-1">
                                <h3 className={`text-2xl font-semibold mb-2 ${disabled
                                    ? 'text-gray-400'
                                    : 'bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] bg-clip-text text-transparent'
                                    }`}>
                                    {plan.name}
                                </h3>
                                <p className={`mb-6 ${disabled ? 'text-gray-500' : 'text-gray-300'}`}>
                                    {plan.description}
                                </p>

                                <div className="mb-6">
                                    <span className={`text-4xl font-bold ${disabled ? 'text-gray-400' : ''}`}>
                                        {plan.price}
                                    </span>
                                    <span className={`${disabled ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {plan.period}
                                    </span>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature: any, index: number) => (
                                        <li key={index} className="flex items-start">
                                            <svg
                                                className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${disabled ? 'text-gray-500' : 'text-[#00d1ff]'
                                                    }`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className={disabled ? 'text-gray-500' : ''}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {disabled ? (
                                <button
                                    disabled
                                    className="w-full bg-gradient-to-br from-gray-500 to-gray-400 text-white font-medium py-3 px-6 rounded-lg text-center cursor-not-allowed opacity-70"
                                >
                                    Coming Soon
                                </button>
                            ) : (
                                    <a
                                        href="#"
                                        className="w-full bg-gradient-to-br from-[#7c5cff] to-[#00d1ff] hover:from-[#6a4ce6] hover:to-[#00b8e6] text-white font-medium py-3 px-6 rounded-lg text-center transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        {plan.buttonText}
                                    </a>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
