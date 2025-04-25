
import { useLocation, Navigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";

interface FormData {
  width: string;
  height: string;
  thickness: string;
  chambers: string;
  lightTransmittance: string;
  lightReflection: string;
  uvRetention: string;
  solarCoefficient: string;
  glassType: string;
  tintingMethod: string;
  tintColor: string;
  purpose: string;
  safetyRequirements: string[];
  profileType: string;
  installationLocation: string;
  climaticRequirements: string;
  photo: File | null;
  hasPhoto: boolean;
}

const Results = () => {
  const location = useLocation();
  const formData = location.state?.formData as FormData;

  if (!formData) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Results</h1>
        
        <Card className="p-6 space-y-6">
          <div className="text-lg">
            <p className="font-semibold">Estimated Price Range:</p>
            <p className="text-2xl text-primary mt-2">$2,500 - $3,000</p>
            <p className="text-sm text-gray-500 mt-2">* This is a sample price range</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Specifications Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Dimensions:</p>
                <p>Width: {formData.width}mm</p>
                <p>Height: {formData.height}mm</p>
                <p>Thickness: {formData.thickness}mm</p>
              </div>
              <div>
                <p className="font-medium">Glass Properties:</p>
                <p>Type: {formData.glassType}</p>
                <p>UV Retention: {formData.uvRetention}%</p>
                <p>Light Transmittance: {formData.lightTransmittance}%</p>
              </div>
            </div>
          </div>

          {formData.hasPhoto && formData.photo && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Uploaded Photo</h2>
              <img 
                src={URL.createObjectURL(formData.photo)} 
                alt="Uploaded window" 
                className="max-w-full rounded-lg shadow-md"
              />
            </div>
          )}

          {!formData.hasPhoto && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Sample Product Image</h2>
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                alt="Sample Window" 
                className="max-w-full rounded-lg shadow-md"
              />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Results;
