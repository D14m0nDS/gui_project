import React, { useState, useEffect } from "react";
import { F1Api } from "../services/api";

function normalizeCircuitName(name) {
    return name
        // Remove diacritics
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        // Convert to lowercase
        .toLowerCase()
        // Replace spaces and hyphens with underscores
        .replace(/ /g, "_")
        .replace(/-/g, "_");
}

export default function Home() {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                const data = await F1Api.getSchedule();
                setRaces(data);
            } catch (err) {
                setError(err.message || "Failed to load races");
            } finally {
                setLoading(false);
            }
        };

        fetchRaces();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-screen overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="w-20 h-20 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
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
                    <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                        2024 F1 Race Schedule
                    </h1>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {races.map((race) => {
                        const raceDate = new Date(race.date);
                        const formattedDate = raceDate.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        });

                        const circuitId = normalizeCircuitName(race.circuit.circuit_name);

                        const circuitImageUrl = F1Api.getCircuitImage(circuitId);

                        return (
                            <div
                                key={race.id}
                                // Position relative so the overlay can fill the entire card
                                className="relative p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 h-64"
                                style={{
                                    backgroundImage: `url('${circuitImageUrl}')`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <div className="absolute inset-0 bg-black/50 z-0" />

                                {/* Content container is now relative with a higher z-index */}
                                <div className="py-4 px-3 relative z-10 h-full flex flex-col">
                                    {/* Centered race name and round */}
                                    <div className="mb-4 text-center">
                                        <h2 className="text-2xl font-bold text-white">
                                            {race.name}
                                        </h2>
                                        <span className="text-sm font-medium text-white">
                                            Round {race.round}
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                Circuit:
                                            </span>
                                            <span className="font-medium text-gray-800 dark:text-gray-200">
                                                {race.circuit.circuit_name}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                Location:
                                            </span>
                                            <span className="font-medium text-gray-800 dark:text-gray-200">
                                                {race.circuit.location.city},{" "}
                                                {race.circuit.location.country}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                Date:
                                            </span>
                                            <span className="font-medium text-gray-800 dark:text-gray-200">
                                                {formattedDate}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
