import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageCard from './ImageCard';

interface GeneratedImage {
  id: string;
  src: string;
  prompt: string;
  timestamp: number;
}

interface GalleryProps {
  images: GeneratedImage[];
}

export default function Gallery({ images }: GalleryProps) {
  const handleDownload = async (src: string, prompt: string) => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `ai-generated-${prompt.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  if (images.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="max-w-md mx-auto">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-400 
                     rounded-full flex items-center justify-center"
          >
            <span className="text-3xl">🎨</span>
          </motion.div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No images yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Generate your first AI image by entering a prompt above!
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Generated Images
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {images.length} image{images.length !== 1 ? 's' : ''} in your gallery
        </p>
      </div>
      
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {images.map((image) => (
            <ImageCard
              key={image.id}
              src={image.src}
              prompt={image.prompt}
              timestamp={image.timestamp}
              onDownload={() => handleDownload(image.src, image.prompt)}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}