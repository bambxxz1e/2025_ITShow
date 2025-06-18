import { aiList } from './aiList';

export const voiceMap = {
  "윤환쌤": aiList.find(ai => ai.name === "윤환쌤") || null,
  "영철쌤": aiList.find(ai => ai.name === "영철쌤") || null,
  "다연쌤": aiList.find(ai => ai.name === "다연쌤") || null,
  "호식쌤": aiList.find(ai => ai.name === "호식쌤") || null,
  "지웅쌤": aiList.find(ai => ai.name === "지웅쌤") || null,
  "태연쌤": aiList.find(ai => ai.name === "태연쌤") || null,
  "윤지쌤": aiList.find(ai => ai.name === "윤지쌤") || null,
  "보경쌤": aiList.find(ai => ai.name === "보경쌤") || null
};