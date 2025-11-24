import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import article from '../../assets/Icons/article.png';
import published from '../../assets/Icons/published.png';
import view from '../../assets/Icons/view.png';
import draft from '../../assets/Icons/draft.png';
import edit1 from '../../assets/Icons/edit1.png';
import delete1 from '../../assets/Icons/delete1.png';
import { useNavigate } from 'react-router-dom';


const ArticlesMain = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const categories = [
        { id: 1, icon: article, title: 'Total Articles', count: '03', subtitle: '+5 from last week' },
        { id: 2, icon: published, title: 'Published', count: '03', subtitle: '+5 from last week, 65% published rate of articles' },
        { id: 3, icon: draft, title: 'Draft', count: '0', subtitle: 'Awaiting for the review' },
        { id: 4, icon: view, title: 'Total View', count: '1850', subtitle: '+5 from last week' },
    ];


    const vendors = [
        { id: 1, title: '10 Tips for Better Wedding Photography', page: 'Home Page', city: 'Bangalore', category: 'Home Page', status: 'Published', action: 'pending' },
        { id: 2, title: 'How to Choose the Right Camera Lens', page: 'Service Page', city: 'Mumbai', category: 'Photography General', status: 'Published', action: 'pending' },
        { id: 3, title: 'Best Locations for Portrait Photography in Bangalore', page: 'Local Page', city: 'Bangalore', category: 'Photography Bangalore', status: 'Published', action: 'pending' },
        { id: 4, title: '10 Tips for Better Wedding Photography', page: 'Home Page', city: 'Bangalore', category: 'Home Page', status: 'Published', action: 'pending' },
        { id: 5, title: 'How to Choose the Right Camera Lens', page: 'Service Page', city: 'Mumbai', category: 'Photography General', status: 'Published', action: 'pending' },
        { id: 6, title: 'Best Locations for Portrait Photography in Bangalore', page: 'Local Page', city: 'Bangalore', category: 'Photography Bangalore', status: 'Published', action: 'pending' },
        { id: 7, title: '10 Tips for Better Wedding Photography', page: 'Home Page', city: 'Bangalore', category: 'Home Page', status: 'Published', action: 'pending' },
        { id: 8, title: 'How to Choose the Right Camera Lens', page: 'Service Page', city: 'Mumbai', category: 'Photography General', status: 'pending', action: 'pending' },
        { id: 9, title: 'Best Locations for Portrait Photography in Bangalore', page: 'Local Page', city: 'Bangalore', category: 'Photography Bangalore', status: 'Published', action: 'pending' },
        { id: 10, title: '10 Tips for Better Wedding Photography', page: 'Home Page', city: 'Bangalore', category: 'Home Page', status: 'Published', action: 'pending' },
    ];

    const totalPages = 25;

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
                        {/* Article Services Category */}
                        <div className="mb-6">
                            <div className=" mb-4">
                                <h2 className="text-lg font-semibold text-black">Article Services category</h2>
                                <p className="text-sm text-start text-gray-500">
                                    You are Creating Articles  for pages to get viewers
                                </p>
                            </div>

                            {/* Category Cards */}
                            <div className="grid grid-cols-4 gap-4 mb-6">
                                {categories.map((category) => (
                                    <div key={category.id} className="bg-white border border-black p-4 flex flex-col gap-1">
                                        {/* Icon */}
                                        <img src={category.icon} alt={category.title} className="w-6 h-5" />

                                        {/* Title */}
                                        <h3 className="font-semibold text-sm text-black">{category.title}</h3>

                                        {/* Count */}
                                        <div className="text-2xl font-bold text-black">{category.count}</div>

                                        {/* Subtitle */}
                                        <p className="text-xs text-gray-600">{category.subtitle}</p>
                                    </div>
                                ))}
                            </div>


                            {/* Add New Article Button */}
                            <div className="flex justify-end mb-4">
                                <button className="px-4 py-2 bg-white border border-black text-sm font-medium text-black hover:bg-gray-50 flex items-center gap-2">
                                    <Plus className="w-4 h-4" />
                                    Add New Article
                                </button>
                            </div>

                            {/* Table Section */}
                            <div className="border border-black bg-white">
                                <div className="px-4 py-3 border-b border-black bg-gray-50">
                                    <h2 className="text-[20px] font-bold text-black">
                                        Total Photography Vendors
                                    </h2>
                                </div>

                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-black">
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-black border-r border-black">
                                                    Heading
                                                </th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-black border-r border-black">
                                                    Page Category
                                                </th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-black border-r border-black">
                                                    city
                                                </th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-black border-r border-black">
                                                    Page Visibility
                                                </th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-black border-r border-black">
                                                    status
                                                </th>
                                                <th className="px-4 py-3 text-center text-sm font-semibold text-black">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vendors.map((vendor, index) => (
                                                <tr
                                                    key={vendor.id}
                                                    className={`${index !== vendors.length - 1
                                                        ? 'border-b border-black'
                                                        : ''
                                                        }`}
                                                >
                                                    <td className="px-4 py-3 text-xs text-black border-r border-black">
                                                        {vendor.title}
                                                    </td>
                                                    <td className="px-4 py-3 text-xs text-black border-r border-black">
                                                        {vendor.page}
                                                    </td>
                                                    <td className="px-4 py-3 text-xs text-black border-r border-black">
                                                        {vendor.city}
                                                    </td>
                                                    <td className="px-4 py-3 text-xs text-black border-r border-black">
                                                        {vendor.category}
                                                    </td>
                                                    <td className="px-4 py-3 text-xs text-black border-r border-black">
                                                        {vendor.status}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center justify-center gap-3">
                                                            <button
                                                                className="text-black hover:text-gray-600"
                                                                onClick={() => navigate('/edit-article')}
                                                            >
                                                                <img src={edit1} alt="Edit" className="w-4 h-4" />
                                                            </button>

                                                            <button className="text-black hover:text-gray-600">
                                                                <img src={delete1} alt="Delete" className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <div className="px-4 py-3 border-t border-black flex items-center justify-between">
                                    <span className="text-sm text-black">
                                        Showing 1-3 of 15 pages
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                            className="p-1 hover:bg-gray-100"
                                            disabled={currentPage === 1}
                                        >
                                            <ChevronLeft size={18} />
                                        </button>
                                        <button className="px-3 py-1 bg-black text-white text-sm">
                                            {currentPage}
                                        </button>
                                        <button className="px-3 py-1 border border-black text-sm hover:bg-gray-50">
                                            2
                                        </button>
                                        <button className="px-3 py-1 border border-black text-sm hover:bg-gray-50">
                                            3
                                        </button>
                                        <button className="px-3 py-1 border border-black text-sm hover:bg-gray-50">
                                            4
                                        </button>
                                        <button className="px-3 py-1 border border-black text-sm hover:bg-gray-50">
                                            5
                                        </button>
                                        <button className="px-3 py-1 border border-black text-sm hover:bg-gray-50">
                                            6
                                        </button>
                                        <span className="text-sm">...</span>
                                        <button className="px-3 py-1 border border-black text-sm hover:bg-gray-50">
                                            {totalPages}
                                        </button>
                                        <button
                                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                            className="p-1 hover:bg-gray-100"
                                            disabled={currentPage === totalPages}
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticlesMain;