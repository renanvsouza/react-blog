import './Dashboard.css';
import { useAuthValue } from '../../context/AuthContext';

function Dashboard() {
  const { user } = useAuthValue();
  const uid = user.uid;

  return (
    <h1>Dashboard</h1>
  );
}

export default Dashboard;