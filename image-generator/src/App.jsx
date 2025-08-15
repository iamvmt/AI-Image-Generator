import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Github, ExternalLink, AlertCircle } from 'lucide-react';
import PromptInput from './components/PromptInput';
import Gallery from './components/Gallery';
import Loader from './components/Loader';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [images, setImages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [isDark, setIsDark] = useState(false);

  // Load images from localStorage on mount
  useEffect(() => {
    const savedImages = localStorage.getItem('ai-generated-images');
    if (savedImages) {
      try {
        setImages(JSON.parse(savedImages));
      } catch (error) {
        console.error('Failed to load saved images:', error);
      }
    }

    // Load theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Save images to localStorage whenever images change
  useEffect(() => {
    localStorage.setItem('ai-generated-images', JSON.stringify(images));
  }, [images]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  const generateImage = async (prompt, style, size) => {
    const apiKey = import.meta.env.VITE_HF_API_KEY;
    
    if (!apiKey) {
      setError('Please add your Hugging Face API key to the .env file');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const fullPrompt = prompt + style;
      
      const response = await fetch(
        'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: fullPrompt,
            parameters: {
              num_inference_steps: 20,
              guidance_scale: 7.5
            }
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your Hugging Face API key.');
        } else if (response.status === 503) {
          throw new Error('Model is currently loading. Please try again in a moment.');
       } else if (response.status === 404) {
         throw new Error('Model not found. The AI model might be temporarily unavailable.');
        } else {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      const newImage = {
        id: Date.now().toString(),
        src: imageUrl,
        prompt: prompt,
        timestamp: Date.now(),
      };

      setImages(prev => [newImage, ...prev]);
    } catch (error) {
      console.error('Failed to generate image:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
        : 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100'
    }`}>
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            animate={{ 
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Sparkles className="text-purple-600 dark:text-purple-400" size={40} />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 
                         via-pink-600 to-blue-600 bg-clip-text text-transparent">
              AI Image Generator
            </h1>
            <Sparkles className="text-pink-600 dark:text-pink-400" size={40} />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Transform your imagination into stunning visuals using advanced AI technology.
            Powered by Stable Diffusion 2.
          </motion.p>
        </motion.header>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto mb-8 p-4 bg-red-100 dark:bg-red-900/30 
                     border border-red-300 dark:border-red-700 rounded-xl flex items-center gap-3"
          >
            <AlertCircle className="text-red-600 dark:text-red-400" size={20} />
            <p className="text-red-800 dark:text-red-300">{error}</p>
          </motion.div>
        )}

        {/* Prompt Input */}
        <div className="mb-16">
          <PromptInput onGenerate={generateImage} isGenerating={isGenerating} />
        </div>

        {/* Loading */}
        {isGenerating && (
          <div className="mb-16">
            <Loader />
          </div>
        )}

        {/* Gallery */}
        <Gallery images={images} />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 pt-8 border-t border-white/20 text-center"
        >
          <div className="flex items-center justify-center gap-6 text-gray-600 dark:text-gray-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-purple-600 dark:hover:text-purple-400 
                       transition-colors duration-200"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <a
              href="https://netlify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-purple-600 dark:hover:text-purple-400 
                       transition-colors duration-200"
            >
              <ExternalLink size={18} />
              <span>Netlify</span>
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            Built with React, Tailwind CSS, and Framer Motion
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
