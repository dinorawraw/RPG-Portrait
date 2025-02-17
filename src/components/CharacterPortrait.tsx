import React from 'react';
import { useDrag } from 'react-use-gesture';
import { Character, PortraitStyle } from '../types/character';
import { HPBar } from './HPBar';

interface CharacterPortraitProps {
  character: Character;
  style: PortraitStyle;
  onPositionChange: (id: string, x: number, y: number) => void;
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  character,
  style,
  onPositionChange,
}) => {
  const bind = useDrag(({ movement: [x, y], first, last }) => {
    if (last) {
      onPositionChange(
        character.id,
        character.position.x + x,
        character.position.y + y
      );
    }
  });

  return (
    <div
      {...bind()}
      className="absolute cursor-move"
      style={{
        transform: `translate(${character.position.x}px, ${character.position.y}px)`,
        width: style.size.width,
        height: style.size.height,
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          borderWidth: style.borderWidth,
          borderColor: style.borderColor,
          backgroundColor: style.preserveTransparency ? 'transparent' : style.backgroundColor,
          borderRadius: style.cornerRadius,
        }}
      >
        <img
          src={character.portraitUrl}
          alt={character.name}
          className="w-full h-full object-cover"
          style={{
            backgroundColor: style.preserveTransparency ? 'transparent' : 'inherit',
          }}
        />
        <div 
          className="absolute bottom-0 left-0 right-0 p-2"
          style={{
            backgroundColor: style.preserveTransparency 
              ? `rgba(0, 0, 0, ${style.backgroundOpacity})`
              : style.backgroundColor,
          }}
        >
          <div 
            className={`mb-1 text-center transition-all ${
              style.nameUppercase ? 'uppercase' : 'normal-case'
            }`}
            style={{
              color: style.nameColor,
              fontSize: `${style.nameSize}px`,
              fontWeight: style.nameFontWeight,
              letterSpacing: `${style.nameLetterSpacing}px`,
              textShadow: style.nameTextShadow ? '0 2px 4px rgba(0,0,0,0.5)' : 'none',
            }}
          >
            {character.name}
          </div>
          <HPBar
            current={character.currentHp}
            max={character.maxHp}
            gradient={style.hpBarGradient}
            height={style.hpBarHeight}
            width={style.hpBarWidth}
            showValues={style.showHpValues}
            valueSize={style.hpValueSize}
            valueColor={style.hpValueColor}
            valueWeight={style.hpValueWeight}
            valueShadow={style.hpValueShadow}
            valueSpacing={style.hpValueSpacing}
          />
        </div>
      </div>
    </div>
  );
};