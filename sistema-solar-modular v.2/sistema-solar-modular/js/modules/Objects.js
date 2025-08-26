import { Textures } from './Textures.js';

/**
 * @class Objects
 * @description Crea objetos 3D para el sistema solar
 */
export class Objects {
    /**
     * Crea el campo de estrellas de fondo
     * @param {number} count - Número de estrellas
     * @returns {THREE.Points} Sistema de partículas para las estrellas
     */
    static createStarfield(count) {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        
        for (let i = 0; i < count; i++) {
            const radius = 1200;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);
            
            const colorType = Math.random();
            if (colorType < 0.7) {
                colors[i * 3] = 1;
                colors[i * 3 + 1] = 1;
                colors[i * 3 + 2] = 1;
            } else if (colorType < 0.85) {
                colors[i * 3] = 0.5;
                colors[i * 3 + 1] = 0.7;
                colors[i * 3 + 2] = 1;
            } else {
                colors[i * 3] = 1;
                colors[i * 3 + 1] = 0.5;
                colors[i * 3 + 2] = 0.5;
            }
            
            sizes[i] = Math.random() * 1.5 + 0.5;
        }
        
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const material = new THREE.PointsMaterial({
            size: 1,
            sizeAttenuation: true,
            vertexColors: true,
            transparent: true,
            opacity: 0.9
        });
        
        return new THREE.Points(geometry, material);
    }
    
    /**
     * Crea un planeta
     * @param {Object} data - Datos del planeta
     * @returns {Object} Objeto con malla y propiedades del planeta
     */
    static createPlanet(data) {
        const segments = Math.min(48, 24 + Math.floor(data.size));
        const geometry = new THREE.SphereGeometry(data.size, segments, segments);
        
        let material;
        if (data.emissive) {
            material = new THREE.MeshBasicMaterial({
                map: Textures.createPlanetTexture(data.color, data.size, data.texturePattern),
                emissive: 0xffaa00,
                emissiveIntensity: 1.0
            });
        } else {
            material = new THREE.MeshStandardMaterial({
                map: Textures.createPlanetTexture(data.color, data.size, data.texturePattern),
                roughness: 0.85,
                metalness: 0.15
            });
        }
        
        const planet = new THREE.Mesh(geometry, material);
        
        if (!data.emissive) {
            planet.castShadow = true;
            planet.receiveShadow = true;
        }
        
        if (data.distance > 0) {
            planet.position.x = data.distance;
        }
        
        const planetObj = {
            mesh: planet,
            distance: data.distance,
            speed: data.speed,
            angle: Math.random() * Math.PI * 2,
            name: data.name
        };
        
        if (data.emissive) {
            const sunGlow = Objects.createSunGlow();
            planet.add(sunGlow);
        }
        
        return planetObj;
    }
    
    /**
     * Crea el efecto de brillo para el sol
     * @returns {THREE.Sprite} Sprite con efecto de brillo
     */
    static createSunGlow() {
        return Textures.createSunGlow();
    }
    
    /**
     * Crea partículas para los anillos de Saturno
     * @param {number} innerRadius - Radio interno del anillo
     * @param {number} outerRadius - Radio externo del anillo
     * @param {number} count - Número de partículas
     * @returns {THREE.Points} Sistema de partículas para el anillo
     */
    static createRingParticles(innerRadius, outerRadius, count) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const colors = new Float32Array(count * 3);
        
        for (let i = 0; i < count; i++) {
            const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
            const angle = Math.random() * Math.PI * 2;
            const heightVariation = (Math.random() - 0.5) * 0.5;
            
            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = heightVariation;
            positions[i * 3 + 2] = Math.sin(angle) * radius;
            
            sizes[i] = 0.1 + Math.random() * 0.3;
            
            const brightness = 0.7 + 0.3 * (radius - innerRadius) / (outerRadius - innerRadius);
            colors[i * 3] = 0.9 * brightness;
            colors[i * 3 + 1] = 0.85 * brightness;
            colors[i * 3 + 2] = 0.7 * brightness;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 1,
            sizeAttenuation: false,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        const particleSystem = new THREE.Points(geometry, material);
        particleSystem.rotation.x = Math.PI / 3;
        return particleSystem;
    }
}