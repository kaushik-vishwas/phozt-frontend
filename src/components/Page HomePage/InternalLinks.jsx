import React, { useState } from 'react';

const InternalLinks = () => {
    const [selectedCity, setSelectedCity] = useState('bangalore');
    const [blockName, setBlockName] = useState('');
    const [urls, setUrls] = useState([
        { id: 1, url: '' }
    ]);
    const [linkBlocks, setLinkBlocks] = useState([
        {
            id: 1,
            title: 'Bangalore Photography Services',
            subtitle: '/locations/bangalore',
            links: []
        },
        {
            id: 2,
            title: 'Portrait Photography Services',
            subtitle: '/Photography/bangalore',
            links: []
        },
        {
            id: 3,
            title: 'Bangalore Photography Services',
            subtitle: '/locations/bangalore',
            links: []
        },
        {
            id: 4,
            title: 'Portrait Photography Services',
            subtitle: '/Photography/bangalore',
            links: []
        }
    ]);

    const cities = [
        { value: 'bangalore', label: 'bangalore' },
        { value: 'mumbai', label: 'Mumbai' },
        { value: 'delhi', label: 'Delhi' },
        { value: 'chennai', label: 'Chennai' }
    ];

    const addNewUrl = () => {
        setUrls([...urls, { id: Date.now(), url: '' }]);
    };

    const updateUrl = (id, value) => {
        setUrls(urls.map(url =>
            url.id === id ? { ...url, url: value } : url
        ));
    };

    const removeUrl = (id) => {
        if (urls.length > 1) {
            setUrls(urls.filter(url => url.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Description */}
            <div>
                <h3 className="text-sm mb-1">
                    <span className="font-semibold text-black">Internal Links</span>
                    <span className="font-normal text-black">
                        {' '} (Add upto 50 Internal Links that redirect to other pages on our website)
                    </span>
                </h3>
            </div>


            {/* City Selection and Block Name */}
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-black mb-2">
                        Select the City
                    </label>
                    <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full px-4 py-2.5 border border-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
                    >
                        {cities.map((city) => (
                            <option key={city.value} value={city.value}>
                                {city.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium text-black mb-2">
                        Block Name
                    </label>
                    <input
                        type="text"
                        placeholder="Block Name"
                        value={blockName}
                        onChange={(e) => setBlockName(e.target.value)}
                        className="w-full px-4 py-2.5 border border-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                </div>
            </div>

            {/* Paste the URL Section */}
            <div>
                <label className="block text-sm font-medium text-black mb-2">
                    Paste the URL
                </label>
                <div className="space-y-3 w-[500px]">
                    {urls.map((urlItem, index) => (
                        <div key={urlItem.id} className="flex gap-2">
                            <input
                                type="text"
                                placeholder="URL paste here"
                                value={urlItem.url}
                                onChange={(e) => updateUrl(urlItem.id, e.target.value)}
                                className="flex-1 px-4 py-2.5 border border-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            />
                            {urls.length > 1 && (
                                <button
                                    onClick={() => removeUrl(urlItem.id)}
                                    className="px-3 py-2 text-gray-500 hover:text-red-600"
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
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <button
                    onClick={addNewUrl}
                    className="mt-3 text-sm text-black border border-black hover:text-purple-700 font-medium flex items-center gap-1"
                >
                    <span className="text-lg">+</span> Add Another URL
                </button>
            </div>

            {/* Link Blocks Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
                {linkBlocks.map((block) => (
                    <div
                        key={block.id}
                        className="border border-black bg-white p-4"
                    >
                        <h4 className="text-sm font-semibold text-black mb-1">
                            {block.title}
                        </h4>
                        <p className="text-xs text-gray-600">
                            {block.subtitle}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InternalLinks;