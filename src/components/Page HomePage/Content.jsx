import React, { useState } from 'react';

const Content = () => {
    const [mainContent, setMainContent] = useState('');
    const [h2Headings, setH2Headings] = useState([
        { id: 1, heading: 'Popular Events, our finest photographers', subheading: '' }
    ]);
    const [h3Headings, setH3Headings] = useState([
        { id: 1, heading: 'reviews, articles', subheading1: '', subheading2: '' }
    ]);
    const [charCount, setCharCount] = useState(0);

    const handleMainContentChange = (e) => {
        const text = e.target.value;
        setMainContent(text);
        setCharCount(text.length);
    };

    const addH2Heading = () => {
        setH2Headings([...h2Headings, { id: Date.now(), heading: '', subheading: '' }]);
    };

    const addH3Heading = () => {
        setH3Headings([...h3Headings, { id: Date.now(), heading: '', subheading1: '', subheading2: '' }]);
    };

    const updateH2Heading = (id, field, value) => {
        setH2Headings(h2Headings.map(h =>
            h.id === id ? { ...h, [field]: value } : h
        ));
    };

    const updateH3Heading = (id, field, value) => {
        setH3Headings(h3Headings.map(h =>
            h.id === id ? { ...h, [field]: value } : h
        ));
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
                    //   placeholder="Enter main content..."
                    className="w-full px-4 py-2.5 border border-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
                />
                <div className="text-right text-xs text-black mt-1">
                    {charCount}/10000
                </div>
            </div>

            {/* H2 Headings Section */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-black">
                        H2 Heading (Popular Events, our finest photographers)
                    </label>
                    {/* <span className="text-xs text-gray-500">H2</span> */}
                </div>

                <div className="space-y-4">
                    {h2Headings.map((heading) => (
                        <div key={heading.id} className="space-y-3">
                            <input
                                type="text"
                                value={heading.heading}
                                onChange={(e) => updateH2Heading(heading.id, 'heading', e.target.value)}
                                // placeholder="Popular Events, our finest photographers"
                                className="w-[400px] px-4 py-2.5 border border-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            />
                            {/* <input
                type="text"
                value={heading.subheading}
                onChange={(e) => updateH2Heading(heading.id, 'subheading', e.target.value)}
                placeholder="Enter H2 Heading"
                className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              /> */}
                        </div>
                    ))}
                </div>

                <button
                    onClick={addH2Heading}
                    className="mt-3 text-sm text-black border border-black font-medium flex items-center gap-1"
                >
                    <span className="text-lg">+</span> Add Another H2
                </button>
            </div>

            {/* H3 Headings Section */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-black">
                        H3 Heading (reviews, articles)
                    </label>
                </div>

                <div className="space-y-4">
                    {h3Headings.map((heading) => (
                        <div key={heading.id} className="space-y-3">
                            <input
                                type="text"
                                value={heading.subheading1}
                                onChange={(e) => updateH3Heading(heading.id, 'subheading1', e.target.value)}
                                placeholder="Enter H3 Heading"
                                className="w-[400px] px-4 py-2.5 border border-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm block"
                            />
                            <input
                                type="text"
                                value={heading.subheading2}
                                onChange={(e) => updateH3Heading(heading.id, 'subheading2', e.target.value)}
                                placeholder="Enter H3 Heading"
                                className="w-[400px] px-4 py-2.5 border border-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm block"
                            />
                        </div>
                    ))}
                </div>

                <button
                    onClick={addH3Heading}
                    className="mt-3 text-sm text-black border border-black font-medium flex items-center gap-1"
                >
                    <span className="text-lg">+</span> Add Another H3
                </button>
            </div>

        </div>
    );
};

export default Content;