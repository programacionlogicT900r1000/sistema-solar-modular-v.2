/**
 * @class Animation
 * @description Controla las animaciones del sistema solar
 */
export class Animation {
    /**
     * Constructor de Animation
     * @param {SolarSystem} solarSystem - Instancia del sistema solar
     */
    constructor(solarSystem) {
        this.solarSystem = solarSystem;
        this.lastCometTime = 0;
        this.lastShootingStarTime = 0;
        this.lastSolarFlareTime = 0;
    }
    
    /**
     * Bucle principal de animación
     * @param {THREE.Scene} scene - Escena de Three.js
     * @param {THREE.PerspectiveCamera} camera - Cámara de Three.js
     * @param {THREE.WebGLRenderer} renderer - Renderizador de Three.js
     * @param {OrbitControls} controls - Controles de órbita
     */
    animate(scene, camera, renderer, controls) {
        // Rotar el sol
        this.solarSystem.planets[0].mesh.rotation.y += this.solarSystem.planets[0].speed * 0.5;
        
        // Mover planetas
        for (let i = 1; i < this.solarSystem.planets.length; i++) {
            const planet = this.solarSystem.planets[i];
            planet.angle += planet.speed * 0.5;
            planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
            planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
            planet.mesh.rotation.y += 0.003;
        }
        
        // Rotar anillos de Saturno
        if (this.solarSystem.saturnRingParticles) {
            this.solarSystem.saturnRingParticles.rotation.y += 0.002;
        }
        
        controls.update();
        renderer.render(scene, camera);
    }
}