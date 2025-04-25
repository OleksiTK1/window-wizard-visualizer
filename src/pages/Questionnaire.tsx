
import WindowQuestionnaire from "@/components/WindowQuestionnaire";
import { useLocation, Navigate } from 'react-router-dom';

const Questionnaire = () => {
  const location = useLocation();
  const questionnaireType = location.state?.questionnaireType;

  if (!questionnaireType) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <WindowQuestionnaire initialType={questionnaireType} />
    </div>
  );
};

export default Questionnaire;
