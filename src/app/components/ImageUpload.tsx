import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { Button } from './ui/button';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  label?: string;
  aspectRatio?: string;
}

export default function ImageUpload({ 
  currentImage, 
  onImageChange, 
  label = "Upload Image",
  aspectRatio = "16/9"
}: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage || '');
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
  const [urlInput, setUrlInput] = useState(currentImage || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreviewUrl(base64String);
      onImageChange(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      alert('Please enter a valid URL');
      return;
    }
    setPreviewUrl(urlInput);
    onImageChange(urlInput);
  };

  const handleRemove = () => {
    setPreviewUrl('');
    setUrlInput('');
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        <ImageIcon className="inline-block w-4 h-4 mr-2" />
        {label}
      </label>

      {/* Upload Mode Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setUploadMode('url')}
          className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
            uploadMode === 'url'
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <LinkIcon className="inline-block w-4 h-4 mr-2" />
          URL
        </button>
        <button
          type="button"
          onClick={() => setUploadMode('file')}
          className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
            uploadMode === 'file'
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Upload className="inline-block w-4 h-4 mr-2" />
          Upload File
        </button>
      </div>

      {/* URL Input Mode */}
      {uploadMode === 'url' && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Button type="button" onClick={handleUrlSubmit}>
            Load
          </Button>
        </div>
      )}

      {/* File Upload Mode */}
      {uploadMode === 'file' && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Click to upload image</span>
            <span className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP (max 5MB)</span>
          </label>
        </div>
      )}

      {/* Image Preview */}
      {previewUrl && (
        <div className="relative">
          <div 
            className="relative overflow-hidden rounded-lg border border-gray-200"
            style={{ aspectRatio }}
          >
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
              }}
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
