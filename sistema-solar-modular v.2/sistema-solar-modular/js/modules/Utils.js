/**
 * @class Utils
 * @description Proporciona utilidades varias
 */
export class Utils {
    /**
     * Maneja el redimensionamiento de la ventana
     * @param {THREE.PerspectiveCamera} camera - Cámara de Three.js
     * @param {THREE.WebGLRenderer} renderer - Renderizador de Three.js
     * @returns {Function} Función para manejar el redimensionamiento
     */
    static onWindowResize(camera, renderer) {
        return function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
    }
}