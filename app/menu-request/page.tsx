"use client";

import React, { useState } from "react";
import axios from "axios";

const MenuRequestForm = () => {
    const [formData, setFormData] = useState({
        customerId: "",
        tentativeDateTime: "",
        mealType: "Lunch",
        cuisinePreferences: "",
        headcount: "",
        dietaryRestrictionsAndAllergies: "",
        perPerson: "",
        total: "",
        servingStyle: "Buffet-Style in Trays",
        additionalInformation: "",
        carouselOfRecommendedMenus: "",
    });
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Convert cuisinePreferences and carouselOfRecommendedMenus to arrays
        const cuisinePreferencesArray = formData.cuisinePreferences
            .split(",")
            .map((item) => item.trim());
        const carouselOfRecommendedMenusArray = formData.carouselOfRecommendedMenus
            .split(",")
            .map((item) => item.trim());

        const payload = {
            ...formData,
            cuisinePreferences: cuisinePreferencesArray,
            carouselOfRecommendedMenus: carouselOfRecommendedMenusArray,
        };

        try {
            const response = await axios.post(
                "http://18.222.218.159:5003/api/users/menu-request",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setResponseMessage("Form submitted successfully!"); // Successful response
        } catch (error) {
            setResponseMessage("Failed to submit the form.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">Menu Request Form</h1>

                {responseMessage && (
                    <div
                        className={`p-4 rounded-md mb-4 text-center font-semibold ${
                            responseMessage.includes("successfully")
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {responseMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="customerId" className="block text-sm font-medium text-gray-700">
                            Customer ID
                        </label>
                        <input
                            id="customerId"
                            name="customerId"
                            value={formData.customerId}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your customer ID"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="tentativeDateTime" className="block text-sm font-medium text-gray-700">
                            Tentative Date & Time
                        </label>
                        <input
                            id="tentativeDateTime"
                            type="datetime-local"
                            name="tentativeDateTime"
                            value={formData.tentativeDateTime}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="mealType" className="block text-sm font-medium text-gray-700">
                            Meal Type
                        </label>
                        <select
                            id="mealType"
                            name="mealType"
                            value={formData.mealType}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="cuisinePreferences" className="block text-sm font-medium text-gray-700">
                            Cuisine Preferences (comma-separated)
                        </label>
                        <input
                            id="cuisinePreferences"
                            name="cuisinePreferences"
                            value={formData.cuisinePreferences}
                            onChange={handleInputChange}
                            placeholder="e.g., Italian, Mexican"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="headcount" className="block text-sm font-medium text-gray-700">
                            Headcount
                        </label>
                        <input
                            id="headcount"
                            name="headcount"
                            type="number"
                            value={formData.headcount}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="dietaryRestrictionsAndAllergies" className="block text-sm font-medium text-gray-700">
                            Dietary Restrictions & Allergies
                        </label>
                        <input
                            id="dietaryRestrictionsAndAllergies"
                            name="dietaryRestrictionsAndAllergies"
                            value={formData.dietaryRestrictionsAndAllergies}
                            onChange={handleInputChange}
                            placeholder="e.g., No nuts, vegan options required"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="perPerson" className="block text-sm font-medium text-gray-700">
                            Cost Per Person
                        </label>
                        <input
                            id="perPerson"
                            name="perPerson"
                            type="number"
                            value={formData.perPerson}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="total" className="block text-sm font-medium text-gray-700">
                            Total Cost
                        </label>
                        <input
                            id="total"
                            name="total"
                            type="number"
                            value={formData.total}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="servingStyle" className="block text-sm font-medium text-gray-700">
                            Serving Style
                        </label>
                        <select
                            id="servingStyle"
                            name="servingStyle"
                            value={formData.servingStyle}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="Buffet-Style in Trays">Buffet-Style in Trays</option>
                            <option value="Plated">Plated</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="additionalInformation" className="block text-sm font-medium text-gray-700">
                            Additional Information
                        </label>
                        <textarea
                            id="additionalInformation"
                            name="additionalInformation"
                            value={formData.additionalInformation}
                            onChange={handleInputChange}
                            placeholder="e.g., Guests will be arriving from out of town..."
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            rows={4}
                        />
                    </div>

                    <div>
                        <label htmlFor="carouselOfRecommendedMenus" className="block text-sm font-medium text-gray-700">
                            Carousel of Recommended Menus (comma-separated)
                        </label>
                        <input
                            id="carouselOfRecommendedMenus"
                            name="carouselOfRecommendedMenus"
                            value={formData.carouselOfRecommendedMenus}
                            onChange={handleInputChange}
                            placeholder="e.g., Pasta Bar, Taco Bar, Salad Buffet"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className={`px-6 py-3 font-semibold text-white rounded-lg bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MenuRequestForm;
