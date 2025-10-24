import Image from 'next/image';

const Home = () => {
  return (
    <main>
      <div>
        {/* Contenido principal */}
        <div className='container'>
          <h1>Hola, Soy Brayan Duque, frontend developer.</h1>
          
          <p>
            Bienvenido a mi portfolio digital, un espacio donde la creatividad se encuentra con la funcionalidad. 
            Aquí encontrarás una colección de proyectos que reflejan mi pasión por crear experiencias web 
            excepcionales y soluciones tecnológicas innovadoras.
          </p>
          
          <p>
            Cada línea de código que escribo está pensada para construir puentes entre ideas y realidad, 
            transformando conceptos en interfaces intuitivas que conectan con las personas. 
            Te invito a explorar mi trabajo y descubrir cómo la tecnología puede marcar la diferencia.
          </p>
        </div>
        
        {/* Foto al costado derecho */}
        <div>
          <Image
            src="/perfil.jpeg"
            alt="Brayan Duque - Frontend Developer"
            width={300}
            height={300}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;