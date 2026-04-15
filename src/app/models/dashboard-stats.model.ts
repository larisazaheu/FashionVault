export interface DashboardStats {
  snapStreak: number;
  mostWornStyle: string;
  newInCount: number;
  weather?: {
    city: string;
    temperature: number;
    condition: string;
  };
}
