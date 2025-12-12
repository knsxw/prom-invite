import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Overlay({ onYes, onNo, yesClicked, showButtons }) {
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);

  const moveNoButton = () => {
    // Random position within a reasonable range
    // Since it's relative transform, we can just jump around
    const x = (Math.random() - 0.5) * 400; // -200 to 200
    const y = (Math.random() - 0.5) * 400; // -200 to 200
    setNoBtnPos({ x, y });
    setHoverCount(prev => prev + 1);
  };

  const getNoText = () => {
    const texts = ["No...", "Are you sure?", "Really?", "Think again!", "Please?", "💔"];
    return texts[Math.min(hoverCount, texts.length - 1)];
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      zIndex: 10
    }}>
      
      {/* Interactable Container */}
      {!yesClicked && showButtons && (
        <div style={{ 
          marginTop: '60vh', 
          display: 'flex', 
          gap: '2rem', 
          pointerEvents: 'auto',
          position: 'relative' // For absolute positioning of children if needed, but transform is better
        }}>
          <motion.button 
            onClick={onYes}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ 
              backgroundColor: '#ff69b4', 
              color: 'white', 
              padding: '1rem 2rem', 
              fontSize: '1.2rem',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 0 15px rgba(255, 105, 180, 0.5)'
            }}
          >
            YES! 💖
          </motion.button>
          
          <motion.button 
            onMouseEnter={moveNoButton}
            onClick={moveNoButton} // Also move on click just in case
            animate={{ x: noBtnPos.x, y: noBtnPos.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ 
              backgroundColor: '#444', 
              color: '#ccc', 
              padding: '1rem 2rem', 
              fontSize: '1rem',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            {getNoText()}
          </motion.button>
        </div>
      )}

      {yesClicked && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ 
            pointerEvents: 'auto',
            background: 'rgba(0,0,0,0.8)',
            padding: '2rem',
            borderRadius: '20px',
            textAlign: 'center',
            border: '2px solid hotpink',
            boxShadow: '0 0 30px hotpink'
          }}
        >
          <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>🎉 YAY!!! 🎉</h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>I can't wait! ❤️</p>
          <p style={{ fontSize: '1rem', color: '#ccc' }}>(Screenshot this and send it to me!)</p>
        </motion.div>
      )}
    </div>
  );
}
