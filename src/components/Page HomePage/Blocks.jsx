import React, { useState } from 'react';
import AddNewCard from '../../components/Page HomePage/AddNewCard';
import Edit1 from '../../assets/Icons/edit1.png';
import Delete1 from '../../assets/Icons/delete1.png';

const Blocks = () => {
    const [showAddNew, setShowAddNew] = useState(false);
    const [cards, setCards] = useState([
        {
            id: 1,
            title: 'Birthday',
            description:
                "From sweet smiles to joyful giggles, make your baby's birthday unforgettable with our trusted vendors.",
        },
        {
            id: 2,
            title: 'Wedding',
            description:
                "From sweet smiles to joyful giggles, make your baby's birthday unforgettable with our trusted vendors.",
        },
        {
            id: 3,
            title: 'Naming Ceremony',
            description:
                "From sweet smiles to joyful giggles, make your baby's birthday unforgettable with our trusted vendors.",
        },
        {
            id: 4,
            title: 'Annaprashan',
            description:
                "From sweet smiles to joyful giggles, make your baby's birthday unforgettable with our trusted vendors.",
        },
        {
            id: 5,
            title: 'Corporate Event',
            description:
                "From sweet smiles to joyful giggles, make your baby's birthday unforgettable with our trusted vendors.",
        },
        {
            id: 6,
            title: 'Baby Shower',
            description:
                "From sweet smiles to joyful giggles, make your baby's birthday unforgettable with our trusted vendors.",
        },
    ]);

    const addNewCard = () => {
        setShowAddNew(true); // show AddNewCard component
    };

    const updateCard = (id, field, value) => {
        setCards(cards.map((card) => (card.id === id ? { ...card, [field]: value } : card)));
    };

    const deleteCard = (id) => {
        setCards(cards.filter((card) => card.id !== id));
    };

    // When AddNewCard is open
    if (showAddNew) {
        return (
            <AddNewCard
                onClose={() => setShowAddNew(false)} // close and go back to Blocks
            />
        );
    }

    // When normal Block cards view
    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-base font-semibold text-black mb-1">Add New Service Card</h3>
                    <p className="text-sm text-black">
                        Create and manage photography service cards that will be displayed on the homepage.
                    </p>
                </div>
                <button
                    onClick={addNewCard}
                    className="flex items-center gap-2 px-4 py-2 border border-black text-black hover:bg-gray-50 text-sm font-medium"
                >
                    <span className="text-lg">+</span>
                    Add New Card
                </button>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-3 gap-4">
                {cards.map((card) => (
                    <div key={card.id} className="border border-black bg-white p-4 flex flex-col">
                        {/* Card Image Placeholder */}
                        <div className="w-full h-32 bg-gray-100 mb-4"></div>

                        {/* Card Title */}
                        <input
                            type="text"
                            value={card.title}
                            onChange={(e) => updateCard(card.id, 'title', e.target.value)}
                            placeholder="Service Title"
                            className="text-base font-semibold text-black mb-2 px-2 py-1 border border-transparent hover:border-black focus:outline-none focus:border-purple-500"
                        />

                        {/* Card Description */}
                        <textarea
                            value={card.description}
                            onChange={(e) => updateCard(card.id, 'description', e.target.value)}
                            placeholder="Service description..."
                            rows={3}
                            className="text-sm text-black mb-4 px-2 py-1 border border-transparent hover:border-black focus:outline-none focus:border-purple-500 resize-none"
                        />

                        {/* Card Actions */}
                        <div className="flex items-center justify-between mt-auto pt-3 ">
                            <button
                                onClick={() => { }}
                                className="flex items-center gap-1 text-sm border border-black text-black hover:text-black"
                            >
                                <img src={Edit1} alt="Edit" className="w-4 h-4" />
                                Edit
                            </button>
                            <button
                                onClick={() => deleteCard(card.id)}
                                className="flex items-center gap-1 border border-black text-sm text-black hover:text-red-600"
                            >
                                <img src={Delete1} alt="Delete" className="w-4 h-4" />
                                Delete
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blocks;
