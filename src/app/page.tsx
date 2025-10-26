import Image from 'next/image';
import styles from './page.module.css';

const Home = () => {
  return (
    <main>
      <div className={styles.homeContainer}>
        {/* Contenido principal */}
        <div className={styles.contentSection}>
          <h1 className={styles.mainTitle}>
            Hola, Soy Brayan Duque, frontend developer.
          </h1>
          
          <p className={styles.paragraph}>
            Bienvenido a mi portfolio digital, un espacio donde la creatividad se encuentra con la funcionalidad. 
            Aquí encontrarás una colección de proyectos que reflejan mi pasión por crear experiencias web 
            excepcionales y soluciones tecnológicas innovadoras.
          </p>
          
          <p className={styles.paragraph}>
            Cada línea de código que escribo está pensada para construir puentes entre ideas y realidad, 
            transformando conceptos en interfaces intuitivas que conectan con las personas. 
            Te invito a explorar mi trabajo y descubrir cómo la tecnología puede marcar la diferencia.
          </p>
        </div>
        
        {/* Foto al costado derecho */}
        <div className={styles.imageSection}>
          <div className={styles.profileImageContainer}>
            <Image
              src="/perfil.jpeg"
              alt="Brayan Duque - Frontend Developer"
              width={300}
              height={300}
              className={styles.profileImage}
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;