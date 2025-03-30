import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE

const api = axios.create({
    baseURL: API_BASE,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const F1Api = {
    // Standings
    getDriverStandings: async (season = 'current') => {
        try {
            const response = await api.get('/standings/drivers', { params: { season } });
            return response.data;
        } catch (error) {
            console.error('Error fetching driver standings:', error);
            throw error.response?.data?.error || 'Failed to get driver standings';
        }
    },

    getConstructorStandings: async (season = 'current') => {
        try {
            const response = await api.get('/standings/constructors', { params: { season } });
            return response.data;
        } catch (error) {
            console.error('Error fetching constructor standings:', error);
            throw error.response?.data?.error || 'Failed to get constructor standings';
        }
    },

    // Schedule & Races
    getSchedule: async () => {
        try {
            const response = await api.get('/schedule');
            return response.data?.Schedule?.races || [];
        } catch (error) {
            console.error('Error fetching schedule:', error);
            throw error.response?.data?.error || 'Failed to get schedule';
        }
    },

    getRaceDetails: async (season, round) => {
        try {
            const response = await api.get('/race', { params: { season, round } });
            return response.data;
        } catch (error) {
            console.error('Error fetching race details:', error);
            throw error.response?.data?.error || 'Failed to get race details';
        }
    },

    // Drivers
    getAllDrivers: async (season = 'current') => {
        try {
            const response = await api.get('/drivers', { params: { season } });
            return response.data;
        } catch (error) {
            console.error('Error fetching drivers:', error);
            throw error.response?.data?.error || 'Failed to get drivers';
        }
    },

    getDriverDetails: async (driverId) => {
        try {
            const response = await api.get('/driver', { params: { id: driverId } });
            return response.data;
        } catch (error) {
            console.error('Error fetching driver details:', error);
            throw error.response?.data?.error || 'Failed to get driver details';
        }
    },

    // Constructors
    getAllConstructors: async (season = 'current') => {
        try {
            const response = await api.get('/constructors', { params: { season } });
            return response.data;
        } catch (error) {
            console.error('Error fetching constructors:', error);
            throw error.response?.data?.error || 'Failed to get constructors';
        }
    },

    getConstructorDetails: async (constructorId) => {
        try {
            const response = await api.get('/constructor', { params: { id: constructorId } });
            return response.data;
        } catch (error) {
            console.error('Error fetching constructor details:', error);
            throw error.response?.data?.error || 'Failed to get constructor details';
        }
    },

    // Images
    getDriverImage: (driverId) => `${API_BASE}/images/${driverId}.png`,
    getConstructorImage: (constructorId) => `${API_BASE}/images/${constructorId}.png`,
    getCircuitImage: (circuitId) => `${API_BASE}/images/${circuitId}_xxhdpi.png`
};