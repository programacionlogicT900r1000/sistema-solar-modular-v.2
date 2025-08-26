import { PlanetData } from './modules/PlanetData.js';
import { Router } from './modules/Router.js';
import { LoadingScreen } from './modules/LoadingScreen.js';
import { Textures } from './modules/Textures.js';
import { Objects } from './modules/Objects.js';
import { SolarSystem } from './modules/SolarSystem.js';
import { Animation } from './modules/Animation.js';
import { Utils } from './modules/Utils.js';

// Inicializar pantalla de carga
const loadingScreen = new LoadingScreen();
loadingScreen.init();

// Configuración de Three.js
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000022);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.set(0, 50, 150);

const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    powerPreference: "high-performance"
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Controles
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.5;
controls.minDistance = 20;
controls.maxDistance = 500;

// Sistema Solar
const solarSystem = new SolarSystem();
solarSystem.init(scene);

// Iluminación
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const sunLight = new THREE.PointLight(0xffffff, 1.8, 1500);
sunLight.position.set(0, 0, 0);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 1024;
sunLight.shadow.mapSize.height = 1024;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 250;
scene.add(sunLight);

// Campo de estrellas
scene.add(Objects.createStarfield(1500));

// Animación
const animation = new Animation(solarSystem);

// Router
const router = new Router(solarSystem, camera, controls);

// Eventos
window.addEventListener("resize", Utils.onWindowResize(camera, renderer));

// Iniciar animación
setTimeout(() => {
    const animate = () => {
        requestAnimationFrame(animate);
        router.update();
        animation.animate(scene, camera, renderer, controls);
    };
    animate();
}, 100);