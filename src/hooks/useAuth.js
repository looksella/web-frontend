// Re-export the hook defined in the AuthContext to keep imports consistent
import { useAuth as useAuthFromContext } from '../context/AuthContext';
export default useAuthFromContext;
