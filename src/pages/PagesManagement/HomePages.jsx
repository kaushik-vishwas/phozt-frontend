import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import edit from "../../assets/Icons/edit1.png";
import deletee from "../../assets/Icons/delete1.png";
import AddNewHomePage from '../../pages/PagesManagement/AddNewHomePage';

const HomePages = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const pagesData = [
    { id: 1, title: 'Photography in Bengaluru', service: 'Photography', city: 'Bengaluru', slug: '/Photography-bengaluru', status: 'Published' },
    { id: 2, title: 'Wedding Makeup', service: 'Makeup', city: 'Bengaluru', slug: '/wedding-photography', status: 'Published' },
    { id: 3, title: 'Decorators in Bengaluru', service: 'Decoration', city: 'Bengaluru', slug: '/Decorators-Bengaluru', status: 'Published' },
    { id: 4, title: 'Makeup artist in Marathalli', service: 'Makeup', city: 'Bengaluru', slug: '/makeup-artist-marathahalli', status: 'Published' },
    { id: 5, title: 'Photography in Bengaluru', service: 'Photography', city: 'Bengaluru', slug: '/Photography-bengaluru', status: 'Published' },
    { id: 6, title: 'Wedding Photography', service: 'Photography', city: 'Bengaluru', slug: '/wedding-photography', status: 'Published' },
    { id: 7, title: 'Makeup artist in Marathalli', service: 'Makeup', city: 'Bengaluru', slug: '/makeup-artist-marathahalli', status: 'Published' },
    { id: 8, title: 'Photography in Bengaluru', service: 'Photography', city: 'Bengaluru', slug: '/Photography-bengaluru', status: 'Published' },
    { id: 9, title: 'Wedding Photography', service: 'Photography', city: 'Bengaluru', slug: '/wedding-photography', status: 'Published' },
  ];

  const totalPages = 25;

  const handleEdit = (id) => console.log('Edit page:', id);
  const handleDelete = (id) => console.log('Delete page:', id);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col ml-64 flex-1">
        {/* Dashboard Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-start flex-shrink-0">
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex justify-between items-center mt-2 w-full">
              <div className="flex items-center border border-gray-300 rounded px-2 w-[70%]">
                <Search size={18} className="text-gray-400 mr-2" />
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
            <h1 className="text-[32px] font-semibold text-black">Home Pages According to City and Services</h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6">
              <h1 className='text-[28px] font-bold'>Home Pages</h1>
              <button
                onClick={() => setIsModalOpen(true)} // Open modal
                className="px-4 py-2 bg-white border border-black text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
              >
                <span className="text-lg">+</span> Add New Home Page
              </button>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-lg shadow">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-black">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-black border border-black">Title</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-black border border-black">Service</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-black border border-black">City</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-black border border-black">Slug</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-black border border-black">Status</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-black border border-black">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagesData.map((page) => (
                      <tr key={page.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-black border border-black">{page.title}</td>
                        <td className="px-6 py-4 text-sm text-black border border-black">{page.service}</td>
                        <td className="px-6 py-4 text-sm text-black border border-black">{page.city}</td>
                        <td className="px-6 py-4 text-sm text-black border border-black">{page.slug}</td>
                        <td className="px-6 py-4 text-sm text-black border border-black">{page.status}</td>
                        <td className="px-6 py-4 text-sm text-black border border-black">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(page.id)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <img src={edit} alt="Edit" className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(page.id)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <img src={deletee} alt="Delete" className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-black border flex items-center justify-between mt-4">
              <div className="text-sm text-black">Showing 1–9 of 15 pages</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5, 6].map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded ${currentPage === page
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                  <span className="px-2 text-gray-600">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-8 h-8 rounded text-gray-700 hover:bg-gray-100"
                  >
                    {totalPages}
                  </button>
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> {/* End of Main Content */}

      {/* Modal */}
      {isModalOpen && (
        <AddNewHomePage onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default HomePages;
