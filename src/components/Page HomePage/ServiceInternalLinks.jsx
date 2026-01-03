import React, { useState, useEffect } from 'react';

const ServiceInternalLinks = ({ internalLinksData, onUpdate, disabled = false }) => {
    const [formData, setFormData] = useState({
        blockName: '',
        linkUrl: '',
        linkPairs: internalLinksData?.linkPairs || []
    });

    // Clean and send data to parent
    useEffect(() => {
        const cleanData = {
            linkPairs: formData.linkPairs.map(pair => ({ 
                blockName: pair.blockName, 
                linkUrl: pair.linkUrl 
            }))
        };
        onUpdate(cleanData);
    }, [formData, onUpdate]);

    const handleAddPair = () => {
        if (formData.blockName.trim() && formData.linkUrl.trim()) {
            const newPair = {
                blockName: formData.blockName.trim(),
                linkUrl: formData.linkUrl.trim()
            };
            
            setFormData(prev => ({
                ...prev,
                linkPairs: [...prev.linkPairs, newPair],
                blockName: '',
                linkUrl: ''
            }));
        }
    };

    const updatePair = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            linkPairs: prev.linkPairs.map((pair, i) =>
                i === index ? { ...pair, [field]: value } : pair
            )
        }));
    };

    const removePair = (index) => {
        setFormData(prev => ({
            ...prev,
            linkPairs: prev.linkPairs.filter((_, i) => i !== index)
        }));
    };

    const movePair = (index, direction) => {
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === formData.linkPairs.length - 1)
        ) {
            return;
        }

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        const newPairs = [...formData.linkPairs];
        [newPairs[index], newPairs[newIndex]] = [newPairs[newIndex], newPairs[index]];
        
        setFormData(prev => ({
            ...prev,
            linkPairs: newPairs
        }));
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-sm mb-1">
                    <span className="font-semibold text-black">Internal Links</span>
                    <span className="font-normal text-black">
                        {' '}(Add upto 50 Internal Links that redirect to other pages on our website)
                    </span>
                </h3>
            </div>

            {/* Input Section for Adding New Pairs */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-black mb-2">
                            Block Name *
                        </label>
                        <input
                            type="text"
                            placeholder="Enter block name"
                            value={formData.blockName}
                            onChange={(e) => setFormData(prev => ({ ...prev, blockName: e.target.value }))}
                            className="w-full px-4 py-2.5 border border-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm disabled:opacity-50"
                            disabled={disabled}
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-black mb-2">
                            Link URL *
                        </label>
                        <input
                            type="text"
                            placeholder="https://example.com/page"
                            value={formData.linkUrl}
                            onChange={(e) => setFormData(prev => ({ ...prev, linkUrl: e.target.value }))}
                            className="w-full px-4 py-2.5 border border-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm disabled:opacity-50"
                            disabled={disabled}
                        />
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleAddPair}
                    disabled={disabled || !formData.blockName.trim() || !formData.linkUrl.trim()}
                    className="w-full md:w-auto px-4 py-2.5 bg-purple-600 text-white hover:bg-purple-700 font-medium flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="text-lg">+</span> Add New Pair
                </button>
            </div>

            {/* List of Added Pairs */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-black">
                        Added Links ({formData.linkPairs.length}/50)
                    </h4>
                    {formData.linkPairs.length > 0 && (
                        <span className="text-xs text-gray-500">
                            Click and drag to reorder
                        </span>
                    )}
                </div>

                {formData.linkPairs.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                        <p className="text-gray-500 mb-2">No links added yet</p>
                        <p className="text-xs text-gray-400">Add your first block name and link above</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {formData.linkPairs.map((pair, index) => (
                            <div 
                                key={index}
                                className="border border-gray-300 bg-white p-4 rounded-lg hover:border-purple-300 transition-colors"
                            >
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                    {/* Drag Handle and Order Number */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex flex-col gap-1">
                                            <button
                                                type="button"
                                                onClick={() => movePair(index, 'up')}
                                                disabled={disabled || index === 0}
                                                className="text-gray-400 hover:text-purple-600 disabled:opacity-30"
                                            >
                                                ↑
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => movePair(index, 'down')}
                                                disabled={disabled || index === formData.linkPairs.length - 1}
                                                className="text-gray-400 hover:text-purple-600 disabled:opacity-30"
                                            >
                                                ↓
                                            </button>
                                        </div>
                                        <div className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded">
                                            #{index + 1}
                                        </div>
                                    </div>

                                    {/* Block Name and Link */}
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                                Block Name
                                            </label>
                                            <input
                                                type="text"
                                                value={pair.blockName}
                                                onChange={(e) => updatePair(index, 'blockName', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm rounded disabled:opacity-50"
                                                disabled={disabled}
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                                Link URL
                                            </label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={pair.linkUrl}
                                                    onChange={(e) => updatePair(index, 'linkUrl', e.target.value)}
                                                    className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm rounded disabled:opacity-50"
                                                    disabled={disabled}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removePair(index)}
                                                    disabled={disabled}
                                                    className="px-3 py-2 text-red-500 hover:text-red-700 disabled:opacity-50"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {formData.linkPairs.length >= 50 && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-700 text-center">
                            Maximum limit of 50 links reached
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceInternalLinks;