export type PlantInfo = {
  id: string;
  iconUrl: string | null;
  name: string;
  size: string;
  leafCount: number;
  // wateringCycle: number; // 水やりの頻度(日数)
  tags: string[] | null;
  startDate: Date;
  wateringAmount: string; // 水やりの量(多, ふつう, 少)
  isArchived: boolean;
};

// export type WateringsInfo = {
//   nextWateringDate:
// }
