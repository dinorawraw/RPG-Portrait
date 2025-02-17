import React from 'react';

interface HPBarProps {
  current: number;
  max: number;
  gradient?: boolean;
  height?: number;
  width?: number;
  showValues?: boolean;
  valueSize?: number;
  valueColor?: string;
  valueWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  valueShadow?: boolean;
  valueSpacing?: number;
}

export const HPBar: React.FC<HPBarProps> = ({ 
  current, 
  max, 
  gradient = true,
  height = 4,
  width = 100,
  showValues = false,
  valueSize = 12,
  valueColor = '#ffffff',
  valueWeight = 'bold',
  valueShadow = false,
  valueSpacing = 0
}) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  
  return (
    <div className="space-y-1">
      <div 
        className="bg-gray-700 rounded overflow-hidden mx-auto" 
        style={{ height, width: `${width}%` }}
      >
        <div
          className={`h-full transition-all duration-300 ${
            gradient 
              ? 'bg-gradient-to-r from-red-500 via-yellow-500 to-green-500' 
              : 'bg-green-500'
          }`}
          style={{
            width: `${percentage}%`,
            clipPath: gradient 
              ? `polygon(${percentage}% 0, ${percentage}% 100%, 0 100%, 0 0)` 
              : undefined
          }}
        />
      </div>
      {showValues && (
        <div 
          className="text-center transition-all"
          style={{
            fontSize: valueSize,
            color: valueColor,
            fontWeight: valueWeight,
            letterSpacing: `${valueSpacing}px`,
            textShadow: valueShadow ? '0 2px 4px rgba(0,0,0,0.5)' : 'none'
          }}
        >
          {current} / {max}
        </div>
      )}
    </div>
  );
};