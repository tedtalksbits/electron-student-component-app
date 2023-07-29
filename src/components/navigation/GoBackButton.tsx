import { useNavigate } from 'react-router-dom';

export default function GoBackButton() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return <button onClick={goBack}>← Back</button>;
}
