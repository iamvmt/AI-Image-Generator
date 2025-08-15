import React from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar } from 'lucide-react';

// ImageCard component props: src (string), prompt (string), timestamp (number), onDownload (function)

export default function ImageCard({ src, prompt, timestamp, onDownload }) {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden 
               border border-white/20 hover:border-white/30 transition-all duration-300"
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={src}
          alt={prompt}
          className="w-full h-full object-cover transition-transform duration-500 
                   group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 
                      transition-all duration-300" />
        
        {/* Download button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onDownload}
          className="absolute top-3 right-3 p-3 bg-purple-600 hover:bg-purple-700 
                   text-white rounded-full shadow-lg transition-all duration-300
                   border-2 border-white/20 backdrop-blur-sm z-10"
        >
          <Download size={18} />
        </motion.button>
      </div>
      
      {/* Card content */}
      <div className="p-4 space-y-2">
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 leading-relaxed">
          {prompt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Calendar size={12} />
            <span>{formatDate(timestamp)}</span>
          </div>
          
          {/* Additional download button in card footer */}
          <motion.button
            onClick={onDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white 
                     text-xs rounded-full transition-all duration-200 flex items-center gap-1"
          >
            <Download size={12} />
            <span>Download</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}