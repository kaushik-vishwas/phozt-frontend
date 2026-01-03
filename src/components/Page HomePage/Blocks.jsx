import React, { useState, useEffect } from 'react';
import AddNewCard from '../../components/Page HomePage/AddNewCard';
import Edit1 from '../../assets/Icons/edit1.png';
import Delete1 from '../../assets/Icons/delete1.png';

const Blocks = ({ blocksData, onUpdate, disabled = false }) => {
    const [blocks, setBlocks] = useState(blocksData || []);
    const [showAddNew, setShowAddNew] = useState(false);
    const [editingBlock, setEditingBlock] = useState(null);

    useEffect(() => {
        onUpdate(blocks);
    }, [blocks, onUpdate]);

    const handleAddNewCard = (newCard) => {
        setBlocks([...blocks, { 
            ...newCard,
            _id: Date.now().toString()
        }]);
        setShowAddNew(false);
    };

    const handleEditCard = (id, updatedCard) => {
        setBlocks(blocks.map(block => 
            block._id === id ? { ...block, ...updatedCard } : block
        ));
        setEditingBlock(null);
    };

    const handleDeleteCard = (id) => {
        setBlocks(blocks.filter(block => block._id !== id));
    };


    if (showAddNew) {
        return (
            <AddNewCard
                onClose={() => setShowAddNew(false)}
                onSave={handleAddNewCard}
            />
        );
    }

    if (editingBlock) {
        const blockToEdit = blocks.find(b => b._id === editingBlock);
        return (
            <AddNewCard
                onClose={() => setEditingBlock(null)}
                onSave={(updatedCard) => handleEditCard(editingBlock, updatedCard)}
                initialData={blockToEdit}
                editMode={true}
            />
        );
    }

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-base font-semibold text-black mb-1">Service Cards</h3>
                    <p className="text-sm text-black">
                        Create and manage photography service cards that will be displayed on the homepage.
                    </p>
                </div>
                <button
                    onClick={() => setShowAddNew(true)}
                    disabled={disabled}
                    className="flex items-center gap-2 px-4 py-2 border border-black text-black hover:bg-gray-50 text-sm font-medium disabled:opacity-50"
                >
                    <span className="text-lg">+</span>
                    Add New Card
                </button>
            </div>

            {/* Cards Grid */}
            {blocks.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500">No service cards added yet.</p>
                    <button
                        onClick={() => setShowAddNew(true)}
                        disabled={disabled}
                        className="mt-4 text-sm text-purple-600 hover:text-purple-800 font-medium"
                    >
                        Add your first service card
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {blocks.map((block) => (
                        <div key={block._id} className="border border-black bg-white p-4 flex flex-col hover:shadow-md transition-shadow duration-200">
                            {/* Card Image */}
                            <div className="w-full h-48 bg-gray-100 mb-4 flex items-center justify-center overflow-hidden rounded">
                                {block.imageUrl ? (
                                    <img 
                                        src={block.imageUrl} 
                                        alt={block.serviceName} 
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                                        }}
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-gray-400">
                                        <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        <span className="text-sm">No image uploaded</span>
                                    </div>
                                )}
                            </div>

                            {/* Card Content */}
                            <div className="flex-1">
                                <h3 className="text-base font-semibold text-black mb-2 line-clamp-1">
                                    {block.serviceName || 'Untitled Service'}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                    {block.serviceDescription || 'No description provided'}
                                </p>
                            </div>

                            {/* Card Actions */}
                            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200">
                                <button
                                    onClick={() => setEditingBlock(block._id)}
                                    disabled={disabled}
                                    className="flex items-center gap-1.5 text-sm border border-gray-300 text-gray-700 hover:text-black hover:border-black px-3 py-1.5 rounded disabled:opacity-50 transition-colors duration-200"
                                >
                                    <img src={Edit1} alt="Edit" className="w-4 h-4" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to delete this card?')) {
                                            handleDeleteCard(block._id);
                                        }
                                    }}
                                    disabled={disabled}
                                    className="flex items-center gap-1.5 text-sm border border-gray-300 text-gray-700 hover:text-red-600 hover:border-red-600 px-3 py-1.5 rounded disabled:opacity-50 transition-colors duration-200"
                                >
                                    <img src={Delete1} alt="Delete" className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Blocks;