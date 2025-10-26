import styles from './page.module.css';

export default function About() {
  const skills = [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 
    'Python', 'MongoDB', 'Soporte Técnico', 'Redes'
  ];

  return (
    <main>
      <div className={styles.aboutContainer}>
        <h1 className={styles.mainTitle}>
          Sobre mí
        </h1>
        
        <div className={styles.contentGrid}>
          <p className={`${styles.paragraph} ${styles.highlight}`}>
            Soy Brayan Duque (Duqueroso), técnico en sistemas con más de 8 años de experiencia en soporte técnico 
            y 1 año como desarrollador web frontend, con conocimientos básicos en backend.
          </p>

          <p className={styles.paragraph}>
            Me apasiona crear soluciones tecnológicas que mejoren la experiencia del usuario, optimicen procesos 
            y respondan a las necesidades de cada proyecto. Cada desafío es una oportunidad para innovar y crear 
            algo único.
          </p>

          <div className={`${styles.paragraph} ${styles.tech}`}>
            <p style={{ marginBottom: '1rem' }}>
              Tengo experiencia en redes, mantenimiento de equipos, ofimática, atención al usuario y desarrollo web. 
              Mis principales tecnologías incluyen:
            </p>
            <div className={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <span key={index} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <p className={`${styles.paragraph} ${styles.goal}`}>
            Mi objetivo es seguir creciendo en el campo del desarrollo web, contribuyendo a proyectos donde la 
            tecnología marque la diferencia y donde pueda aportar mi experiencia tanto técnica como en atención 
            al usuario para crear soluciones integrales.
          </p>
        </div>
      </div>
    </main>
  );
}