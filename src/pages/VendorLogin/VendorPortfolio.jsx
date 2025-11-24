import React, { useEffect, useState } from "react";
import { Plus, X, Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVendorPortfolio,
  addPortfolioImage,
} from "../../redux/vendorSlice";
import VendorSidebar from "../../components/VendorLogin/VendorSidebar";
import VendorHeader from "../../components/VendorLogin/VendorHeader";

const VendorPortfolio = () => {
  const dispatch = useDispatch();
  const { portfolio, loading } = useSelector((s) => s.vendor);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const portfolioCategories = [
    { id: 1, name: "Wedding", icon: "💒" },
    { id: 2, name: "House warming", icon: "🏠" },
    { id: 3, name: "Birthday", icon: "🎂" },
    { id: 4, name: "Engagement", icon: "💍" },
    { id: 5, name: "Naming Ceremony (Namkaran)", icon: "👶" },
    { id: 6, name: "Baby Shower (Seemantham)", icon: "🎀" },
    { id: 7, name: "Baby Welcoming", icon: "🚼" },
    { id: 8, name: "Upcnayanam (Thread Ceremony)", icon: "🧵" },
    { id: 9, name: "Puberty Ceremony", icon: "🌟" },
  ];

  useEffect(() => {
    dispatch(getVendorPortfolio());
  }, [dispatch]);

  const handleAddImages = async (categoryName) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.multiple = true;

    fileInput.onchange = async (e) => {
      const files = Array.from(e.target.files);
      if (files.length === 0) return;

      setUploading(true);
      try {
        for (let file of files) {
          await dispatch(addPortfolioImage({ 
            file, 
            sectionName: categoryName 
          })).unwrap();
        }
        // Refresh portfolio after all uploads
        await dispatch(getVendorPortfolio()).unwrap();
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setUploading(false);
      }
    };
    fileInput.click();
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const sectionData = portfolio?.sections || [];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <VendorSidebar />

      <div className="flex-1 ml-64 overflow-auto">
        <VendorHeader />

        {/* Portfolio */}
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              MY PORTFOLIO
            </h2>
            {uploading && (
              <div className="flex items-center gap-2 text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm">Uploading...</span>
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {portfolioCategories.map((category) => {
                const section = sectionData.find((s) => s.name === category.name) || {};
                const sectionImages = section.images || [];

                return (
                  <div
                    key={category.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group"
                  >
                    {/* Category Header */}
                    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                          {category.name}
                        </h3>
                      </div>
                    </div>

                    {/* Images Grid - Takes full space */}
                    <div className="p-4">
                      {sectionImages.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3">
                          {sectionImages.slice(0, 4).map((img, i) => (
                            <div
                              key={i}
                              className="aspect-square relative group/image cursor-pointer"
                              onClick={() => openImageModal(img)}
                            >
                              <img
                                src={img}
                                alt={`Portfolio ${i + 1}`}
                                className="w-full h-full object-cover rounded-lg transition-transform group-hover/image:scale-105"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/image:bg-opacity-20 transition-all rounded-lg" />
                            </div>
                          ))}
                          
                          {/* Show count if more than 4 images */}
                          {sectionImages.length > 4 && (
                            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-gray-600 font-medium text-sm">
                                +{sectionImages.length - 4} more
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Empty State - Takes full space */
                        <div className="aspect-video bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center group-hover:border-purple-300 transition-colors">
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-gray-500 text-sm text-center px-4">
                            No images yet
                          </p>
                          <p className="text-gray-400 text-xs mt-1">
                            Click upload to add photos
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Upload Button */}
                    <div className="p-4 border-t border-gray-100 bg-gray-50">
                      <button
                        onClick={() => handleAddImages(category.name)}
                        disabled={uploading}
                        className="w-full bg-white border-2 border-purple-600 text-purple-600 font-semibold py-2.5 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Upload Images</span>
                      </button>
                      
                      {/* Image Count */}
                      {sectionImages.length > 0 && (
                        <p className="text-xs text-gray-500 text-center mt-2">
                          {sectionImages.length} image{sectionImages.length !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Portfolio Preview"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorPortfolio;