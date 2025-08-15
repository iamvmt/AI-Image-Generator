import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Shuffle } from 'lucide-react';

const styles = [
    { value: '', label: 'Default' },
    { value: ', photorealistic, high quality, detailed', label: 'Realistic' },
    { value: ', anime style, manga, cel shaded', label: 'Anime' },
    { value: ', cyberpunk, neon, futuristic, digital art', label: 'Cyberpunk' },
    { value: ', oil painting, renaissance style, classical art', label: 'Classical' },
    { value: ', watercolor, soft brush strokes, artistic', label: 'Watercolor' },
    { value: ', pixel art, 8-bit, retro gaming style', label: 'Pixel Art' }
];

const sizes = [
    { value: '256x256', label: '256×256' },
    { value: '512x512', label: '512×512' },
    { value: '768x768', label: '768×768' }
];

const randomPrompts = [
    'A majestic dragon soaring through clouds at sunset',
    'A cozy cabin in a snowy forest with warm lights',
    'A futuristic city with flying cars and neon signs',
    'A beautiful garden with exotic flowers and butterflies',
    'A mysterious lighthouse on a rocky cliff during a storm',
    'A peaceful lake with mountains reflected in the water',
    'A steampunk airship floating above Victorian buildings',
    'A magical forest with glowing mushrooms and fireflies'
];

export default function PromptInput({ onGenerate, isGenerating }) {
    const [prompt, setPrompt] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('');
    const [selectedSize, setSelectedSize] = useState('512x512');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (prompt.trim()) {
            onGenerate(prompt, selectedStyle, selectedSize);
        }
    };

    const handleRandomPrompt = () => {
        const randomPrompt = randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
        setPrompt(randomPrompt);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl mx-auto"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe your image..."
                        className="w-full h-24 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl 
                                         text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                         resize-none transition-all duration-200"
                        disabled={isGenerating}
                    />
                    <motion.button
                        type="button"
                        onClick={handleRandomPrompt}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute top-2 right-2 p-2 text-gray-500 hover:text-purple-600 
                                         transition-colors duration-200"
                        disabled={isGenerating}
                    >
                        <Shuffle size={20} />
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Style
                        </label>
                        <select
                            value={selectedStyle}
                            onChange={(e) => setSelectedStyle(e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 
                                             rounded-xl text-gray-800 dark:text-white focus:outline-none 
                                             focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                             transition-all duration-200"
                            disabled={isGenerating}
                        >
                            {styles.map((style) => (
                                <option key={style.value} value={style.value} className="bg-gray-800 text-white">
                                    {style.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Size
                        </label>
                        <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 
                                             rounded-xl text-gray-800 dark:text-white focus:outline-none 
                                             focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                             transition-all duration-200"
                            disabled={isGenerating}
                        >
                            {sizes.map((size) => (
                                <option key={size.value} value={size.value} className="bg-gray-800 text-white">
                                    {size.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!prompt.trim() || isGenerating}
                    className="w-full py-4 px-8 bg-gradient-to-r from-purple-600 to-pink-600 
                                     text-white font-semibold rounded-xl shadow-lg 
                                     hover:from-purple-700 hover:to-pink-700 
                                     disabled:opacity-50 disabled:cursor-not-allowed
                                     transition-all duration-200 flex items-center justify-center gap-2"
                >
                    <Wand2 size={20} />
                    {isGenerating ? 'Generating...' : 'Generate Image'}
                </motion.button>
            </form>
        </motion.div>
    );
}
