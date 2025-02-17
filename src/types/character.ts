export interface Character {
  id: string;
  name: string;
  currentHp: number;
  maxHp: number;
  portraitUrl: string;
  position: {
    x: number;
    y: number;
  };
}

export interface PortraitStyle {
  borderColor: string;
  borderWidth: number;
  backgroundColor: string;
  backgroundOpacity: number;
  cornerRadius: number;
  hpBarHeight: number;
  hpBarWidth: number;
  hpBarGradient: boolean;
  showHpValues: boolean;
  hpValueSize: number;
  hpValueColor: string;
  hpValueWeight: 'normal' | 'medium' | 'semibold' | 'bold';
  hpValueShadow: boolean;
  hpValueSpacing: number;
  nameColor: string;
  nameSize: number;
  nameFontWeight: 'normal' | 'medium' | 'semibold' | 'bold';
  nameTextShadow: boolean;
  nameLetterSpacing: number;
  nameUppercase: boolean;
  preserveTransparency: boolean;
  size: {
    width: number;
    height: number;
  };
}