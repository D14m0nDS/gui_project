import React, { useState, useEffect } from "react";
import { F1Api } from "../services/api";

export default function Standings() {
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStandings = async () => {
            try {
                const data = await F1Api.getDriverStandings();
                setStandings(data);
            } catch (err) {
                setError(err.message || 'Failed to load standings');
            } finally {
                setLoading(false);
            }
        };

        fetchStandings();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-screen overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="w-15 h-15 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
            </div>

        );
    }

    if (error) {
        return <div className="text-center py-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="h-full w-full bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
            <div className="container w-full p-4 bg-gray-100 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white ">2025 F1 Driver Standings</h1>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {standings.map((driver) => (
                        <div
                            key={driver.driver_id}
                            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                        #{driver.position} {driver.driver_name}
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {driver.constructor_name}
                                    </p>
                                </div>
                                <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                                {driver.driver_number}
                            </span>
                            </div>

                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Points:</span>
                                    <span className="font-medium text-gray-800 dark:text-gray-200">
                                    {driver.points.toFixed(1)}
                                </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Wins:</span>
                                    <span className="font-medium text-gray-800 dark:text-gray-200">
                                    {driver.wins}
                                </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}