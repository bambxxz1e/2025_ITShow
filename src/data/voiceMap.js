import { aiList } from './aiList';

export const voiceMap = {
  "윤환쌤": aiList.find(ai => ai.name.includes("윤환")),
  "영철쌤": aiList.find(ai => ai.name.includes("영철")),
  "다연쌤": aiList.find(ai => ai.name.includes("다연")),
  "호식쌤": aiList.find(ai => ai.name.includes("호식")),
  "지웅쌤": aiList.find(ai => ai.name.includes("지웅")),
  "태연쌤": aiList.find(ai => ai.name.includes("태연")),
};