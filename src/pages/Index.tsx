
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, Layout, Camera } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleChoice = (type: 'parameters' | 'photo' | 'both') => {
    navigate('/questionnaire', { state: { questionnaireType: type } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Window Specification Calculator</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" 
                onClick={() => handleChoice('parameters')}>
            <div className="flex flex-col items-center space-y-4">
              <Layout className="w-12 h-12 text-primary" />
              <h2 className="text-xl font-semibold text-center">Parameters Only</h2>
              <p className="text-sm text-center text-gray-600">
                Calculate based on specifications and measurements
              </p>
              <Button className="mt-4">Select</Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleChoice('photo')}>
            <div className="flex flex-col items-center space-y-4">
              <Camera className="w-12 h-12 text-primary" />
              <h2 className="text-xl font-semibold text-center">Photo Only</h2>
              <p className="text-sm text-center text-gray-600">
                Upload a photo for instant estimation
              </p>
              <Button className="mt-4">Select</Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleChoice('both')}>
            <div className="flex flex-col items-center space-y-4">
              <Image className="w-12 h-12 text-primary" />
              <h2 className="text-xl font-semibold text-center">Parameters & Photo</h2>
              <p className="text-sm text-center text-gray-600">
                Complete analysis with both specifications and photo
              </p>
              <Button className="mt-4">Select</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
