// frontend/components/Page HomePage/OtherVendorsTab.jsx
import React, { useState, useEffect } from "react";
import { PlusIcon, MagnifyingGlassIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import AddVendorCard from "./AddServiceVendorCard";

const VendorCard = ({ vendor, selected, onDelete, onEdit, index }) => {
  return (
    <div className="relative border rounded-md p-3 text-sm bg-white hover:shadow transition group">
      <p className="font-medium text-gray-800">{vendor.studioName || "Unnamed Studio"}</p>
      <p className="text-xs text-gray-500 mt-1">{vendor.studioDescription || "No description provided"}</p>
      
      {/* Additional details */}
      {vendor.rating && (
        <div className="flex items-center mt-1">
          <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">
            ⭐ {vendor.rating}
          </span>
        </div>
      )}
      
      {/* Action Buttons Container */}
      <div className="absolute top-2 right-2 flex gap-1">
        <button
          onClick={onEdit}
          className="text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity p-1"
          title="Edit"
        >
          <PencilSquareIcon className="h-4 w-4" />
        </button>
        
        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1"
          title="Delete"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>

      {selected && (
        <span className="absolute top-2 left-2 text-blue-600 font-bold">
          ✓
        </span>
      )}
    </div>
  );
};

const VendorBlock = ({ 
  block, 
  onUpdateBlock, 
  onAddCard, 
  onEditCard,
  onDeleteBlock,
  onDeleteCard
}) => {
  const [showAddVendorCard, setShowAddVendorCard] = useState(false);
  const [editingCardIndex, setEditingCardIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleAddCard = (cardData) => {
    if (editMode && editingCardIndex !== null) {
      // Edit existing card
      onEditCard(block.id, editingCardIndex, cardData);
      setEditMode(false);
      setEditingCardIndex(null);
    } else {
      // Add new card
      onAddCard(block.id, cardData);
    }
    setShowAddVendorCard(false);
  };

  const handleEditCard = (index) => {
    setEditMode(true);
    setEditingCardIndex(index);
    setShowAddVendorCard(true);
  };

  const handleCardDelete = (cardIndex) => {
    onDeleteCard(block.id, cardIndex);
  };

  const handleCloseModal = () => {
    setShowAddVendorCard(false);
    setEditMode(false);
    setEditingCardIndex(null);
  };

  return (
    <div className="space-y-6 border rounded-lg p-6 bg-gray-50">
      {/* Block Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          Section {block.id}
        </h3>
        {onDeleteBlock && (
          <button
            onClick={onDeleteBlock}
            className="text-gray-400 hover:text-red-600"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Heading + Sub Service */}
      <div className="grid grid-cols-2 gap-10">
        {/* Left */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Heading for sub vendor category
          </label>
          <input
            type="text"
            value={block.heading || ""}
            onChange={(e) => onUpdateBlock(block.id, 'heading', e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter heading"
          />
        </div>

        {/* Right */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select 1st Sub Service
          </label>
          <p className="text-xs text-gray-500 mb-1">
            Add upto 10 internal Service vendors that shows in the page on our website
          </p>
          <select 
            value={block.service || ""}
            onChange={(e) => onUpdateBlock(block.id, 'service', e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select a service</option>
            <option>Decoration</option>
            <option>Photography</option>
            <option>Makeup</option>
            <option>Catering</option>
          </select>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-sm">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Choose the Vendors from list of vendors
        </label>
        <div className="relative">
          <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search vendors"
            className="w-full border rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Vendor Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium text-gray-700">Vendors ({block.cards.length})</h4>
          <button
            onClick={() => {
              setEditMode(false);
              setEditingCardIndex(null);
              setShowAddVendorCard(true);
            }}
            className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Add Vendor Card</span>
          </button>
        </div>
        
        {block.cards.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {block.cards.map((card, index) => (
              <VendorCard
                key={index}
                vendor={card}
                selected={card.selected}
                index={index}
                onDelete={() => handleCardDelete(index)}
                onEdit={() => handleEditCard(index)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed rounded-lg">
            <p className="text-gray-500">No vendors added yet</p>
            <button
              onClick={() => {
                setEditMode(false);
                setEditingCardIndex(null);
                setShowAddVendorCard(true);
              }}
              className="mt-2 text-sm text-blue-600 hover:text-blue-700"
            >
              Click here to add your first vendor
            </button>
          </div>
        )}
      </div>

      {/* AddVendorCard Modal */}
      {showAddVendorCard && (
        <AddVendorCard
          onAdd={handleAddCard}
          onClose={handleCloseModal}
          editMode={editMode}
          initialData={editMode && editingCardIndex !== null ? block.cards[editingCardIndex] : null}
        />
      )}
    </div>
  );
};

const OtherVendorsTab = ({ otherVendorsData, onUpdate, disabled }) => {
  const [blocks, setBlocks] = useState(() => {
    // Initialize blocks from props or create default
    if (otherVendorsData && otherVendorsData.length > 0) {
      return otherVendorsData.map((section, index) => ({
        id: index + 1,
        heading: section.title || "",
        service: section.selectedService || "",
        cards: section.vendors || []
      }));
    }
    return [{
      id: 1,
      heading: "",
      service: "",
      cards: []
    }];
  });
  
  const [nextBlockId, setNextBlockId] = useState(blocks.length + 1);

  // Update parent component when blocks change
  useEffect(() => {
    const formattedData = blocks.map(block => ({
      title: block.heading,
      selectedService: block.service,
      searchQuery: "",
      vendors: block.cards.map(card => ({
        studioName: card.studioName || "",
        studioDescription: card.studioDescription || "",
        eventLocation: card.eventLocation || "",
        rating: card.rating || "",
        pricing: card.pricing || "",
        area: card.area || "",
        services: card.services || ["", "", "", ""],
        portfolioImages: card.portfolioImages || [],
        selected: card.selected || false
      }))
    }));
    
    onUpdate(formattedData);
  }, [blocks, onUpdate]);

  const addNewBlock = () => {
    const newBlock = {
      id: nextBlockId,
      heading: "",
      service: "",
      cards: []
    };
    setBlocks([...blocks, newBlock]);
    setNextBlockId(nextBlockId + 1);
  };

  const deleteBlock = (blockId) => {
    if (blocks.length > 1) {
      setBlocks(blocks.filter(block => block.id !== blockId));
    }
  };

  const updateBlock = (blockId, field, value) => {
    setBlocks(blocks.map(block => 
      block.id === blockId ? { ...block, [field]: value } : block
    ));
  };

  const addCardToBlock = (blockId, cardData) => {
    setBlocks(blocks.map(block => 
      block.id === blockId 
        ? { ...block, cards: [...block.cards, { ...cardData, selected: false }] }
        : block
    ));
  };

  const editCardInBlock = (blockId, cardIndex, cardData) => {
    setBlocks(blocks.map(block => 
      block.id === blockId 
        ? { 
            ...block, 
            cards: block.cards.map((card, index) => 
              index === cardIndex ? { ...card, ...cardData } : card
            )
          }
        : block
    ));
  };

  const deleteCardFromBlock = (blockId, cardIndex) => {
    setBlocks(blocks.map(block => 
      block.id === blockId 
        ? { 
            ...block, 
            cards: block.cards.filter((_, index) => index !== cardIndex) 
          }
        : block
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Other Vendors</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage sections and vendor cards dynamically
          </p>
        </div>
        <button
          onClick={addNewBlock}
          disabled={disabled}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add New Section</span>
        </button>
      </div>

      {/* Blocks */}
      <div className="space-y-6">
        {blocks.map((block) => (
          <VendorBlock
            key={block.id}
            block={block}
            onUpdateBlock={updateBlock}
            onAddCard={addCardToBlock}
            onEditCard={editCardInBlock}
            onDeleteBlock={() => deleteBlock(block.id)}
            onDeleteCard={deleteCardFromBlock}
          />
        ))}
      </div>

      {/* Add More Section Button */}
      <div className="pt-4 border-t">
        <button
          onClick={addNewBlock}
          disabled={disabled}
          className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          <span>Add Another Section</span>
        </button>
      </div>
    </div>
  );
};

export default OtherVendorsTab;