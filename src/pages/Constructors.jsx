import React, { useState, useEffect } from "react";
import { F1Api } from "../services/api";

export default function Constructors() {
    const [constructors, setConstructors] = useState([]);
    const [driversMap, setDriversMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // We'll fetch both the constructors AND drivers in parallel
        const fetchData = async () => {
            try {
                const [constructorData, driversData] = await Promise.all([
                    F1Api.getAllConstructors("current"),  // /constructors?season=current
                    F1Api.getAllDrivers("current"),       // /drivers?season=current
                ]);

                setConstructors(constructorData);

                // Build a lookup map from driver.id -> driver.name
                // e.g. { norris: "Lando Norris", piastri: "Oscar Piastri", ... }
                const map = {};
                driversData.forEach((driver) => {
                    map[driver.id] = driver.name;
                });
                setDriversMap(map);
            } catch (err) {
                setError(err.message || "Failed to load constructors/drivers");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="w-20 h-20 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-4 text-red-500 bg-gray-50 dark:bg-gray-900">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="h-full w-full bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
            <div className="container w-full p-4 bg-gray-100 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                        2024 F1 Constructors
                    </h1>
                </div>

                {/* Grid of constructor cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {constructors.map((constructor) => {
                        // Build constructor image URL
                        const constructorImageUrl = F1Api.getConstructorImage(constructor.id);

                        // Convert array of driver IDs into array of driver NAMES using driversMap
                        // e.g. ["norris", "piastri"] => ["Lando Norris", "Oscar Piastri"]
                        const driverNames = constructor.drivers.map((driverId) =>
                            driversMap[driverId] || driverId // fallback if not found
                        );

                        // Join driver names to a comma-separated string
                        const driverList = driverNames.join(", ");

                        return (
                            <div
                                key={constructor.id}
                                className="flex bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
                            >
                                {/* Constructor image on the left */}
                                <img
                                    src={constructorImageUrl}
                                    alt={constructor.name}
                                    className="w-32 h-32 md:w-36 md:h-36 object-contain bg-white dark:bg-gray-900 p-2"
                                />

                                {/* Constructor details on the right */}
                                <div className="p-4 flex flex-col justify-center">
                                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                        {constructor.name}
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Nationality:{" "}
                                        <span className="font-medium">{constructor.nationality}</span>
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Drivers: <span className="font-medium">{driverList}</span>
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Points: <span className="font-medium">{constructor.points}</span>
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
