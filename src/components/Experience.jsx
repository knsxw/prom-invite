import { OrbitControls, Environment, Float, Stars, Sparkles } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Envelope from './Envelope';

const Heart = (props) => {
  const shape = new THREE.Shape();
  const x = 0, y = 0;
  
  shape.moveTo(x + 5, y + 5);
  shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  shape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  shape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
  shape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  shape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
  shape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

  return (
    <Float speed={props.speed} rotationIntensity={props.rotationIntensity} floatIntensity={props.floatIntensity}>
      <mesh {...props} scale={0.05} rotation={[0, 0, Math.PI]}>
        <extrudeGeometry args={[shape, { depth: 2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 }]} />
        <meshStandardMaterial color="#ff69b4" roughness={0.2} metalness={0.5} />
      </mesh>
    </Float>
  );
};

export default function Experience({ onEnvelopeOpen }) {
  return (
    <>
      {/* Lights moved to App.jsx */}

      {/* Background Atmosphere */}
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={10} size={2} speed={0.4} opacity={0.5} color="#fff" />
      {/* <Environment preset="city" /> */}

      {/* Main Envelope */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Envelope onOpen={onEnvelopeOpen} />
      </Float>

      {/* Floating Hearts Decoration */}
      <Heart position={[-3, 2, -2]} speed={2} rotationIntensity={2} floatIntensity={1} />
      <Heart position={[3, -1, -1]} speed={3} rotationIntensity={1} floatIntensity={2} />
      <Heart position={[-2, -3, 0]} speed={1.5} rotationIntensity={1.5} floatIntensity={1} />
      <Heart position={[4, 3, -3]} speed={2.5} rotationIntensity={0.5} floatIntensity={1.5} />
      
      <OrbitControls makeDefault enableZoom={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
    </>
  );
}
