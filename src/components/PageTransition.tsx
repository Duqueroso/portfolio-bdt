'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionState, setTransitionState] = useState<'entering' | 'entered' | 'exiting'>('entered');

  useEffect(() => {
    // Iniciar transición de salida
    setTransitionState('exiting');
    setIsLoading(true);
    
    const timer1 = setTimeout(() => {
      // Cambiar contenido
      setDisplayChildren(children);
      setTransitionState('entering');
    }, 150);
    
    const timer2 = setTimeout(() => {
      // Completar transición de entrada
      setTransitionState('entered');
      setIsLoading(false);
    }, 200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname, children]);

  // Determinar animación según la ruta
  const getAnimationClass = () => {
    switch (pathname) {
      case '/':
        return 'fade-in';
      case '/about':
        return 'slide-in-left';
      case '/projects':
        return 'slide-in-right';
      case '/contact':
        return 'fade-in';
      default:
        return 'fade-in';
    }
  };

  return (
    <>
      {/* Loading overlay */}
      <div className={`page-loading ${isLoading ? 'active' : ''}`}>
        <div className="loading-spinner"></div>
      </div>
      
      {/* Contenido con transición */}
      <div 
        className={`page-transition ${transitionState} ${transitionState === 'entered' ? getAnimationClass() : ''}`}
      >
        {displayChildren}
      </div>
    </>
  );
};

export default PageTransition;