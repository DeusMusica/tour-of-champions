// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChampionCard from '../components/ChampionCard';
import SearchBar from '../components/SearchBar';
import { Champion, ChampionBuild } from '../types/champion';
import { championService } from '../services/championService';

function HomePage() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [builds, setBuilds] = useState<ChampionBuild[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [championsData, buildsData] = await Promise.all([
          championService.getAllChampions(),
          championService.builds.getAll(),
        ]);
        setChampions(championsData);
        setBuilds(buildsData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredChampions = champions.filter((champion) =>
    champion.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl">Loading champions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-600">
        <p className="text-xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">League of Legends Champions</h1>
        <Link
          to="/create-build"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create Build
        </Link>
      </div>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChampions.map((champion) => (
          <ChampionCard
            key={champion.id}
            champion={champion}
            builds={builds.filter((build) => build.championId === champion.id)}
          />
        ))}
      </div>

      {filteredChampions.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No champions found matching &quot;{searchTerm}&quot;
        </p>
      )}
    </div>
  );
}

export default HomePage;
