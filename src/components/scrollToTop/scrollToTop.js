import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function ScrollToTop() {
  // define the path
  const { pathname } = useLocation();
  // use hook to monitor change of path
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
