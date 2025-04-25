
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Image, Upload } from "lucide-react";

interface FormData {
  // Physical dimensions
  width: string;
  height: string;
  thickness: string;
  chambers: string;
  // Lighting parameters
  lightTransmittance: string;
  lightReflection: string;
  uvRetention: string;
  solarCoefficient: string;
  // Materials
  glassType: string;
  tintingMethod: string;
  tintColor: string;
  // Application
  purpose: string;
  safetyRequirements: string[];
  // Technical
  profileType: string;
  installationLocation: string;
  climaticRequirements: string;
  // Photo
  photo: File | null;
}

const WindowQuestionnaire = () => {
  const [formData, setFormData] = useState<FormData>({
    width: '',
    height: '',
    thickness: '4',
    chambers: 'one',
    lightTransmittance: '50',
    lightReflection: '',
    uvRetention: '99',
    solarCoefficient: '0.4',
    glassType: 'tempered',
    tintingMethod: 'film',
    tintColor: 'gray',
    purpose: 'facades',
    safetyRequirements: [],
    profileType: 'pvc',
    installationLocation: 'indoor',
    climaticRequirements: '',
    photo: null
  });

  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Window Specifications Questionnaire</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Physical Dimensions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">📏 Physical Dimensions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="width">Width (mm)</Label>
              <Input
                id="width"
                type="number"
                min="600"
                max="3000"
                placeholder="600-3000+ mm"
                value={formData.width}
                onChange={(e) => handleInputChange('width', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (mm)</Label>
              <Input
                id="height"
                type="number"
                min="800"
                max="2400"
                placeholder="800-2400+ mm"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thickness">Glass Thickness</Label>
              <Select value={formData.thickness} onValueChange={(value) => handleInputChange('thickness', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select thickness" />
                </SelectTrigger>
                <SelectContent>
                  {[4, 6, 8, 10, 12].map((mm) => (
                    <SelectItem key={mm} value={mm.toString()}>{mm} mm</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="chambers">Number of Chambers</Label>
              <Select value={formData.chambers} onValueChange={(value) => handleInputChange('chambers', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select chambers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one">One Chamber</SelectItem>
                  <SelectItem value="two">Two Chambers</SelectItem>
                  <SelectItem value="three">Three Chambers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Lighting Parameters */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">🌡 Lighting Parameters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lightTransmittance">Light Transmittance (%)</Label>
              <Input
                id="lightTransmittance"
                type="number"
                min="10"
                max="50"
                value={formData.lightTransmittance}
                onChange={(e) => handleInputChange('lightTransmittance', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lightReflection">Light Reflection (%)</Label>
              <Input
                id="lightReflection"
                type="number"
                min="0"
                max="100"
                value={formData.lightReflection}
                onChange={(e) => handleInputChange('lightReflection', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="uvRetention">UV Retention (%)</Label>
              <Input
                id="uvRetention"
                type="number"
                min="0"
                max="99"
                value={formData.uvRetention}
                onChange={(e) => handleInputChange('uvRetention', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="solarCoefficient">Solar Coefficient (G-value)</Label>
              <Input
                id="solarCoefficient"
                type="number"
                step="0.1"
                min="0.2"
                max="0.6"
                value={formData.solarCoefficient}
                onChange={(e) => handleInputChange('solarCoefficient', e.target.value)}
                required
              />
            </div>
          </div>
        </Card>

        {/* Materials and Tinting */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">🧪 Materials and Types of Tinting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="glassType">Type of Glass</Label>
              <Select value={formData.glassType} onValueChange={(value) => handleInputChange('glassType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select glass type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tempered">Tempered</SelectItem>
                  <SelectItem value="triplex">Triplex</SelectItem>
                  <SelectItem value="multifunctional">Multifunctional</SelectItem>
                  <SelectItem value="energy-saving">Energy-saving</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tintingMethod">Tinting Method</Label>
              <Select value={formData.tintingMethod} onValueChange={(value) => handleInputChange('tintingMethod', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tinting method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="film">Film</SelectItem>
                  <SelectItem value="spraying">Spraying</SelectItem>
                  <SelectItem value="built-in">Built-in tinted glass</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tintColor">Tint Color</Label>
              <Select value={formData.tintColor} onValueChange={(value) => handleInputChange('tintColor', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tint color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bronze">Bronze</SelectItem>
                  <SelectItem value="gray">Gray</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="mirror">Mirror</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Application */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">🏢 Application</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Select value={formData.purpose} onValueChange={(value) => handleInputChange('purpose', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facades">Facades</SelectItem>
                  <SelectItem value="panoramic">Panoramic Windows</SelectItem>
                  <SelectItem value="office">Office Partitions</SelectItem>
                  <SelectItem value="balconies">Balconies</SelectItem>
                  <SelectItem value="roof">Roof Windows</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Safety Requirements</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="impact" 
                    checked={formData.safetyRequirements.includes('impact')}
                    onCheckedChange={(checked) => {
                      const newReqs = checked 
                        ? [...formData.safetyRequirements, 'impact']
                        : formData.safetyRequirements.filter(r => r !== 'impact');
                      handleInputChange('safetyRequirements', newReqs);
                    }}
                  />
                  <Label htmlFor="impact">Impact Resistance</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="fire" 
                    checked={formData.safetyRequirements.includes('fire')}
                    onCheckedChange={(checked) => {
                      const newReqs = checked 
                        ? [...formData.safetyRequirements, 'fire']
                        : formData.safetyRequirements.filter(r => r !== 'fire');
                      handleInputChange('safetyRequirements', newReqs);
                    }}
                  />
                  <Label htmlFor="fire">Fire Resistance</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sound" 
                    checked={formData.safetyRequirements.includes('sound')}
                    onCheckedChange={(checked) => {
                      const newReqs = checked 
                        ? [...formData.safetyRequirements, 'sound']
                        : formData.safetyRequirements.filter(r => r !== 'sound');
                      handleInputChange('safetyRequirements', newReqs);
                    }}
                  />
                  <Label htmlFor="sound">Sound Insulation</Label>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Technical Characteristics */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">🛠 Technical Characteristics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="profileType">Profile Type</Label>
              <Select value={formData.profileType} onValueChange={(value) => handleInputChange('profileType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select profile type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pvc">PVC</SelectItem>
                  <SelectItem value="aluminum">Aluminum</SelectItem>
                  <SelectItem value="wood">Wood</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="installationLocation">Installation Location</Label>
              <Select value={formData.installationLocation} onValueChange={(value) => handleInputChange('installationLocation', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="indoor">Indoor</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="climaticRequirements">Climatic Requirements</Label>
              <Input
                id="climaticRequirements"
                placeholder="Enter specific climatic requirements..."
                value={formData.climaticRequirements}
                onChange={(e) => handleInputChange('climaticRequirements', e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* Photo Upload */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">📸 Photo Upload</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {previewUrl && (
              <div className="mt-4">
                <img src={previewUrl} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
              </div>
            )}
          </div>
        </Card>

        <Button type="submit" className="w-full">Calculate Results</Button>

        {/* Results Section */}
        {showResults && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <div className="space-y-4">
              <div className="text-lg">
                <p>Estimated Price: $2,500 - $3,000</p>
                <p className="text-sm text-gray-500 mt-2">* This is a sample price range</p>
              </div>
              <Separator />
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Sample Product Image</h3>
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                  alt="Sample Window" 
                  className="w-full max-w-md mx-auto rounded-lg"
                />
              </div>
            </div>
          </Card>
        )}
      </form>
    </div>
  );
};

export default WindowQuestionnaire;
