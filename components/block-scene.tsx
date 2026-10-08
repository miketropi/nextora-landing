"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

/**
 * Faithful port of the abstract block sculpture from nextora-landing.html:
 * four cobalt cubes on one shared BoxGeometry, the same camera, the same lights,
 * a slow 28s full turn that pauses while offscreen or while the tab is hidden.
 *
 * The surrounding composition stays complete and labelled without WebGL — if the
 * renderer cannot be created the host is simply left empty.
 */
export function BlockScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let dispose: (() => void) | undefined;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        32,
        host.clientWidth / host.clientHeight,
        0.1,
        100,
      );
      camera.position.set(3, 2.3, 5);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(host.clientWidth, host.clientHeight);
      host.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-hidden", "true");

      const group = new THREE.Group();
      scene.add(group);

      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0.18, 0.27, 0.44),
        roughness: 0.55,
        metalness: 0.2,
      });
      const geometry = new THREE.BoxGeometry(0.72, 0.72, 0.72);
      const positions: [number, number, number][] = [
        [0, 0, 0],
        [0.8, 0, 0],
        [0, 0.8, 0],
        [0, 0, 0.8],
      ];
      positions.forEach((position) => {
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(...position);
        group.add(cube);
      });
      group.position.set(-0.35, -0.4, -0.35);

      scene.add(new THREE.HemisphereLight(0xffffff, 0x555555, 2));
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(2, 4, 3);
      scene.add(light);

      const render = () => renderer.render(scene, camera);
      render();

      let tween: gsap.core.Tween | undefined;
      const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
      const setMotion = () => {
        tween?.kill();
        tween = undefined;
        if (motion.matches) {
          tween = gsap.to(group.rotation, {
            y: Math.PI * 2,
            duration: 28,
            repeat: -1,
            ease: "none",
            onUpdate: render,
          });
        } else {
          render();
        }
      };
      setMotion();
      motion.addEventListener("change", setMotion);

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !document.hidden) tween?.resume();
        else tween?.pause();
      });
      observer.observe(host);

      const onVisibilityChange = () => {
        if (document.hidden) tween?.pause();
        else if (host.getBoundingClientRect().bottom > 0) tween?.resume();
      };
      document.addEventListener("visibilitychange", onVisibilityChange);

      const resize = new ResizeObserver(() => {
        camera.aspect = host.clientWidth / host.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(host.clientWidth, host.clientHeight);
        render();
      });
      resize.observe(host);

      let disposed = false;
      dispose = () => {
        if (disposed) return;
        disposed = true;
        tween?.kill();
        tween = undefined;
        resize.disconnect();
        observer.disconnect();
        motion.removeEventListener("change", setMotion);
        document.removeEventListener("visibilitychange", onVisibilityChange);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };

      window.addEventListener(
        "pagehide",
        () => {
          dispose?.();
        },
        { once: true },
      );
    } catch {
      /* The labelled composition remains complete without WebGL. */
    }

    return () => dispose?.();
  }, []);

  return <div id="block-scene" ref={hostRef} />;
}
