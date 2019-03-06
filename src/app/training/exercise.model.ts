export interface Exercise {
  id: string;
  userUID: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date;
  state?: 'completed' | 'cancelled' | null;
}
