import React, { useState, useEffect } from 'react';

const ServiceContent = ({ contentData, onUpdate, disabled = false }) => {
    const [mainContent, setMainContent] = useState(contentData.mainContent || '');
    const [h2Headings, setH2Headings] = useState(contentData.h2Headings || []);
    const [h3Headings, setH3Headings] = useState(contentData.h3Headings || []);

    useEffect(() => {
        onUpdate({
            mainContent,
            h2Headings,
            h3Headings
        });
    }, [mainContent, h2Headings, h3Headings, onUpdate]);

    const handleMainContentChange = (e) => {
        setMainContent(e.target.value);
    };

    const addH2Heading = () => {
        setH2Headings([...h2Headings, { heading: '', _id: Date.now().toString() }]);
    };

    // MODIFIED: Add H3 with only subheading1 initially
    const addH3Heading = () => {
        setH3Headings([...h3Headings, { 
            subheading1: '', 
            subheading2: '',
            _id: Date.now().toString(),
            showSecondField: false // New flag to track if second field should be shown
        }]);
    };

    // NEW: Function to add second field for a specific H3
    const addSecondFieldForH3 = (id) => {
        setH3Headings(h3Headings.map(h =>
            h._id === id ? { ...h, showSecondField: true } : h
        ));
    };

    const updateH2Heading = (id, field, value) => {
        setH2Headings(h2Headings.map(h =>
            h._id === id ? { ...h, [field]: value } : h
        ));
    };

    const updateH3Heading = (id, field, value) => {
        setH3Headings(h3Headings.map(h =>
            h._id === id ? { ...h, [field]: value } : h
        ));
    };

    const removeH2Heading = (id) => {
        if (h2Headings.length > 1) {
            setH2Headings(h2Headings.filter(h => h._id !== id));
        }
    };

    const removeH3Heading = (id) => {
        if (h3Headings.length > 1) {
            setH3Headings(h3Headings.filter(h => h._id !== id));
        }
    };

    return (
        <div className="space-y-6">
            {/* Main Content Section */}
            <div>
                <label className="block text-sm font-medium text-black mb-2">
                    Main Content
                </label>
                <textarea
                    value={mainContent}
                    onChange={handleMainContentChange}
                    rows={8}
                    className="w-full px-4 py-2.5 border border-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none disabled:opacity-50"
                    disabled={disabled}
                />
                <div className="text-right text-xs text-black mt-1">
                    {mainContent.length}/10000
                </div>
            </div>

            {/* H2 Headings Section */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-black">
                        H2 Headings
                    </label>
                    <span className="text-xs text-gray-500">Add H2 sections for better structure</span>
                </div>

                <div className="space-y-4">
                    {h2Headings.map((heading, index) => (
                        <div key={heading._id} className="space-y-3">
                            <div className="flex gap-2 items-start">
                                <input
                                    type="text"
                                    value={heading.heading}
                                    onChange={(e) => updateH2Heading(heading._id, 'heading', e.target.value)}
                                    placeholder={`H2 Heading ${index + 1}`}
                                    className="flex-1 px-4 py-2.5 border border-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm disabled:opacity-50"
                                    disabled={disabled}
                                />
                                {h2Headings.length > 1 && (
                                    <button
                                        onClick={() => removeH2Heading(heading._id)}
                                        disabled={disabled}
                                        className="px-3 py-2.5 text-red-500 hover:text-red-700 disabled:opacity-50"
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
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={addH2Heading}
                    disabled={disabled}
                    className="mt-3 text-sm text-black border border-black font-medium flex items-center gap-1 px-3 py-1.5 disabled:opacity-50"
                >
                    <span className="text-lg">+</span> Add Another H2
                </button>
            </div>

            {/* MODIFIED: H3 Headings Section - Only shows one field initially */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-black">
                        H3 Headings
                    </label>
                    <span className="text-xs text-gray-500">Add H3 subheadings</span>
                </div>

                <div className="space-y-4">
                    {h3Headings.map((heading, index) => (
                        <div key={heading._id} className="space-y-3">
                            <div className="flex gap-2 items-start">
                                <div className="flex-1 space-y-2">
                                    {/* First field - always shown */}
                                    <input
                                        type="text"
                                        value={heading.subheading1}
                                        onChange={(e) => updateH3Heading(heading._id, 'subheading1', e.target.value)}
                                        placeholder={`H3 Subheading ${index + 1}`}
                                        className="w-full px-4 py-2.5 border border-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm disabled:opacity-50"
                                        disabled={disabled}
                                    />
                                    
                                    {/* Second field - only shown if showSecondField is true */}
                                    {heading.showSecondField && (
                                        <input
                                            type="text"
                                            value={heading.subheading2}
                                            onChange={(e) => updateH3Heading(heading._id, 'subheading2', e.target.value)}
                                            placeholder={`Additional details for H3 ${index + 1}`}
                                            className="w-full px-4 py-2.5 border border-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm disabled:opacity-50"
                                            disabled={disabled}
                                        />
                                    )}
                                </div>
                                {h3Headings.length > 1 && (
                                    <button
                                        onClick={() => removeH3Heading(heading._id)}
                                        disabled={disabled}
                                        className="px-3 py-2.5 text-red-500 hover:text-red-700 disabled:opacity-50"
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
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={addH3Heading}
                    disabled={disabled}
                    className="mt-3 text-sm text-black border border-black font-medium flex items-center gap-1 px-3 py-1.5 disabled:opacity-50"
                >
                    <span className="text-lg">+</span> Add Another H3
                </button>
            </div>
        </div>
    );
};

export default ServiceContent;