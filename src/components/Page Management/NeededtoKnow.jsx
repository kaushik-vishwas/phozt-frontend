import React, { useState, useEffect } from 'react';
import link from './../../assets/Icons/link.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrimaryFooter, updatePrimaryFooterField, deletePrimaryFooterItem } from '../../redux/footerSlice';

const NeededtoKnow = () => {
  const dispatch = useDispatch();
  const { primaryFooter, loading } = useSelector(state => state.footer);
  
  const [needToKnowItems, setNeedToKnowItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    dispatch(fetchPrimaryFooter());
  }, [dispatch]);

  useEffect(() => {
    if (primaryFooter?.needToKnow) {
      setNeedToKnowItems(primaryFooter.needToKnow);
    }
  }, [primaryFooter]);

  const handleAddItem = async () => {
    if (!newItem.trim()) return;
    
    try {
      await dispatch(updatePrimaryFooterField({
        field: 'needToKnow',
        value: newItem
      })).unwrap();
      
      setNewItem('');
      dispatch(fetchPrimaryFooter()); // Refresh data
      alert('Item added successfully!');
    } catch (error) {
      alert('Failed to add item: ' + error);
    }
  };

  const handleDeleteItem = async (item) => {
    if (window.confirm(`Are you sure you want to delete "${item}"?`)) {
      try {
        await dispatch(deletePrimaryFooterItem({
          section: 'needToKnow',
          value: item
        })).unwrap();
        
        dispatch(fetchPrimaryFooter()); // Refresh data
        alert('Item deleted successfully!');
      } catch (error) {
        alert('Failed to delete item: ' + error);
      }
    }
  };

  return (
    <div className="space-y-3 mb-5">
      <div className="max-w-md">
        <label className="block text-[20px] font-semibold text-black mb-1">
          Add Needed to Know Item
        </label>
        <div className="flex gap-2 mb-4">
          <div className="relative border border-black rounded bg-white flex-1">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter the item title"
              className="w-full pr-8 text-[14px] font-semibold placeholder:text-black outline-none px-3 py-2"
            />
            <img
              src={link}
              alt="link"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4"
            />
          </div>
          <button
            onClick={handleAddItem}
            disabled={loading || !newItem.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 whitespace-nowrap"
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Display existing items */}
      <div className="max-w-md">
        <h3 className="text-[18px] font-semibold text-black mb-2">Current Items:</h3>
        {loading ? (
          <p>Loading...</p>
        ) : needToKnowItems.length === 0 ? (
          <p className="text-gray-500">No items added yet</p>
        ) : (
          <div className="space-y-2">
            {needToKnowItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between border border-gray-200 rounded p-3">
                <div className="flex items-center gap-2">
                  <img src={link} alt="link" className="w-4 h-4" />
                  <span className="text-[14px] font-medium">{item}</span>
                </div>
                <button
                  onClick={() => handleDeleteItem(item)}
                  className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NeededtoKnow;