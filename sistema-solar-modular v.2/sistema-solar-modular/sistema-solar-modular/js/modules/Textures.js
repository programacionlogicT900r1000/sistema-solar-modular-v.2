/**
 * @class Textures
 * @description Genera texturas para objetos del sistema solar
 */
export class Textures {
    /**
     * Crea una textura para un planeta
     * @param {number} color - Color base del planeta
     * @param {number} size - Tamaño del planeta
     * @param {string} patternType - Tipo de patrón (solid, craters, gas, lava, ice)
     * @returns {THREE.CanvasTexture} Textura generada
     */
    static createPlanetTexture(color, size, patternType = 'solid') {
        const canvas = document.createElement('canvas');
        const textureSize = Math.max(128, size * 12);
        canvas.width = textureSize;
        canvas.height = textureSize;
        const ctx = canvas.getContext('2d');
        
        const r = (color >> 16) & 255;
        const g = (color >> 8) & 255;
        const b = color & 255;
        
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(0, 0, textureSize, textureSize);
        
        const blockSize = Math.max(4, Math.floor(textureSize / 16));
        
        if (patternType !== 'solid') {
            const blocksX = textureSize / blockSize;
            const blocksY = textureSize / blockSize;
            
            const noiseMap = [];
            for (let x = 0; x < blocksX; x++) {
                noiseMap[x] = [];
                for (let y = 0; y < blocksY; y++) {
                    noiseMap[x][y] = Math.random();
                }
            }
            
            for (let x = 0; x < blocksX; x++) {
                for (let y = 0; y < blocksY; y++) {
                    const variation = (noiseMap[x][y] * 40) - 20;
                    const blockR = Math.max(0, Math.min(255, r + variation));
                    const blockG = Math.max(0, Math.min(255, g + variation));
                    const blockB = Math.max(0, Math.min(255, b + variation));
                    
                    ctx.fillStyle = `rgb(${blockR}, ${blockG}, ${blockB})`;
                    
                    if (patternType === 'craters') {
                        if (noiseMap[x][y] > 0.7) {
                            const craterSize = blockSize * (0.3 + noiseMap[x][y] * 0.7);
                            ctx.beginPath();
                            ctx.arc(
                                x * blockSize + blockSize/2, 
                                y * blockSize + blockSize/2, 
                                craterSize/2, 
                                0, 
                                Math.PI * 2
                            );
                            ctx.fill();
                            
                            ctx.fillStyle = `rgb(${blockR*0.7}, ${blockG*0.7}, ${blockB*0.7})`;
                            ctx.beginPath();
                            ctx.arc(
                                x * blockSize + blockSize/2 - craterSize/5, 
                                y * blockSize + blockSize/2 - craterSize/5, 
                                craterSize/3, 
                                0, 
                                Math.PI * 2
                            );
                            ctx.fill();
                        }
                    } else if (patternType === 'gas') {
                        if (y % 3 === 0 || noiseMap[x][y] > 0.6) {
                            const height = blockSize * (0.5 + noiseMap[x][y] * 1.5);
                            ctx.fillRect(
                                x * blockSize, 
                                y * blockSize, 
                                blockSize, 
                                height
                            );
                        }
                    } else if (patternType === 'lava') {
                        if (noiseMap[x][y] > 0.3) {
                            const intensity = Math.floor(155 + noiseMap[x][y] * 100);
                            ctx.fillStyle = `rgb(${intensity}, ${intensity*0.6}, ${0})`;
                            ctx.beginPath();
                            ctx.arc(
                                x * blockSize + Math.random() * blockSize, 
                                y * blockSize + Math.random() * blockSize, 
                                blockSize * (0.2 + noiseMap[x][y] * 0.6), 
                                0, 
                                Math.PI * 2
                            );
                            ctx.fill();
                        }
                    } else if (patternType === 'ice') {
                        if (noiseMap[x][y] > 0.5) {
                            ctx.fillStyle = `rgb(${r+40}, ${g+40}, ${b+40})`;
                            ctx.fillRect(
                                x * blockSize, 
                                y * blockSize, 
                                blockSize * 0.8, 
                                blockSize * 0.8
                            );
                        }
                    }
                }
            }
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        return texture;
    }
    
    /**
     * Crea el efecto de brillo para el sol
     * @returns {THREE.Sprite} Sprite con el efecto de brillo
     */
    static createSunGlow() {
        const canvas = document.createElement('canvas');
        const size = 128;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        const gradient = ctx.createRadialGradient(
            size/2, size/2, 0,
            size/2, size/2, size/2
        );
        gradient.addColorStop(0, 'rgba(255, 200, 50, 1)');
        gradient.addColorStop(0.1, 'rgba(255, 150, 0, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 100, 0, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 50, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(40, 40, 1);
        
        return sprite;
    }
}