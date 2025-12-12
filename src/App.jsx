import { Canvas } from '@react-three/fiber';
import { useState, Suspense } from 'react';
import confetti from 'canvas-confetti';
import Experience from './components/Experience';
import Overlay from './components/Overlay';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [yesClicked, setYesClicked] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  const handleYes = () => {
    setYesClicked(true);
    // Big confetti explosion
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    var random = function(min, max) {
      return Math.random() * (max - min) + min;
    };

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  const handleNo = () => {
    // Basic "No" handler for now, maybe make the button run away later?
    alert("Nice try, but you can't say no! 😉");
  };

  return (
    <ErrorBoundary>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffc0cb" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#aaa" />
        
        <Suspense fallback={<mesh><boxGeometry /><meshBasicMaterial color="hotpink" /></mesh>}>
            <Experience onEnvelopeOpen={() => setEnvelopeOpened(true)} />
        </Suspense>
      </Canvas>
      <Overlay 
        onYes={handleYes} 
        onNo={handleNo} 
        yesClicked={yesClicked} 
        showButtons={envelopeOpened}
      />
    </ErrorBoundary>
  );
}

export default App;
