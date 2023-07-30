import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

export default function GoBackButton() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <Button variant='outline' onClick={goBack}>
      ← Back
    </Button>
  );
}
