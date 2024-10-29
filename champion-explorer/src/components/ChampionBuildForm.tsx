// src/components/ChampionBuildForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Champion, Role } from '../types/champion';
import { championService } from '../services/championService';

interface FormData {
  championId: string;
  buildName: string;
  role: Role;
  difficulty: number;
  notes: string;
  isPublic: boolean;
}

function ChampionBuildForm() {
  const navigate = useNavigate();
  const [champions, setChampions] = useState<Champion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    championId: '',
    buildName: '',
    role: 'MID',
    difficulty: 1,
    notes: '',
    isPublic: false,
  });

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const data = await championService.getAllChampions();
        setChampions(data);
      } catch (err) {
        setError('Failed to load champions');
      }
    };

    fetchChampions();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await championService.builds.create({
        ...formData,
        items: [], // You could add items selection functionality
      });
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create build');
    } finally {
      setIsLoading(false);
    }
  };

  const roles: Role[] = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Champion Build</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Champion Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Champion
          </label>
          <select
            name="championId"
            value={formData.championId}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select a champion</option>
            {champions.map((champion) => (
              <option key={champion.id} value={champion.id}>
                {champion.name}
              </option>
            ))}
          </select>
        </div>

        {/* Build Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Build Name
          </label>
          <input
            type="text"
            name="buildName"
            value={formData.buildName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Role Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty (1-5)
          </label>
          <input
            type="range"
            name="difficulty"
            min="1"
            max="5"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full"
          />
          <div className="text-center">{formData.difficulty}</div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Public Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm text-gray-700">
            Make this build public
          </label>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Creating...' : 'Create Build'}
        </button>
      </form>
    </div>
  );
}

export default ChampionBuildForm;
