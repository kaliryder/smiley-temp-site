import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeSpinningImage = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = width / 2; // Adjust height here as needed to change the canvas size
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);
    const currentRef = mountRef.current;

    const clock = new THREE.Clock();

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/img/spinningcoin.png');
    texture.flipY = true;

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide,
      color: 0xffffff
    });

    const geometry = new THREE.CylinderGeometry(2.5, 2.5, 0.1, 64);
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.rotation.x = Math.PI / 2;
    cylinder.rotation.y = Math.PI / 2;
    scene.add(cylinder);

    camera.position.z = 7;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;
    controls.enableRotate = true;

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const hue = (elapsedTime * 0.1) % 1;
      const color = new THREE.Color();
      color.setHSL(hue, 0.5, 0.5);
      material.color = color;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const onWindowResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = newWidth / 2; // Keep the same aspect ratio when resizing
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', onWindowResize, false);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (currentRef) {
        currentRef.removeChild(renderer.domElement);
      }
      scene.remove(cylinder);
      geometry.dispose();
      material.dispose();
      controls.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%' }}></div>;
};

export default ThreeSpinningImage;

