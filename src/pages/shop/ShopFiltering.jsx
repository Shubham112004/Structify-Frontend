import React, { useState } from 'react';

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div>
            {/* Filters Button for Mobile */}
            <button
                className="md:hidden fixed top-16 right-4 text-gray-900 bg-slate-400 py-1 px-4 rounded shadow-lg z-10"
                onClick={() => setShowFilters(!showFilters)}
            >
                {showFilters ? <span className='ri-close-circle-line'></span> : <span className='ri-filter-2-line'></span>}
            </button>

            {/* Filters Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-white z-40 transform ${showFilters ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 overflow-y-auto md:relative md:translate-x-0 md:overflow-visible md:w-1/4 lg:w-48`}
            >
                <div className="p-4 space-y-5">
                    <h3 className="text-xl font-semibold">Filters</h3>

                    {/* Category */}
                    <div className="flex flex-col space-y-2">
                        <h4 className="font-medium text-lg">Category</h4>
                        <hr />
                        {filters.categories.map((category) => (
                            <label key={category} className="capitalize cursor-pointer">
                                <input
                                    type="radio"
                                    name="category"
                                    value={category}
                                    checked={filtersState.category === category}
                                    onChange={(e) => setFiltersState({ ...filtersState, category: e.target.value })}
                                />
                                <span className="ml-1">{category}</span>
                            </label>
                        ))}
                    </div>

                    {/* Colors */}
                    <div className="flex flex-col space-y-2">
                        <h4 className="font-medium text-lg">Color</h4>
                        <hr />
                        {filters.colors.map((color) => (
                            <label key={color} className="capitalize cursor-pointer">
                                <input
                                    type="radio"
                                    name="color"
                                    value={color}
                                    checked={filtersState.color === color}
                                    onChange={(e) => setFiltersState({ ...filtersState, color: e.target.value })}
                                />
                                <span className="ml-1">{color}</span>
                            </label>
                        ))}
                    </div>

                    {/* Pricing */}
                    <div className="flex flex-col space-y-2">
                        <h4 className="font-medium text-lg">Price Range</h4>
                        <hr />
                        {filters.priceRanges.map((range) => (
                            <label key={range.label} className="capitalize cursor-pointer">
                                <input
                                    type="radio"
                                    name="priceRanges"
                                    value={`${range.min} - ${range.max}`}
                                    checked={filtersState.priceRanges === `${range.min} - ${range.max}`}
                                    onChange={(e) => setFiltersState({ ...filtersState, priceRanges: e.target.value })}
                                />
                                <span className="ml-1">{range.label}</span>
                            </label>
                        ))}
                    </div>

                    {/* Clear Filters */}
                    <button onClick={clearFilters} className="bg-primary py-1 px-4 text-white rounded">
                        Clear All Filters
                    </button>
                </div>
            </div>

            {/* Overlay for Mobile */}
            {showFilters && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setShowFilters(false)}
                ></div>
            )}
        </div>
    );
};

export default ShopFiltering;
