/**
 * @class LoadingScreen
 * @description Maneja la pantalla de carga y progreso
 */
export class LoadingScreen {
    constructor() {
        this.progress = 0;
        this.progressInterval = null;
    }
    
    /**
     * Inicializa la pantalla de carga
     */
    init() {
        this.progressInterval = setInterval(() => {
            this.progress += 2 + Math.random() * 3;
            if (this.progress >= 100) {
                this.progress = 100;
                clearInterval(this.progressInterval);
                setTimeout(() => {
                    document.getElementById('loading').style.opacity = '0';
                    setTimeout(() => {
                        document.getElementById('loading').style.display = 'none';
                    }, 1000);
                }, 500);
            }
            document.getElementById('progress').style.width = this.progress + '%';
        }, 50);
    }
}