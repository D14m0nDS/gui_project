import React, { useState, useEffect } from "react";
import { F1Api } from "../services/api";

export default function Standings() {
    // Drivers
    const [driverStandings, setDriverStandings] = useState([]);
    // Constructors
    const [constructorStandings, setConstructorStandings] = useState([]);
    // Which standings to display
    const [selectedStandings, setSelectedStandings] = useState("drivers");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStandings = async () => {
            try {
                // Fetch both in parallel
                const [driverData, constructorData] = await Promise.all([
                    F1Api.getDriverStandings(),
                    F1Api.getConstructorStandings(),
                ]);

                // Sort drivers by points descending
                const sortedDrivers = [...driverData].sort((a, b) => b.points - a.points);

                // Sort constructors by points descending
                const sortedConstructors = [...constructorData].sort((a, b) => b.points - a.points);

                setDriverStandings(sortedDrivers);
                setConstructorStandings(sortedConstructors);
            } catch (err) {
                setError(err.message || "Failed to load standings");
            } finally {
                setLoading(false);
            }
        };

        fetchStandings();
    }, []);

    if (loading) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <span>Loading...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <span>{error}</span>
            </div>
        );
    }

    return (
        <div className="h-full w-full bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
            <div className="container w-full p-4 bg-gray-100 dark:bg-gray-900">
                {/* Title + Dropdown Row */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
                        2024 F1 Standings
                    </h1>

                    {/* Dropdown to switch standings type */}
                    <select
                        value={selectedStandings}
                        onChange={(e) => setSelectedStandings(e.target.value)}
                        className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                    >
                        <option value="drivers">Drivers</option>
                        <option value="constructors">Constructors</option>
                    </select>
                </div>

                {/* Content Box */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                    {selectedStandings === "drivers" ? (
                        // ================================
                        // Driver Standings Table
                        // ================================
                        <>
                            {/* Table Header */}
                            <div className="hidden md:flex px-1 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-t-lg">
                                <div className="w-20 text-center font-medium text-gray-500 dark:text-gray-400">
                                    #
                                </div>
                                <div className="flex-1 text-left font-medium text-gray-500 dark:text-gray-400">
                                    Driver
                                </div>
                                <div className="w-50 text-center font-medium text-gray-500 dark:text-gray-400">
                                    Driver Number
                                </div>
                                <div className="w-50 text-center font-medium text-gray-500 dark:text-gray-400">
                                    Constructor
                                </div>
                                <div className="w-35 text-center font-medium text-gray-500 dark:text-gray-400">
                                    Points
                                </div>
                                <div className="w-25 text-center font-medium text-gray-500 dark:text-gray-400">
                                    Wins
                                </div>
                            </div>

                            {/* Driver Rows */}
                            {driverStandings.map((driver) => (
                                <div
                                    key={driver.driver_id}
                                    className="flex flex-col md:flex-row px-1 py-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
                                >
                                    <div className="w-full md:w-20 text-center text-xl font-bold text-gray-700 dark:text-gray-300 mb-2 md:mb-0">
                                        #{driver.position}
                                    </div>
                                    <div className="flex-1 text-left text-xl font-semibold text-gray-800 dark:text-white mb-2 md:mb-0 md:mr-4">
                                        {driver.driver_name}
                                    </div>
                                    <div className="w-full md:w-50 text-center text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 md:mb-0">
                                        {driver.driver_number}
                                    </div>
                                    <div className="w-full md:w-50 text-center text-lg text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
                                        {driver.constructor_name}
                                    </div>
                                    <div className="w-full md:w-35 text-center text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 md:mb-0">
                                        {driver.points.toFixed(1)}
                                    </div>
                                    <div className="w-full md:w-25 text-center text-lg font-medium text-gray-800 dark:text-gray-200">
                                        {driver.wins}
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        // ================================
                        // Constructor Standings Table
                        // ================================
                        <>
                            <div className="hidden md:flex px-1 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-t-lg">
                                <div className="w-20 text-center font-medium text-gray-500 dark:text-gray-400">
                                    #
                                </div>
                                <div className="flex-1 text-left font-medium text-gray-500 dark:text-gray-400">
                                    Constructor
                                </div>
                                <div className="w-35 text-center font-medium text-gray-500 dark:text-gray-400">
                                    Points
                                </div>
                                <div className="w-25 text-center font-medium text-gray-500 dark:text-gray-400">
                                    Wins
                                </div>
                            </div>

                            {constructorStandings.map((team) => (
                                <div
                                    key={team.constructor_id}
                                    className="flex flex-col md:flex-row px-1 py-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
                                >
                                    <div className="w-full md:w-20 text-center text-xl font-bold text-gray-700 dark:text-gray-300 mb-2 md:mb-0">
                                        #{team.position}
                                    </div>
                                    <div className="flex-1 text-left text-xl font-semibold text-gray-800 dark:text-white mb-2 md:mb-0 md:mr-4">
                                        {team.name}
                                    </div>
                                    <div className="w-full md:w-35 text-center text-lg font-medium text-gray-800 dark:text-gray-200 mb-2 md:mb-0">
                                        {team.points.toFixed(1)}
                                    </div>
                                    <div className="w-full md:w-25 text-center text-lg font-medium text-gray-800 dark:text-gray-200">
                                        {team.wins}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
