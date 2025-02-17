import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Character, PortraitStyle } from './types/character';
import { CharacterPortrait } from './components/CharacterPortrait';
import { PortraitControls } from './components/PortraitControls';
import { Preview } from './components/Preview';

const defaultStyle: PortraitStyle = {
  borderColor: '#00ff00',
  borderWidth: 2,
  backgroundColor: '#000000',
  backgroundOpacity: 0.5,
  cornerRadius: 16,
  hpBarHeight: 4,
  hpBarWidth: 100,
  hpBarGradient: true,
  showHpValues: true,
  hpValueSize: 12,
  hpValueColor: '#ffffff',
  hpValueWeight: 'bold',
  hpValueShadow: true,
  hpValueSpacing: 0,
  nameColor: '#ffffff',
  nameSize: 16,
  nameFontWeight: 'bold',
  nameTextShadow: true,
  nameLetterSpacing: 0,
  nameUppercase: false,
  preserveTransparency: true,
  size: {
    width: 200,
    height: 250,
  },
};

const initialCharacters: Character[] = [
  {
    id: '1',
    name: 'Warrior',
    currentHp: 85,
    maxHp: 100,
    portraitUrl: 'https://images.unsplash.com/photo-1580936733230-4e5594b3cc6e?w=200&h=250&fit=crop',
    position: { x: 50, y: 50 },
  },
];

function App() {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [style, setStyle] = useState<PortraitStyle>(defaultStyle);

  const handlePositionChange = (id: string, x: number, y: number) => {
    setCharacters(chars =>
      chars.map(char =>
        char.id === id ? { ...char, position: { x, y } } : char
      )
    );
  };

  const handleAddCharacter = () => {
    const newChar: Character = {
      id: Date.now().toString(),
      name: `Character ${characters.length + 1}`,
      currentHp: 100,
      maxHp: 100,
      portraitUrl: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=200&h=250&fit=crop',
      position: { x: Math.random() * 200, y: Math.random() * 200 },
    };
    setCharacters([...characters, newChar]);
  };

  const handleRemoveCharacter = (id: string) => {
    setCharacters(chars => chars.filter(char => char.id !== id));
  };

  const handleCharacterUpdate = (updatedCharacter: Character) => {
    setCharacters(chars =>
      chars.map(char =>
        char.id === updatedCharacter.id ? updatedCharacter : char
      )
    );
  };

  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-gray-900 relative pb-[300px]">
          <Link 
            to="/preview" 
            className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Preview Portraits</span>
          </Link>

          {characters.map(character => (
            <CharacterPortrait
              key={character.id}
              character={character}
              style={style}
              onPositionChange={handlePositionChange}
            />
          ))}
          
          <PortraitControls
            onAddCharacter={handleAddCharacter}
            onRemoveCharacter={handleRemoveCharacter}
            onStyleChange={setStyle}
            onCharacterUpdate={handleCharacterUpdate}
            style={style}
            characters={characters}
          />
        </div>
      } />
      <Route path="/preview" element={<Preview characters={characters} style={style} />} />
    </Routes>
  );
}

export default App;