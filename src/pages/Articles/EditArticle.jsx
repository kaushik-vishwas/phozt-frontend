import React, { useState } from 'react';
import { Search, Bold, Italic, Underline, List, ListOrdered, Link, Image, Plus } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const EditArticle = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        articleTitle: '',
        articlePageCategory: 'Home Page',
        city: 'Bangalore',
        pageVisibility: 'Photography Bangalore',
        tags: '',
        autoTags: '',
        featuredImage: null,
        articleContent: '',
        excerpt: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            featuredImage: file
        }));
    };

    const handleSaveDraft = () => {
        console.log('Save Draft:', formData);
    };

    const handlePublish = () => {
        console.log('Publish:', formData);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex ml-64 flex-col">
                {/* Header */}
                <div className="bg-white border-b border-black px-6 py-4 flex justify-between items-start flex-shrink-0">
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="flex justify-between items-center mt-2 w-full">
                            <div className="flex items-center border border-black px-2 w-[70%]">
                                <Search size={18} className="text-black mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search anything here....."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="py-2 text-sm w-full outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-3 ml-4">
                                <span className="text-gray-900 font-medium">Alex</span>
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
                                    A
                                </div>
                            </div>
                        </div>
                        <h1 className="text-[32px] font-semibold text-black">Dashboard</h1>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 overflow-auto">
                    <div className="bg-white shadow-sm border border-black p-6">
                        {/* Article Services Category Header */}
                        <div className="mb-6 pb-4 border-b border-black">
                            <h2 className="text-lg font-semibold text-black">Article Services category</h2>
                            <p className="text-sm text-start text-gray-500">
                                You are Creating Articles  for pages to get viewers
                            </p>
                        </div>


                        {/* Edit Article Form */}
                        <div className="border border-black p-6">
                            {/* Header with buttons */}
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-black">
                                <h3 className="text-xl font-semibold text-black">Edit Article</h3>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleSaveDraft}
                                        className="px-6 py-2 border border-black bg-white text-black font-medium hover:bg-gray-50"
                                    >
                                        Save Draft
                                    </button>
                                    <button
                                        onClick={handlePublish}
                                        className="px-6 py-2 border border-black bg-[#E5E5E5] text-black font-medium hover:bg-gray-50"
                                    >
                                        Publish
                                    </button>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="space-y-6">
                                {/* Article Title */}
                                <div>
                                    <label className="block text-sm font-semibold text-black mb-2">
                                        Article Title
                                    </label>
                                    <input
                                        type="text"
                                        name="articleTitle"
                                        value={formData.articleTitle}
                                        onChange={handleChange}
                                        placeholder="Article title"
                                        className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:border-black"
                                    />
                                </div>

                                {/* Row with 3 dropdowns */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-black mb-2">
                                            Article Page category
                                        </label>
                                        <select
                                            name="articlePageCategory"
                                            value={formData.articlePageCategory}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                                        >
                                            <option value="Home Page">Home Page</option>
                                            <option value="Service Page">Service Page</option>
                                            <option value="Local Page">Local Page</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-black mb-2">
                                            City
                                        </label>
                                        <select
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                                        >
                                            <option value="Bangalore">Bangalore</option>
                                            <option value="Mumbai">Mumbai</option>
                                            <option value="Delhi">Delhi</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-black mb-2">
                                            Page Visibility
                                        </label>
                                        <select
                                            name="pageVisibility"
                                            value={formData.pageVisibility}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                                        >
                                            <option value="Photography Bangalore">Photography Bangalore</option>
                                            <option value="Photography General">Photography General</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div>
                                    <label className="block text-sm font-semibold text-black mb-2">
                                        Tags
                                    </label>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formData.tags}
                                        placeholder='Add Tags ( Comma Separated )'
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                                    />
                                </div>

                                {/* Auto Tags */}
                                {/* <div>
                                    <label className="block text-sm font-semibold text-black mb-2">
                                        Auto Tags ( Commas Separated )
                                    </label>
                                    <input
                                        type="text"
                                        name="autoTags"
                                        value={formData.autoTags}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                                    />
                                </div> */}

                                {/* Featured Images */}
                                <div>
                                    <label className="block text-sm font-semibold text-black mb-2">
                                        Featured Images
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <button className="px-4 py-2 border border-black bg-white text-black text-sm font-medium hover:bg-gray-50">
                                            Choose File
                                        </button>
                                        <span className="text-sm text-gray-500">
                                            {formData.featuredImage ? formData.featuredImage.name : 'No file Choosen'}
                                        </span>
                                    </div>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="fileInput"
                                    />
                                </div>

                                {/* Article Content */}
                                <div>
                                    <label className="block text-sm font-semibold text-black mb-2">
                                        Article Content
                                    </label>

                                    {/* Toolbar */}
                                    <div className="flex items-center gap-2 mb-2 p-2 border border-gray-300 bg-gray-50">
                                        <button className="p-1 hover:bg-gray-200 rounded">
                                            <Bold size={16} />
                                        </button>
                                        <button className="p-1 hover:bg-gray-200 rounded">
                                            <Italic size={16} />
                                        </button>
                                        <button className="p-1 hover:bg-gray-200 rounded">
                                            <Underline size={16} />
                                        </button>
                                        <button className="p-1 hover:bg-gray-200 rounded">
                                            <List size={16} />
                                        </button>
                                        <button className="p-1 hover:bg-gray-200 rounded">
                                            <ListOrdered size={16} />
                                        </button>
                                        <button className="p-1 hover:bg-gray-200 rounded">
                                            <Link size={16} />
                                        </button>
                                        <button className="p-1 hover:bg-gray-200 rounded">
                                            <Image size={16} />
                                        </button>
                                        <button className="p-1 hover:bg-gray-200 rounded text-xs font-bold">
                                            +/-
                                        </button>
                                    </div>

                                    <textarea
                                        name="articleContent"
                                        value={formData.articleContent}
                                        onChange={handleChange}
                                        placeholder="Please your Content Here"
                                        rows="8"
                                        className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:border-black resize-none"
                                    />
                                    <div className="text-right text-xs text-gray-500 mt-1">0/1000</div>
                                </div>

                                {/* Excerpt */}
                                <div>
                                    <label className="block text-sm font-semibold text-black mb-2">
                                        Excerpt
                                    </label>
                                    <textarea
                                        name="excerpt"
                                        value={formData.excerpt}
                                        onChange={handleChange}
                                        placeholder="Please your Content Here"
                                        rows="6"
                                        className="w-full px-3 py-2 border border-gray-300 text-sm placeholder:text-gray-400 focus:outline-none focus:border-black resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditArticle;