// components/ImageManagement/ImageComponent.jsx
import React, { useState, useRef } from 'react';
import { X, Upload, Trash2, Edit, Eye, Check, XCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { uploadImage, deleteImage } from '../../redux/imageSlice';

const ImageComponent = ({
  folder = 'general',
  onImageSelect,
  multiple = false,
  existingImageUrl = null,
  onImageChange = null,
  onRemove = null,
  aspectRatio = '16/9',
  maxSizeMB = 5,
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
}) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(existingImageUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    await processFiles(Array.from(files));
    event.target.value = ''; // Reset input
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      allowedTypes.includes(file.type)
    );
    
    if (files.length > 0) {
      await processFiles(files);
    }
  };

  const processFiles = async (files) => {
    setError(null);
    
    // Check file size
    const oversizedFiles = files.filter(file => file.size > maxSizeMB * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setError(`Some files exceed ${maxSizeMB}MB limit`);
      return;
    }

    // Check file types
    const invalidFiles = files.filter(file => !allowedTypes.includes(file.type));
    if (invalidFiles.length > 0) {
      setError('Only image files (JPEG, PNG, WebP, GIF) are allowed');
      return;
    }

    setUploading(true);
    
    try {
      for (const file of files) {
        // Create preview URL
        const objectUrl = URL.createObjectURL(file);
        
        // Upload to server
        const result = await dispatch(uploadImage({ file, folder })).unwrap();
        
        if (result.success) {
          const imageUrl = result.data.url || result.data.secure_url;
          
          if (!multiple) {
            setPreviewUrl(imageUrl);
            if (onImageSelect) onImageSelect(imageUrl);
            if (onImageChange) onImageChange(imageUrl);
          } else {
            if (onImageSelect) onImageSelect(imageUrl);
          }
        }
        
        // Clean up object URL
        URL.revokeObjectURL(objectUrl);
      }
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (onRemove) {
      onRemove();
    } else if (existingImageUrl) {
      // Extract image ID from URL or implement your own logic
      const imageId = extractImageId(existingImageUrl);
      if (imageId) {
        try {
          await dispatch(deleteImage(imageId)).unwrap();
          setPreviewUrl(null);
          if (onImageChange) onImageChange(null);
        } catch (err) {
          setError(err.message || 'Delete failed');
        }
      }
    }
  };

  const extractImageId = (url) => {
    // Implement your logic to extract image ID from URL
    // This depends on your storage solution
    return url.split('/').pop().split('.')[0];
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300'} rounded-lg p-6 text-center transition-colors`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={allowedTypes.join(',')}
          multiple={multiple}
          className="hidden"
        />

        {previewUrl && !multiple ? (
          <div className="relative">
            <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-contain"
                style={{ aspectRatio }}
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleBrowseClick}
                  className="p-2 bg-white rounded-full shadow hover:shadow-md transition-shadow"
                  title="Change image"
                >
                  <Edit size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-2 bg-white rounded-full shadow hover:shadow-md transition-shadow"
                  title="Remove image"
                >
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Click buttons above to change or remove image
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Upload size={24} className="text-gray-400" />
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleBrowseClick}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mb-2"
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Browse Files'}
                </button>
                <p className="text-sm text-gray-500">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                Supports: {allowedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ')} • Max {maxSizeMB}MB
              </p>
            </div>
          </>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <XCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {uploading && (
        <div className="text-blue-600 text-sm">
          Uploading image...
        </div>
      )}
    </div>
  );
};

export default ImageComponent;