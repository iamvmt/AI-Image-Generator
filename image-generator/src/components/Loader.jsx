import React from 'react';
import { motion } from 'framer-motion';

export default function Loader() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12"
        >
            <div className="relative">
                {/* Outer ring */}
                <motion.div
                    className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Inner ring */}
                <motion.div
                    className="absolute inset-2 w-12 h-12 border-4 border-t-purple-600 border-r-transparent 
                                     border-b-transparent border-l-transparent rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Center dot */}
                <motion.div
                    className="absolute inset-6 w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
            </div>
            
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-center"
            >
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Creating your image...
                </p>
                <motion.p
                    className="text-sm text-gray-500 dark:text-gray-400 mt-1"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    This usually takes 10-30 seconds
                </motion.p>
            </motion.div>
        </motion.div>
    );
}