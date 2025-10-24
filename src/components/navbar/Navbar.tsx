'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, createContext, useContext } from 'react';
import styles from './navbar.module.css';

// Context para compartir el estado del navbar
const NavbarContext = createContext({ isExpanded: false });

export const useNavbar = () => useContext(NavbarContext);

export const NavbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <NavbarContext.Provider value={{ isExpanded }}>
      <div className={styles.layoutContainer}>
        <NavbarComponent isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <main className={`${styles.mainContent} ${isExpanded ? styles.expanded : ''}`}>
          {children}
        </main>
      </div>
    </NavbarContext.Provider>
  );
};

interface NavbarComponentProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const NavbarComponent: React.FC<NavbarComponentProps> = ({ isExpanded, setIsExpanded }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: 'Inicio',
      path: '/',
      icon: '🏠'
    },
    {
      name: 'Sobre mí',
      path: '/about',
      icon: '👤'
    },
    {
      name: 'Proyectos',
      path: '/projects',
      icon: '💼'
    },
    {
      name: 'Contacto',
      path: '/contact',
      icon: '📧'
    }
  ];

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop Navbar */}
      <nav 
        className={`${styles.navbar} ${isExpanded ? styles.expanded : styles.collapsed}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.navbarContainer}>
          {/* Sección del perfil */}
          <div className={styles.profileSection}>
            <Image
              src="/perfil.jpeg"
              alt="Foto de perfil"
              width={80}
              height={80}
              className={styles.profileImage}
            />
            <h1 className={styles.profileTitle}>Portfolio</h1>
            <p className={styles.profileSubtitle}>Desarrollador Frontend</p>
          </div>

          {/* Lista de navegación */}
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.path} className={styles.navItem}>
                <Link
                  href={item.path}
                  className={`${styles.navLink} ${pathname === item.path ? styles.active : ''}`}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navText}>{item.name}</span>
                  {!isExpanded && (
                    <div className={styles.tooltip}>{item.name}</div>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className={styles.navFooter}>
            <p className={styles.footerText}>© 2025 Portfolio</p>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className={styles.mobileMenuButton}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navbar */}
      <nav className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.navbarContainer}>
          {/* Botón de cerrar */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className={styles.mobileCloseButton}
            aria-label="Cerrar menú"
          >
            ×
          </button>

          {/* Sección del perfil */}
          <div className={styles.profileSection}>
            <Image
              src="/perfil.jpeg"
              alt="Foto de perfil"
              width={60}
              height={60}
              className={styles.profileImage}
            />
            <h1 className={styles.profileTitle}>Portfolio</h1>
            <p className={styles.profileSubtitle}>Desarrollador</p>
          </div>

          {/* Lista de navegación */}
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.path} className={styles.navItem}>
                <Link
                  href={item.path}
                  className={`${styles.navLink} ${pathname === item.path ? styles.active : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navText}>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

// Export por defecto del provider
const Navbar = NavbarProvider;

export default Navbar;