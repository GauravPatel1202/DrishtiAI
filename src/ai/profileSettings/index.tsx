import React, { useState } from 'react';

type ModelKey = 'chatgpt' | 'gemini' | 'deepseek' | 'perplexity' | 'anthropic' | 'xai';

const ProfileSettings: React.FC = () => {
    const [email, setEmail] = useState('kingp@gmail.com');
    const [fullName, setFullName] = useState('Gaurav Patel');
    const [selectedModels, setSelectedModels] = useState<Record<ModelKey, boolean>>({
        chatgpt: true,
        gemini: true,
        deepseek: true,
        perplexity: true,
        anthropic: true,
        xai: false
    });

    const handleModelToggle = (model: ModelKey) => {
        setSelectedModels(prev => ({
            ...prev,
            [model]: !prev[model]
        }));
    };

    return (
        <div className='overflow-y-auto'>
        <div className="mx-auto max-w-3xl rounded-xl shadow-md bg-gray-850">
            <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Profile Settings</h1>
                    <p className="mt-1 text-sm">Manage your profile information and AI model preferences.</p>
                </div>

                {/* Profile Information Section */}
                <section className="mb-8">
                    <h2 className="text-lg font-semibold  mb-2">Profile information</h2>
                    <p className="text-sm mb-4">Manage your basic profile details.</p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium  mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium  mb-1">Full name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-4 py-2 border  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <button className="mt-6 px-4 py-2 bg-blue-600 font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Update profile
                    </button>
                </section>

                <div className="border-t border-gray-200 my-6"></div>

                {/* AI Model Preferences Section */}
                <section className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Customize your chat AI model preferences</h2>
                    <p className="text-sm mb-4">Easily update your selections anytime in the settings</p>

                    <div className="space-y-3 mb-6">
                        {/* ChatGPT */}
                        <div className={`flex items-center justify-between p-4 rounded-lg border ${selectedModels.chatgpt ? 'border-blue-500 ' : 'border-gray-200'}`}>
                            <div>
                                <h3 className="font-medium">ChatGPT</h3>
                                <p className="text-sm">OpenAI's most capable model</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedModels.chatgpt}
                                    onChange={() => handleModelToggle('chatgpt')}
                                    className="sr-only peer"
                                />
                                <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer ${selectedModels.chatgpt ? 'peer-checked:bg-blue-600' : ''} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                            </label>
                        </div>

                        {/* Gemini */}
                        <div className={`flex items-center justify-between p-4 rounded-lg border ${selectedModels.gemini ? 'border-blue-500' : 'border-gray-200'}`}>
                            <div>
                                <h3 className="font-medium ">Gemini</h3>
                                <p className="text-sm ">Google's multimodal AI model</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedModels.gemini}
                                    onChange={() => handleModelToggle('gemini')}
                                    className="sr-only peer"
                                />
                                <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer ${selectedModels.gemini ? 'peer-checked:bg-blue-600' : ''} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                            </label>
                        </div>

                        {/* DeepSeek */}
                        <div className={`flex items-center justify-between p-4 rounded-lg border ${selectedModels.deepseek ? 'border-blue-500 ' : 'border-gray-200'}`}>
                            <div>
                                <h3 className="font-medium ">DeepSeek</h3>
                                <p className="text-sm ">DeepSeek's reasoning model</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedModels.deepseek}
                                    onChange={() => handleModelToggle('deepseek')}
                                    className="sr-only peer"
                                />
                                <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer ${selectedModels.deepseek ? 'peer-checked:bg-blue-600' : ''} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                            </label>
                        </div>

                        {/* Perplexity */}
                        <div className={`flex items-center justify-between p-4 rounded-lg border ${selectedModels.perplexity ? 'border-blue-500' : 'border-gray-200'}`}>
                            <div>
                                <h3 className="font-medium ">Perplexity</h3>
                                <p className="text-sm ">AI-powered search and reasoning</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedModels.perplexity}
                                    onChange={() => handleModelToggle('perplexity')}
                                    className="sr-only peer"
                                />
                                <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer ${selectedModels.perplexity ? 'peer-checked:bg-blue-600' : ''} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                            </label>
                        </div>

                        {/* Anthropic */}
                        <div className={`flex items-center justify-between p-4 rounded-lg border ${selectedModels.anthropic ? 'border-blue-500' : 'border-gray-200'}`}>
                            <div>
                                <h3 className="font-medium ">Anthropic</h3>
                                <p className="text-sm ">Anthropic's advanced AI assistant</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedModels.anthropic}
                                    onChange={() => handleModelToggle('anthropic')}
                                    className="sr-only peer"
                                />
                                <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer ${selectedModels.anthropic ? 'peer-checked:bg-blue-600' : ''} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                            </label>
                        </div>

                        {/* xAI */}
                        <div className={`flex items-center justify-between p-4 rounded-lg border ${selectedModels.xai ? 'border-blue-500 ' : 'border-gray-200'}`}>
                            <div>
                                <h3 className="font-medium ">xAI</h3>
                                <p className="text-sm ">xAI's conversational AI</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedModels.xai}
                                    onChange={() => handleModelToggle('xai')}
                                    className="sr-only peer"
                                />
                                <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer ${selectedModels.xai ? 'peer-checked:bg-blue-600' : ''} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                            </label>
                        </div>
                    </div>

                    <button className="px-4 py-2 bg-blue-600  font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Update preferences
                    </button>

                    {/* Premium Upgrade Section */}
                    <div className="mt-8 p-6  rounded-xl border border-blue-200">
                        <h3 className="text-lg font-semibold  mb-2">Upgrade and Unlock Premium AI Models</h3>
                        <p className="text-sm  mb-3">Access all six top AI models and enhance your experience for just $12 a month.</p>
                        <p className="text-xs  mb-4">Tips: Try not to use every AI model for smaller queries - this helps conserve tokens and ensures more meaningful results</p>
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Upgrade to Premium
                        </button>
                    </div>
                </section>

                <div className="border-t border-gray-200 my-6"></div>

                {/* Subscription Information Section */}
                <section>
                    <h2 className="text-lg font-semibold  mb-4">Subscription information</h2>

                    <div className="p-5  rounded-xl border border-gray-200 mb-4">
                        <h3 className="font-medium">Free Plan</h3>
                        <p className="text-sm  mt-1">Message limit reached</p>
                        <p className="text-sm  mt-2">Upgrade for unlimited messages</p>
                        <button className="mt-3 px-4 py-2 bg-blue-600 text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Upgrade Plan
                        </button>
                    </div>

                    <div className="p-5  rounded-xl border border-gray-200">
                        <h3 className="font-medium">Community & PromptBook (Upgrade to unlock)</h3>
                        <button className="mt-3 px-4 py-2 bg-blue-600  text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Upgrade to Unlock
                        </button>
                    </div>
                </section>
            </div>
        </div>
        </div>

    );
};

export default ProfileSettings;