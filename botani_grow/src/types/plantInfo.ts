export type PlantInfo = {
  id: string;
  iconUrl: string | null;
  name: string;
  leafCount: number;
  tags: string[] | null;
  startDate: Date;
  wateringAmount: string; // 水やりの量(多, ふつう, 少)
  isArchived: boolean;
  memos?: {
    date: Date;
    text: string;
  }[];
};
