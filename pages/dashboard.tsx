import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import SocialMediaGenerator from "../Components/SocialMediaLinks";

const DashboardPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect to login page if not logged in
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div>
      <SocialMediaGenerator />
    </div>
  );
};

export default DashboardPage;
