import { Champion, ChampionBuild, ApiResponse } from '../types/champion';

const LEAGUE_API_URL =
  'http://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US';
const MOCK_API_URL = 'https://your-mock-api.com/api'; // This would be your actual API in production

export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const championService = {
  // Get all champions from League API
  async getAllChampions(): Promise<Champion[]> {
    try {
      const response = await fetch(`${LEAGUE_API_URL}/champion.json`);
      if (!response.ok) {
        throw new ApiError(response.status, 'Failed to fetch champions');
      }
      const data = await response.json();

      return Object.values(data.data).map((champion: any) => ({
        id: champion.id,
        name: champion.name,
        title: champion.title,
        image: `http://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.image.full}`,
      }));
    } catch (error) {
      throw new Error('Error fetching champions: ' + error);
    }
  },

  // Get single champion details
  async getChampionById(id: string): Promise<Champion> {
    try {
      const response = await fetch(`${LEAGUE_API_URL}/champion/${id}.json`);
      if (!response.ok) {
        throw new ApiError(response.status, 'Champion not found');
      }
      const data = await response.json();
      const champion = data.data[id];

      return {
        id: champion.id,
        name: champion.name,
        title: champion.title,
        image: `http://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.image.full}`,
      };
    } catch (error) {
      throw new Error('Error fetching champion: ' + error);
    }
  },

  // Champion builds CRUD operations
  builds: {
    async getAll(): Promise<ChampionBuild[]> {
      const response = await fetch(`${MOCK_API_URL}/builds`);
      if (!response.ok)
        throw new ApiError(response.status, 'Failed to fetch builds');
      return response.json();
    },

    async getByChampionId(championId: string): Promise<ChampionBuild[]> {
      const response = await fetch(
        `${MOCK_API_URL}/builds/champion/${championId}`,
      );
      if (!response.ok)
        throw new ApiError(response.status, 'Failed to fetch champion builds');
      return response.json();
    },

    async create(
      build: Omit<ChampionBuild, 'id' | 'createdAt' | 'updatedAt'>,
    ): Promise<ChampionBuild> {
      const response = await fetch(`${MOCK_API_URL}/builds`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(build),
      });

      if (!response.ok)
        throw new ApiError(response.status, 'Failed to create build');
      return response.json();
    },

    async update(
      buildId: string,
      build: Partial<ChampionBuild>,
    ): Promise<ChampionBuild> {
      const response = await fetch(`${MOCK_API_URL}/builds/${buildId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(build),
      });

      if (!response.ok)
        throw new ApiError(response.status, 'Failed to update build');
      return response.json();
    },

    async delete(buildId: string): Promise<void> {
      const response = await fetch(`${MOCK_API_URL}/builds/${buildId}`, {
        method: 'DELETE',
      });

      if (!response.ok)
        throw new ApiError(response.status, 'Failed to delete build');
    },
  },
};
