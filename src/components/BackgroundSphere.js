// src/components/BackgroundSphere.js
import React, { useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

export function BackgroundSphere() {
  const texture = useLoader(THREE.TextureLoader, require("../img/backgroundimg.png"));
  const meshRef = useRef();

  return (
    <mesh ref={meshRef} scale={[50, 50, 50]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}
