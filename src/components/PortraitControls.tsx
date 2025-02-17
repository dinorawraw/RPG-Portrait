import React, { useState } from 'react';
import { Settings, Plus, Trash2, Image, User, Heart, Type } from 'lucide-react';
import { Character, PortraitStyle } from '../types/character';

interface PortraitControlsProps {
  onAddCharacter: () => void;
  onRemoveCharacter: (id: string) => void;
  onStyleChange: (style: PortraitStyle) => void;
  onCharacterUpdate: (character: Character) => void;
  style: PortraitStyle;
  characters: Character[];
}

export const PortraitControls: React.FC<PortraitControlsProps> = ({
  onAddCharacter,
  onRemoveCharacter,
  onStyleChange,
  onCharacterUpdate,
  style,
  characters,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'style' | 'character' | 'text' | 'hp'>('style');

  const currentCharacter = characters.find(c => c.id === selectedCharacter);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
      <div className="max-w-7xl mx-auto p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span className="font-bold">Controls</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('style')}
              className={`px-3 py-1 rounded ${
                activeTab === 'style' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              Style
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`px-3 py-1 rounded ${
                activeTab === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              Text
            </button>
            <button
              onClick={() => setActiveTab('hp')}
              className={`px-3 py-1 rounded ${
                activeTab === 'hp' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              HP
            </button>
            <button
              onClick={() => setActiveTab('character')}
              className={`px-3 py-1 rounded ${
                activeTab === 'character' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              Character
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {activeTab === 'style' ? (
            <>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium">Border Color</label>
                  <input
                    type="color"
                    value={style.borderColor}
                    onChange={(e) =>
                      onStyleChange({ ...style, borderColor: e.target.value })
                    }
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium">Border Width</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={style.borderWidth}
                    onChange={(e) =>
                      onStyleChange({ ...style, borderWidth: Number(e.target.value) })
                    }
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium">Corner Radius</label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={style.cornerRadius}
                    onChange={(e) =>
                      onStyleChange({ ...style, cornerRadius: Number(e.target.value) })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Background Opacity</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={style.backgroundOpacity * 100}
                    onChange={(e) =>
                      onStyleChange({ 
                        ...style, 
                        backgroundOpacity: Number(e.target.value) / 100 
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium">HP Bar Height</label>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    value={style.hpBarHeight}
                    onChange={(e) =>
                      onStyleChange({ ...style, hpBarHeight: Number(e.target.value) })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">HP Bar Width (%)</label>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={style.hpBarWidth}
                    onChange={(e) =>
                      onStyleChange({ ...style, hpBarWidth: Number(e.target.value) })
                    }
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={style.hpBarGradient}
                    onChange={(e) =>
                      onStyleChange({ ...style, hpBarGradient: e.target.checked })
                    }
                    className="rounded"
                  />
                  <label className="text-sm font-medium">HP Bar Gradient</label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={style.preserveTransparency}
                    onChange={(e) =>
                      onStyleChange({ ...style, preserveTransparency: e.target.checked })
                    }
                    className="rounded"
                  />
                  <label className="text-sm font-medium">Preserve Transparency</label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium">Size</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={style.size.width}
                      onChange={(e) =>
                        onStyleChange({
                          ...style,
                          size: { ...style.size, width: Number(e.target.value) },
                        })
                      }
                      className="w-20 border rounded px-2 py-1"
                    />
                    <span>×</span>
                    <input
                      type="number"
                      value={style.size.height}
                      onChange={(e) =>
                        onStyleChange({
                          ...style,
                          size: { ...style.size, height: Number(e.target.value) },
                        })
                      }
                      className="w-20 border rounded px-2 py-1"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : activeTab === 'text' ? (
            <>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium">Name Color</label>
                  <input
                    type="color"
                    value={style.nameColor}
                    onChange={(e) =>
                      onStyleChange({ ...style, nameColor: e.target.value })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Font Size</label>
                  <input
                    type="range"
                    min="12"
                    max="32"
                    value={style.nameSize}
                    onChange={(e) =>
                      onStyleChange({ ...style, nameSize: Number(e.target.value) })
                    }
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium">Font Weight</label>
                  <select
                    value={style.nameFontWeight}
                    onChange={(e) =>
                      onStyleChange({
                        ...style,
                        nameFontWeight: e.target.value as typeof style.nameFontWeight,
                      })
                    }
                    className="w-full border rounded px-2 py-1"
                  >
                    <option value="normal">Normal</option>
                    <option value="medium">Medium</option>
                    <option value="semibold">Semibold</option>
                    <option value="bold">Bold</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Letter Spacing</label>
                  <input
                    type="range"
                    min="-2"
                    max="10"
                    value={style.nameLetterSpacing}
                    onChange={(e) =>
                      onStyleChange({
                        ...style,
                        nameLetterSpacing: Number(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={style.nameTextShadow}
                    onChange={(e) =>
                      onStyleChange({ ...style, nameTextShadow: e.target.checked })
                    }
                    className="rounded"
                  />
                  <label className="text-sm font-medium">Text Shadow</label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={style.nameUppercase}
                    onChange={(e) =>
                      onStyleChange({ ...style, nameUppercase: e.target.checked })
                    }
                    className="rounded"
                  />
                  <label className="text-sm font-medium">Uppercase</label>
                </div>
              </div>
            </>
          ) : activeTab === 'hp' ? (
            <>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium">HP Value Color</label>
                  <input
                    type="color"
                    value={style.hpValueColor}
                    onChange={(e) =>
                      onStyleChange({ ...style, hpValueColor: e.target.value })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">HP Value Size</label>
                  <input
                    type="range"
                    min="8"
                    max="24"
                    value={style.hpValueSize}
                    onChange={(e) =>
                      onStyleChange({ ...style, hpValueSize: Number(e.target.value) })
                    }
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium">HP Value Weight</label>
                  <select
                    value={style.hpValueWeight}
                    onChange={(e) =>
                      onStyleChange({
                        ...style,
                        hpValueWeight: e.target.value as typeof style.hpValueWeight,
                      })
                    }
                    className="w-full border rounded px-2 py-1"
                  >
                    <option value="normal">Normal</option>
                    <option value="medium">Medium</option>
                    <option value="semibold">Semibold</option>
                    <option value="bold">Bold</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Letter Spacing</label>
                  <input
                    type="range"
                    min="-2"
                    max="10"
                    value={style.hpValueSpacing}
                    onChange={(e) =>
                      onStyleChange({
                        ...style,
                        hpValueSpacing: Number(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={style.hpValueShadow}
                    onChange={(e) =>
                      onStyleChange({ ...style, hpValueShadow: e.target.checked })
                    }
                    className="rounded"
                  />
                  <label className="text-sm font-medium">Text Shadow</label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={style.showHpValues}
                    onChange={(e) =>
                      onStyleChange({ ...style, showHpValues: e.target.checked })
                    }
                    className="rounded"
                  />
                  <label className="text-sm font-medium">Show HP Values</label>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <select
                    value={selectedCharacter || ''}
                    onChange={(e) => setSelectedCharacter(e.target.value)}
                    className="flex-1 rounded border px-2 py-1"
                  >
                    <option value="">Select Character</option>
                    {characters.map((char) => (
                      <option key={char.id} value={char.id}>
                        {char.name}
                      </option>
                    ))}
                  </select>
                </div>

                {currentCharacter && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium">Name</label>
                      <input
                        type="text"
                        value={currentCharacter.name}
                        onChange={(e) =>
                          onCharacterUpdate({
                            ...currentCharacter,
                            name: e.target.value,
                          })
                        }
                        className="w-full border rounded px-2 py-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">Portrait URL</label>
                      <input
                        type="text"
                        value={currentCharacter.portraitUrl}
                        onChange={(e) =>
                          onCharacterUpdate({
                            ...currentCharacter,
                            portraitUrl: e.target.value,
                          })
                        }
                        className="w-full border rounded px-2 py-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">Current HP</label>
                      <input
                        type="range"
                        min="0"
                        max={currentCharacter.maxHp}
                        value={currentCharacter.currentHp}
                        onChange={(e) =>
                          onCharacterUpdate({
                            ...currentCharacter,
                            currentHp: Number(e.target.value),
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">Max HP</label>
                      <input
                        type="number"
                        value={currentCharacter.maxHp}
                        onChange={(e) =>
                          onCharacterUpdate({
                            ...currentCharacter,
                            maxHp: Number(e.target.value),
                          })
                        }
                        className="w-full border rounded px-2 py-1"
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between pt-2 border-t">
          <button
            onClick={onAddCharacter}
            className="flex items-center space-x-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
          
          <div className="space-x-2">
            {characters.map((char) => (
              <button
                key={char.id}
                onClick={() => onRemoveCharacter(char.id)}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};