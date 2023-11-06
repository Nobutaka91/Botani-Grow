import { Timestamp } from 'firebase/firestore';

export type PlantMemo = {
  date: Timestamp;
  text: string;
};
