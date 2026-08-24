import React, { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { heroService, HeroContent } from '../services/heroService';
import ImageUpload from '../components/ImageUpload';

export default function AdminHeroSettings() {
  const [heroContent, setHeroContent] = useState<HeroContent>(heroService.getHeroContent());
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (field: keyof HeroContent, value: string) => {
    setHeroContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleButtonChange = (buttonType: 'primaryButton' | 'secondaryButton', field: 'text' | 'link', value: string) => {
    setHeroContent(prev => ({
      ...prev,
      [buttonType]: {
        ...prev[buttonType],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    heroService.updateHeroContent(heroContent);
    setSuccessMessage('Hero section updated successfully!');
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMessage('');
    }, 2000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default hero content?')) {
      const defaultContent = heroService.resetToDefault();
      setHeroContent(defaultContent);
      setSuccessMessage('Reset to default content!');
      setTimeout(() => setSuccessMessage(''), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Hero Section Settings</h1>
          <p className="mt-2 text-gray-600">Customize the main hero section on the homepage</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">{successMessage}</p>
          </div>
        )}

        {/* Form */}
        <div className="bg-card rounded-lg shadow-md p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Main Title
            </label>
            <input
              type="text"
              value={heroContent.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter main title"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Subtitle
            </label>
            <input
              type="text"
              value={heroContent.subtitle}
              onChange={(e) => handleInputChange('subtitle', e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter subtitle"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              value={heroContent.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter description"
            />
          </div>

          {/* Background Image */}
          <ImageUpload
            currentImage={heroContent.backgroundImage}
            onImageChange={(url) => handleInputChange('backgroundImage', url)}
            label="Hero Background Image"
            aspectRatio="21/9"
          />

          {/* Primary Button */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Primary Button</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={heroContent.primaryButton.text}
                  onChange={(e) => handleButtonChange('primaryButton', 'text', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Button text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Button Link
                </label>
                <input
                  type="text"
                  value={heroContent.primaryButton.link}
                  onChange={(e) => handleButtonChange('primaryButton', 'link', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="/destinations"
                />
              </div>
            </div>
          </div>

          {/* Secondary Button */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Secondary Button</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={heroContent.secondaryButton.text}
                  onChange={(e) => handleButtonChange('secondaryButton', 'text', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Button text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Button Link
                </label>
                <input
                  type="text"
                  value={heroContent.secondaryButton.link}
                  onChange={(e) => handleButtonChange('secondaryButton', 'link', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="/trip-planner"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-background transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Reset to Default
            </button>
          </div>

          {/* Last Updated */}
          <div className="text-sm text-gray-500 pt-4 border-t">
            Last updated: {new Date(heroContent.updatedAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

