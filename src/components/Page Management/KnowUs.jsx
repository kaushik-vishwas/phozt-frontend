import React, { useState, useEffect } from 'react';
import link from './../../assets/Icons/link.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrimaryFooter, updatePrimaryFooterField, deletePrimaryFooterItem } from '../../redux/footerSlice';

const KnowUs = () => {
  const dispatch = useDispatch();
  const { primaryFooter, loading } = useSelector(state => state.footer);
  
  const [knowUsItems, setKnowUsItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    dispatch(fetchPrimaryFooter());
  }, [dispatch]);

  useEffect(() => {
    if (primaryFooter?.knowUs) {
      setKnowUsItems(primaryFooter.knowUs);
    }
  }, [primaryFooter]);

  const handleAddItem = async () => {
    if (!newItem.trim()) return;
    
    try {
      await dispatch(updatePrimaryFooterField({
        field: 'knowUs',
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
          section: 'knowUs',
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
      <div className="max-w-xs">
        <label className="block text-[20px] font-semibold text-black mb-1">
          Add Know Us Item
        </label>
        <div className="flex items-center gap-2 px-3 py-2 border border-black bg-white mb-3">
          <img src={link} alt="link" className="w-4 h-4" />
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new Know Us item"
            className="w-56 text-[14px] font-semibold placeholder:text-black outline-none flex-1"
          />
          <button
            onClick={handleAddItem}
            disabled={loading || !newItem.trim()}
            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            Add
          </button>
        </div>
      </div>

      {/* Display existing items */}
      <div className="max-w-md">
        <h3 className="text-[18px] font-semibold text-black mb-2">Current Know Us Items:</h3>
        {loading ? (
          <p>Loading...</p>
        ) : knowUsItems.length === 0 ? (
          <p className="text-gray-500">No items added yet</p>
        ) : (
          <div className="space-y-2">
            {knowUsItems.map((item, index) => (
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

export default KnowUs;