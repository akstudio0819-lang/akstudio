import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroScene3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // ─── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000510, 1);
    renderer.shadowMap.enabled = false;
    mount.appendChild(renderer.domElement);

    // ─── Scene & Camera ────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000d1a, 0.018);

    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 300);
    camera.position.set(0, 0, 35);

    // ─── UNDERWATER GRADIENT BACKGROUND (canvas texture) ──────────────────
    const bgCanvas = document.createElement('canvas');
    bgCanvas.width = 512; bgCanvas.height = 512;
    const bgCtx = bgCanvas.getContext('2d')!;
    const bgGrad = bgCtx.createRadialGradient(380, 120, 10, 320, 200, 380);
    bgGrad.addColorStop(0, '#1a7aaa');
    bgGrad.addColorStop(0.3, '#0a4060');
    bgGrad.addColorStop(0.6, '#021830');
    bgGrad.addColorStop(1, '#000510');
    bgCtx.fillStyle = bgGrad;
    bgCtx.fillRect(0, 0, 512, 512);
    const bgTex = new THREE.CanvasTexture(bgCanvas);
    const bgMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(120, 70),
      new THREE.MeshBasicMaterial({ map: bgTex, depthWrite: false })
    );
    bgMesh.position.z = -50;
    scene.add(bgMesh);

    // ─── GOD-RAYS (light shaft) ────────────────────────────────────────────
    const shaftGroup = new THREE.Group();
    scene.add(shaftGroup);

    const makeShaft = (
      x: number, y: number, z: number,
      rx: number, rz: number,
      topR: number, botR: number, len: number,
      color: number, opacity: number
    ) => {
      const geo = new THREE.CylinderGeometry(topR, botR, len, 8, 1, true);
      const mat = new THREE.MeshBasicMaterial({
        color, transparent: true, opacity,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.rotation.x = rx;
      m.rotation.z = rz;
      shaftGroup.add(m);
      return m;
    };

    // Main bright shaft
    const shaft1 = makeShaft(20, 15, -8, -0.1, -0.35, 0.5, 12, 45, 0x88ddff, 0.18);
    const shaft2 = makeShaft(22, 12, -10, -0.1, -0.30, 0.3, 9, 38, 0xaaeeff, 0.10);
    const shaft3 = makeShaft(18, 14, -6, -0.05, -0.40, 0.2, 7, 35, 0xffffff, 0.07);

    // ─── UNDERWATER CUBE STRUCTURE ─────────────────────────────────────────
    const cubeGroup = new THREE.Group();
    cubeGroup.position.set(18, 10, -5);
    scene.add(cubeGroup);

    // Outer wireframe cube
    const cubeGeo = new THREE.BoxGeometry(12, 12, 12);
    const cubeEdges = new THREE.EdgesGeometry(cubeGeo);
    const cubeLine = new THREE.LineSegments(
      cubeEdges,
      new THREE.LineBasicMaterial({
        color: 0x88eeff, transparent: true, opacity: 0.5,
        blending: THREE.AdditiveBlending,
      })
    );
    cubeGroup.add(cubeLine);

    // Inner glowing face panels (translucent blue)
    const faceGeo = new THREE.PlaneGeometry(12, 12);
    const faceMat = new THREE.MeshBasicMaterial({
      color: 0x2288bb, transparent: true, opacity: 0.06,
      side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const faces = [
      { pos: [0, 0, 6],  rot: [0, 0, 0] },
      { pos: [0, 0, -6], rot: [0, Math.PI, 0] },
      { pos: [6, 0, 0],  rot: [0, Math.PI / 2, 0] },
      { pos: [-6, 0, 0], rot: [0, -Math.PI / 2, 0] },
      { pos: [0, 6, 0],  rot: [-Math.PI / 2, 0, 0] },
      { pos: [0, -6, 0], rot: [Math.PI / 2, 0, 0] },
    ];
    faces.forEach(({ pos, rot }) => {
      const f = new THREE.Mesh(faceGeo, faceMat.clone());
      f.position.set(...pos as [number, number, number]);
      f.rotation.set(...rot as [number, number, number]);
      cubeGroup.add(f);
    });

    // Light glow at top of cube (simulates sunlight entering)
    const topGlowGeo = new THREE.CircleGeometry(4, 32);
    const topGlowMat = new THREE.MeshBasicMaterial({
      color: 0xffffff, transparent: true, opacity: 0.18,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const topGlow = new THREE.Mesh(topGlowGeo, topGlowMat);
    topGlow.position.y = 6;
    topGlow.rotation.x = -Math.PI / 2;
    cubeGroup.add(topGlow);

    // ─── FISH SYSTEM ──────────────────────────────────────────────────────
    interface Fish {
      mesh: THREE.Group;
      vel: THREE.Vector3;
      phase: number;
      speed: number;
      turnSpeed: number;
      bounds: number;
    }

    const fishCount = 35;
    const fishes: Fish[] = [];

    // Create a simple fish shape using cone + sphere
    const makeFish = (color: number, size: number): THREE.Group => {
      const group = new THREE.Group();

      // Body (sphere, flattened)
      const bodyGeo = new THREE.SphereGeometry(size, 8, 5);
      bodyGeo.scale(1.8, 0.7, 0.7);
      const bodyMat = new THREE.MeshBasicMaterial({ color });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      group.add(body);

      // Tail (cone)
      const tailGeo = new THREE.ConeGeometry(size * 0.9, size * 1.4, 4);
      const tailMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color).multiplyScalar(0.8),
      });
      const tail = new THREE.Mesh(tailGeo, tailMat);
      tail.position.x = -size * 1.6;
      tail.rotation.z = Math.PI / 2;
      group.add(tail);

      // Top fin
      const finGeo = new THREE.ConeGeometry(size * 0.4, size * 0.8, 3);
      const finMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color).multiplyScalar(1.1),
        transparent: true, opacity: 0.8,
      });
      const fin = new THREE.Mesh(finGeo, finMat);
      fin.position.set(0.2, size * 0.8, 0);
      group.add(fin);

      return group;
    };

    // Orange/golden fish colors like reference
    const fishColors = [
      0xff6600, 0xff8800, 0xffaa00, 0xff4400,
      0xee7700, 0xff9933, 0xffbb44, 0xcc5500,
    ];

    for (let i = 0; i < fishCount; i++) {
      const color = fishColors[Math.floor(Math.random() * fishColors.length)];
      const size = 0.3 + Math.random() * 0.4;
      const fishGroup = makeFish(color, size);

      // Position fish mostly in the right half of screen
      fishGroup.position.set(
        8 + Math.random() * 28,
        -8 + Math.random() * 22,
        -15 + Math.random() * 20
      );
      fishGroup.rotation.y = Math.random() * Math.PI * 2;

      scene.add(fishGroup);

      fishes.push({
        mesh: fishGroup,
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.06,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.03
        ),
        phase: Math.random() * Math.PI * 2,
        speed: 0.04 + Math.random() * 0.06,
        turnSpeed: 0.01 + Math.random() * 0.02,
        bounds: 15 + Math.random() * 5,
      });
    }

    // ─── BUBBLE PARTICLES ──────────────────────────────────────────────────
    const bubbleCount = 150;
    const bubblePositions = new Float32Array(bubbleCount * 3);
    const bubbleSpeeds = new Float32Array(bubbleCount);

    for (let i = 0; i < bubbleCount; i++) {
      bubblePositions[i * 3]     = 10 + Math.random() * 20;
      bubblePositions[i * 3 + 1] = -20 + Math.random() * 40;
      bubblePositions[i * 3 + 2] = -15 + Math.random() * 15;
      bubbleSpeeds[i] = 0.03 + Math.random() * 0.06;
    }

    const bubbleGeo = new THREE.BufferGeometry();
    bubbleGeo.setAttribute('position', new THREE.BufferAttribute(bubblePositions, 3));
    const bubbleMat = new THREE.PointsMaterial({
      color: 0xaaddff, size: 0.15, transparent: true, opacity: 0.4,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    });
    const bubbles = new THREE.Points(bubbleGeo, bubbleMat);
    scene.add(bubbles);

    // ─── CAUSTIC LIGHT PATTERNS ────────────────────────────────────────────
    const causticCount = 80;
    const causticPos = new Float32Array(causticCount * 3);
    for (let i = 0; i < causticCount; i++) {
      causticPos[i * 3]     = 5 + Math.random() * 30;
      causticPos[i * 3 + 1] = -10 + Math.random() * 25;
      causticPos[i * 3 + 2] = -20 + Math.random() * 10;
    }
    const causticGeo = new THREE.BufferGeometry();
    causticGeo.setAttribute('position', new THREE.BufferAttribute(causticPos, 3));
    const causticMat = new THREE.PointsMaterial({
      color: 0x88ddff, size: 0.5, transparent: true, opacity: 0.15,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    });
    const caustics = new THREE.Points(causticGeo, causticMat);
    scene.add(caustics);

    // ─── AMBIENT GLOW ORBS ─────────────────────────────────────────────────
    const glowPositions = [
      { p: [22, 8, -3], c: 0x44aaff, s: 2.5 },
      { p: [16, -2, -8], c: 0x2288cc, s: 3.0 },
      { p: [28, 3, -12], c: 0x66bbff, s: 1.5 },
    ];
    const glows: THREE.Mesh[] = [];
    glowPositions.forEach(({ p, c, s }) => {
      const g = new THREE.Mesh(
        new THREE.SphereGeometry(s, 12, 12),
        new THREE.MeshBasicMaterial({
          color: c, transparent: true, opacity: 0.08,
          blending: THREE.AdditiveBlending, depthWrite: false,
        })
      );
      g.position.set(...p as [number, number, number]);
      scene.add(g);
      glows.push(g);
    });

    // ─── RESIZE ────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ─── ANIMATION LOOP ────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let rafId: number;
    const bubPos = bubbleGeo.attributes.position as THREE.BufferAttribute;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Pulse god-rays
      const pulse = 0.85 + Math.sin(t * 0.5) * 0.15;
      (shaft1.material as THREE.MeshBasicMaterial).opacity = 0.18 * pulse;
      (shaft2.material as THREE.MeshBasicMaterial).opacity = 0.10 * pulse;
      (shaft3.material as THREE.MeshBasicMaterial).opacity = 0.07 * pulse;
      (topGlow.material as THREE.MeshBasicMaterial).opacity = 0.18 * (0.8 + Math.sin(t * 0.8) * 0.2);

      // Slowly rotate cube
      cubeGroup.rotation.y = Math.sin(t * 0.08) * 0.08;
      cubeGroup.rotation.x = Math.sin(t * 0.06) * 0.05;

      // Animate fish
      fishes.forEach((fish, i) => {
        const { mesh, vel, phase, speed } = fish;

        // Tail wag — rotate entire group slightly
        mesh.rotation.z = Math.sin(t * 3 + phase) * 0.12;

        // Bobbing motion
        mesh.position.y += Math.sin(t * 1.2 + phase) * 0.004;

        // Move forward
        const dir = new THREE.Vector3(
          Math.cos(mesh.rotation.y),
          0,
          Math.sin(mesh.rotation.y)
        );
        mesh.position.addScaledVector(dir, speed * 0.5);
        mesh.position.addScaledVector(vel, 0.5);

        // Soft boundary — turn back toward center
        if (mesh.position.x > 40) { vel.x -= 0.003; mesh.rotation.y += 0.05; }
        if (mesh.position.x < 5)  { vel.x += 0.003; mesh.rotation.y -= 0.05; }
        if (mesh.position.y > 18) { vel.y -= 0.003; }
        if (mesh.position.y < -12){ vel.y += 0.003; }
        if (mesh.position.z > 8)  { vel.z -= 0.003; }
        if (mesh.position.z < -18){ vel.z += 0.003; }

        // Drift fish in looping oval paths
        mesh.rotation.y += Math.sin(t * 0.3 + i) * 0.003;
      });

      // Rise bubbles
      for (let i = 0; i < bubbleCount; i++) {
        bubPos.array[i * 3 + 1] += bubbleSpeeds[i];
        if (bubPos.array[i * 3 + 1] > 20) {
          bubPos.array[i * 3 + 1] = -20;
          bubPos.array[i * 3]     = 10 + Math.random() * 20;
        }
      }
      bubPos.needsUpdate = true;

      // Twinkle caustics
      causticMat.opacity = 0.1 + Math.sin(t * 2.5) * 0.05;

      // Pulse glows
      glows.forEach((g, i) => {
        (g.material as THREE.MeshBasicMaterial).opacity = 0.06 + Math.sin(t * 0.8 + i) * 0.04;
      });

      // Gentle camera bob
      camera.position.y = Math.sin(t * 0.25) * 0.3;
      camera.position.x = Math.sin(t * 0.18) * 0.2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
    />
  );
};
