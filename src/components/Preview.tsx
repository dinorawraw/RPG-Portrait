import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Character, PortraitStyle } from '../types/character';
import { CharacterPortrait } from './CharacterPortrait';

interface PreviewProps {
  characters: Character[];
  style: PortraitStyle;
}

export const Preview: React.FC<PreviewProps> = ({ characters, style }) => {
  return (
    <div className="min-h-screen bg-[url('/checkerboard.png')] p-8">
      <Link 
        to="/" 
        className="fixed top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Editor</span>
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-16">
        {characters.map(character => (
          <div key={character.id} className="relative" style={{ 
            width: style.size.width, 
            height: style.size.height 
          }}>
            <CharacterPortrait
              character={{
                ...character,
                position: { x: 0, y: 0 }
              }}
              style={style}
              onPositionChange={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  );
};