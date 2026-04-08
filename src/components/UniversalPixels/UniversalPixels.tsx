import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fireUniversalPixels } from "../../utils/pixels";

const UniversalPixels: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Fire on initial load and every route change
    if (typeof window !== "undefined" && document?.body) {
      fireUniversalPixels();
    }
  }, [location.pathname]);

  return null;
};

export default UniversalPixels;

