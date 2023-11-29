import React from 'react'
import MobileDashboard from './MobileDashboard'
import DesktopDashboard from './DesktopDashboard'
import { useEffect, useState } from 'react';



export default function AppLayout() {
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const setResponsiveness = () => {
    return window.innerWidth < 950
      ? setIsMobile(true)
      : setIsMobile(false);
  };

  setResponsiveness();
  window.addEventListener("resize", () => setResponsiveness()); 
}, []);

return isMobile ? <MobileDashboard /> : <DesktopDashboard />;
}
