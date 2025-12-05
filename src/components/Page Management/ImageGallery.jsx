// components/ImageManagement/ImageGallery.jsx
import React, { useState, useEffect } from 'react';
import { Search, Grid, List, Filter, Download, Share2, MoreVertical } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllImages, deleteImage, bulkUploadImages } from '../../redux/imageSlice';
import ImageComponent from './ImageComponent';

const ImageGallery = ({ 
  onSelectImage, 
  folder = 'general',
  selectionMode = false,
  onClose = null 
}) => {
  const dispatch = useDispatch();
  const { images, loading, error } = useSelector(state => state.images);
  
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedImages, setSelectedImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFolder, setFilterFolder] = useState(folder);
  const [bulkUploading, setBulkUploading] = useState(false);

  useEffect(() => {
    dispatch(getAllImages(filterFolder));
  }, [dispatch, filterFolder]);

  const filteredImages = images.filter(img => 
    img.filename?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.originalName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageSelect = (image) => {
    if (selectionMode) {
      if (selectedImages.some(img => img._id === image._id)) {
        setSelectedImages(selectedImages.filter(img => img._id !== image._id));
      } else {
        setSelectedImages([...selectedImages, image]);
      }
    } else {
      if (onSelectImage) {
        onSelectImage(image.url || image.secure_url);
      }
      if (onClose) onClose();
    }
  };

  const handleBulkUpload = async (files) => {
    setBulkUploading(true);
    try {
      await dispatch(bulkUploadImages({ files, folder: filterFolder })).unwrap();
      dispatch(getAllImages(filterFolder));
    } catch (err) {
      console.error('Bulk upload failed:', err);
    } finally {
      setBulkUploading(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (window.confirm(`Delete ${selectedImages.length} selected images?`)) {
      for (const image of selectedImages) {
        await dispatch(deleteImage(image._id));
      }
      setSelectedImages([]);
      dispatch(getAllImages(filterFolder));
    }
  };

  const folders = ['general', 'header', 'logo', 'products', 'gallery', 'users'];

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Toolbar */}
      <div className="p-4 border-b flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-64"
            />
          </div>
          
          <select
            value={filterFolder}
            onChange={(e) => setFilterFolder(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Folders</option>
            {folders.map(folder => (
              <option key={folder} value={folder}>{folder}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
            >
              <List size={20} />
            </button>
          </div>

          {selectionMode && selectedImages.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete Selected ({selectedImages.length})
            </button>
          )}
        </div>
      </div>

      {/* Bulk Upload Area */}
      <div className="p-4 border-b">
        <ImageComponent
          folder={filterFolder}
          multiple={true}
          onImageSelect={handleBulkUpload}
          maxSizeMB={10}
        />
        {bulkUploading && (
          <div className="text-center text-blue-600 mt-2">
            Uploading images...
          </div>
        )}
      </div>

      {/* Images Grid/List */}
      <div className="p-4">
        {loading ? (
          <div className="text-center py-8">Loading images...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">{error}</div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No images found. Upload some images to get started.
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image._id}
                className={`relative group cursor-pointer border rounded-lg overflow-hidden ${
                  selectedImages.some(img => img._id === image._id) 
                    ? 'ring-2 ring-blue-500 border-blue-500' 
                    : ''
                }`}
                onClick={() => handleImageSelect(image)}
              >
                <div className="aspect-square bg-gray-100">
                  <img
                    src={image.url || image.secure_url}
                    alt={image.originalName || image.filename}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent text-white text-xs truncate">
                  {image.originalName || image.filename}
                </div>
                {selectionMode && (
                  <div className="absolute top-2 right-2">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedImages.some(img => img._id === image._id)
                        ? 'bg-blue-500 border-blue-500'
                        : 'bg-white border-gray-300'
                    }`}>
                      {selectedImages.some(img => img._id === image._id) && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredImages.map((image) => (
              <div
                key={image._id}
                className={`flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer ${
                  selectedImages.some(img => img._id === image._id) 
                    ? 'bg-blue-50 border-blue-200' 
                    : ''
                }`}
                onClick={() => handleImageSelect(image)}
              >
                <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                  <img
                    src={image.url || image.secure_url}
                    alt={image.originalName || image.filename}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{image.originalName || image.filename}</p>
                  <p className="text-sm text-gray-500">
                    {image.folder} • {new Date(image.createdAt).toLocaleDateString()} • 
                    {(image.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                {selectionMode && (
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedImages.some(img => img._id === image._id)
                      ? 'bg-blue-500 border-blue-500'
                      : 'bg-white border-gray-300'
                  }`}>
                    {selectedImages.some(img => img._id === image._id) && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;