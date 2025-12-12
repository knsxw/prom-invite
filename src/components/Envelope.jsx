import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const Envelope = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const group = useRef();
  
  // Animation state references
  const flapAngle = useRef(0);
  const cardY = useRef(0);
  const cardScaleRef = useRef(0.9);

  useFrame((state, delta) => {
    // Target values
    const targetFlapAngle = isOpen ? Math.PI * 0.9 : 0;
    const targetCardY = isOpen ? 2.5 : 0;
    const targetCardScale = isOpen ? 1 : 0.9;

    // Larps (Linear Interpolation) with damping
    const speed = 3 * delta;
    
    flapAngle.current = THREE.MathUtils.lerp(flapAngle.current, targetFlapAngle, speed);
    
    // Delay card animation slightly
    if (flapAngle.current > 1) {
        cardY.current = THREE.MathUtils.lerp(cardY.current, targetCardY, speed);
        cardScaleRef.current = THREE.MathUtils.lerp(cardScaleRef.current, targetCardScale, speed);
    }

    // Trigger callback when mostly open
    if (isOpen && onOpen && cardY.current > 2.0) {
        onOpen();
    }
  });

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <group ref={group} onClick={handleOpen}>
      {/* CARD CONTENT */}
      {/* Manually applying animated values via refs is hard in declarative React without spring.
          We can pass a Ref to the group and update it in useFrame, OR use a simple component that consumes the values.
          For simplicity, let's just use refs for the meshes we want to move.
      */}
      <CardContent yRef={cardY} scaleRef={cardScaleRef} />

      {/* ENVELOPE BODY */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[4, 2.5]} />
        <meshStandardMaterial color="#f8f4e3" side={THREE.DoubleSide} />
      </mesh>

      <EnvelopeFront />
      
      {/* FLAP */}
      <Flap angleRef={flapAngle} />

    </group>
  );
};

// Helper component to apply useFrame updates to the Flap
const Flap = ({ angleRef }) => {
    const meshRef = useRef();
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x = angleRef.current;
        }
    });

    return (
        <group position={[0, 1.25, 0.1]}>
            <group ref={meshRef}>
                <FlapShape />
            </group>
        </group>
    );
};

// Helper for Card
const CardContent = ({ yRef, scaleRef }) => {
    const groupRef = useRef();
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.position.y = yRef.current;
            groupRef.current.position.z = 0.05; // Keep Z constant
            groupRef.current.scale.setScalar(scaleRef.current);
        }
    });

    return (
        <group ref={groupRef}>
            <mesh>
                <planeGeometry args={[3.8, 2.3]} />
                <meshStandardMaterial color="#fff" />
            </mesh>
            <Text
                position={[0, 0.5, 0.01]}
                fontSize={0.3}
                color="#d4af37"
                maxWidth={3.5}
                textAlign="center"
                anchorY="middle"
            >
                Will you go to{"\n"}Prom with me?
            </Text>
        </group>
    );
};

const FlapShape = () => {
  const shape = new THREE.Shape();
  shape.moveTo(-2, 0);
  shape.lineTo(2, 0);
  shape.lineTo(0, -1.5);
  shape.lineTo(-2, 0);

  return (
    <mesh position={[0, 0, 0]}>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial color="#e6dfcc" side={THREE.DoubleSide} />
    </mesh>
  );
};

const EnvelopeFront = () => {
    const shapeBottom = new THREE.Shape();
    shapeBottom.moveTo(-2, -1.25);
    shapeBottom.lineTo(2, -1.25);
    shapeBottom.lineTo(0, 0.5); 
    shapeBottom.lineTo(-2, -1.25);

    const shapeLeft = new THREE.Shape();
    shapeLeft.moveTo(-2, -1.25);
    shapeLeft.lineTo(-2, 1.25);
    shapeLeft.lineTo(0, 0);
    shapeLeft.lineTo(-2, -1.25);

    const shapeRight = new THREE.Shape();
    shapeRight.moveTo(2, -1.25);
    shapeRight.lineTo(2, 1.25);
    shapeRight.lineTo(0, 0);
    shapeRight.lineTo(2, -1.25);

    const materialProps = { color: '#f0ebd8', side: THREE.DoubleSide };

    return (
        <group position={[0, 0, 0.01]}>
            <mesh>
                <shapeGeometry args={[shapeBottom]} />
                <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh>
                <shapeGeometry args={[shapeLeft]} />
                <meshStandardMaterial {...materialProps} />
            </mesh>
             <mesh>
                <shapeGeometry args={[shapeRight]} />
                <meshStandardMaterial {...materialProps} />
            </mesh>
        </group>
    )
}

export default Envelope;
