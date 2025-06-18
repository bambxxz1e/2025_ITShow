import { aiList } from '../data/aiList';

export const selectRandomAI = () => {
    const randomIndex = Math.floor(Math.random() * aiList.length);
    return aiList[randomIndex];
}