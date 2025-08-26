import { PlanetData } from './PlanetData.js';
import { Objects } from './Objects.js';

/**
 * @class SolarSystem
 * @description Configura y gestiona el sistema solar
 */
export class SolarSystem {
    constructor() {
        this.planets = [];
        this.comets = [];
        this.shootingStars = [];
        this.solarFlares = [];
        this.saturnRingParticles = null;
    }
    
    /**
     * Inicializa el sistema solar
     * @param {THREE.Scene} scene - Escena de Three.js
     */
    init(scene) {
        // Crear planetas a partir de datos
        PlanetData.getAllPlanets().forEach((data, index) => {
            const planet = Objects.createPlanet(data);
            scene.add(planet.mesh);
            this.planets.push(planet);
            
            // Crear órbitas para planetas (excepto el sol)
            if (index > 0) {
                const orbitGeometry = new THREE.BufferGeometry();
                const orbitPoints = [];
                const orbitSegments = 72;
                
                for (let i = 0; i <= orbitSegments; i++) {
                    const theta = (i / orbitSegments) * Math.PI * 2;
                    orbitPoints.push(
                        Math.cos(theta) * data.distance,
                        0,
                        Math.sin(theta) * data.distance
                    );
                }
                
                orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(orbitPoints, 3));
                const orbitMaterial = new THREE.LineBasicMaterial({ 
                    color: new THREE.Color(data.color).multiplyScalar(0.4),
                    transparent: true,
                    opacity: 0.1
                });
                
                const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
                scene.add(orbit);
            }
        });
        
        // Añadir anillos a Saturno
        this.saturnRingParticles = Objects.createRingParticles(9, 14, 1500);
        this.planets[6].mesh.add(this.saturnRingParticles);
    }
}