import { PlanetData } from './PlanetData.js';

/**
 * @class Router
 * @description Maneja la navegación entre diferentes vistas del sistema solar
 */
export class Router {
    /**
     * Constructor del Router
     * @param {SolarSystem} solarSystem - Instancia del sistema solar
     * @param {THREE.PerspectiveCamera} camera - Cámara de Three.js
     * @param {OrbitControls} controls - Controles de órbita
     */
    constructor(solarSystem, camera, controls) {
        this.solarSystem = solarSystem;
        this.camera = camera;
        this.controls = controls;
        this.currentPlanet = null;
        this.transition = null;
        this.initialCameraPosition = new THREE.Vector3(0, 50, 150);
        this.initialControlsTarget = new THREE.Vector3(0, 0, 0);
        this.relativeOffset = null;
        
        // Configurar eventos de botones
        this.setupRouteButtons();

        // Habilitar controles en todo momento
        this.controls.enabled = true;
    }

    /**
     * Configura los event listeners para los botones de ruta
     */
    setupRouteButtons() {
        const buttons = document.querySelectorAll('.route-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Evitar que el evento se propague
                e.stopPropagation();

                // Actualizar estado activo de los botones
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Navegar a la ruta seleccionada
                this.navigateTo(btn.dataset.route);
            });
        });
        
        // Configurar botón para cerrar información de planeta
        document.querySelector('.close-info').addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('planet-info').classList.remove('active');
        });
    }

    /**
     * Navega a una ruta específica
     * @param {string} routeId - ID de la ruta (solar-system, sun, mercury, etc.)
     */
    navigateTo(routeId) {
        if (routeId === 'solar-system') {
            this.focusOnSolarSystem();
            document.getElementById('planet-info').classList.remove('active');
            return;
        }
        
        const planetData = PlanetData.getPlanetById(routeId);
        if (!planetData) return;
        
        this.focusOnPlanet(planetData);
        this.showPlanetInfo(planetData);
    }

    /**
     * Enfoca la vista en el sistema solar completo
     */
    focusOnSolarSystem() {
        this.transition = {
            startTime: Date.now(),
            duration: 2000,
            startCameraPosition: this.camera.position.clone(),
            startControlsTarget: this.controls.target.clone(),
            endControlsTarget: this.initialControlsTarget,
            endCameraPosition: this.initialCameraPosition
        };
        
        this.currentPlanet = null;
        this.relativeOffset = null;

        // Habilitar controles
        this.controls.enabled = true;
    }

    /**
     * Enfoca la vista en un planeta específico
     * @param {Object} planetData - Datos del planeta
     */
    focusOnPlanet(planetData) {
        const planet = this.solarSystem.planets.find(p => p.name === planetData.name);
        if (!planet) return;
        
        const planetPosition = planet.mesh.position.clone();
        const distance = planetData.size * 5 + 20;
        
        // Posición objetivo de la cámara (detrás y arriba del planeta)
        const targetPosition = planetPosition.clone();
        targetPosition.y += distance * 0.5;
        targetPosition.z += distance;
        
        // Calcular offset relativo para seguimiento continuo
        this.relativeOffset = new THREE.Vector3().subVectors(
            targetPosition,
            planetPosition
        );
        
        this.transition = {
            startTime: Date.now(),
            duration: 2000,
            startCameraPosition: this.camera.position.clone(),
            startControlsTarget: this.controls.target.clone(),
            endControlsTarget: planetPosition,
            endCameraPosition: targetPosition
        };
        
        this.currentPlanet = planet;

        // Habilitar controles incluso al enfocar un planeta
        this.controls.enabled = true;
    }

    /**
     * Muestra la información del planeta
     * @param {Object} planetData - Datos del planeta
     */
    showPlanetInfo(planetData) {
        document.getElementById('planet-name').textContent = planetData.name;
        document.getElementById('planet-description').textContent = planetData.description;
        document.getElementById('planet-size').textContent = `${planetData.size} unidades`;
        document.getElementById('planet-distance').textContent = `${planetData.distance} unidades`;
        document.getElementById('planet-speed').textContent = `${planetData.speed} rad/frame`;
        document.getElementById('planet-type').textContent = planetData.type;
        
        const infoPanel = document.getElementById('planet-info');
        infoPanel.classList.add('active');
    }

    /**
     * Actualiza la transición de la cámara y el seguimiento continuo
     */
    update() {
        // Seguimiento continuo del planeta seleccionado
        if (this.currentPlanet && !this.transition) {
            const planetPosition = this.currentPlanet.mesh.position.clone();
            const targetPosition = planetPosition.clone().add(this.relativeOffset);
            
            // Interpolación suave para seguimiento continuo
            const lerpFactor = 0.05; // Factor de suavizado (ajustable)
            
            // Interpolación de posición de cámara
            this.camera.position.lerp(targetPosition, lerpFactor);
            
            // Interpolación del objetivo de los controles
            const currentTarget = this.controls.target.clone();
            const newTarget = new THREE.Vector3().lerpVectors(
                currentTarget,
                planetPosition,
                lerpFactor
            );
            this.controls.target.copy(newTarget);
            return;
        }
        
        if (!this.transition) return;
        
        const now = Date.now();
        const elapsed = now - this.transition.startTime;
        const t = Math.min(1, elapsed / this.transition.duration);
        
        // Interpolación de la posición de la cámara
        this.camera.position.lerpVectors(
            this.transition.startCameraPosition,
            this.transition.endCameraPosition,
            t
        );
        
        // Interpolación del objetivo de los controles
        const newTarget = new THREE.Vector3().lerpVectors(
            this.transition.startControlsTarget,
            this.transition.endControlsTarget,
            t
        );
        this.controls.target.copy(newTarget);
        
        // Finalizar transición cuando se completa
        if (t === 1) {
            this.transition = null;
        }
    }
}
