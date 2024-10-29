// src/components/ChampionCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Champion, ChampionBuild } from '../types/champion';

interface ChampionCardProps {
  champion: Champion;
  builds?: ChampionBuild[];
}

function ChampionCard({ champion, builds = [] }: ChampionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
      <Link to={`/champion/${champion.id}`}>
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <img
            src={champion.image}
            alt={champion.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold">{champion.name}</h2>
          <p className="text-gray-600">{champion.title}</p>

          {builds.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                {builds.length} build{builds.length !== 1 ? 's' : ''} available
              </p>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default ChampionCard;
