import { en } from './en';
import { si } from './si';
import { ta } from './ta';
import { es } from './es';
import { fr } from './fr';
import { de } from './de';
import { zh } from './zh';
import { ja } from './ja';

export const translations = {
  en,
  si,
  ta,
  es,
  fr,
  de,
  zh,
  ja,
};

export type LanguageCode = keyof typeof translations;
