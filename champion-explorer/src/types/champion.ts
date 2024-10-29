export interface Champion {
  id: string;
  name: string;
  title: string;
  image: string;
}

export interface ChampionBuild {
  id: string;
  championId: string;
  buildName: string;
  role: Role;
  difficulty: number;
  items: string[];
  notes: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type Role = 'TOP' | 'JUNGLE' | 'MID' | 'ADC' | 'SUPPORT';

export interface ApiResponse<T> {
  data: T;
  error?: string;
}
