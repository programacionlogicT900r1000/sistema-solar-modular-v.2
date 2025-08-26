export class Console {
    constructor() {
        this.consoleElement = document.getElementById('console');
        this.minimizeBtn = document.getElementById('minimize-btn');
        this.outputElement = document.getElementById('console-output');
        this.inputElement = document.getElementById('console-input');
        
        this.isMinimized = false;
        this.commandHistory = [];
        this.historyIndex = -1;
        
        this.setupEvents();
    }
    
    setupEvents() {
        // Minimizar/restaurar consola
        this.minimizeBtn.addEventListener('click', () => this.toggleMinimize());
        
        // Manejar comandos
        this.inputElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.processCommand(this.inputElement.value.trim());
                this.inputElement.value = '';
                this.historyIndex = -1;
            }
            // Navegación por historial
            else if (e.key === 'ArrowUp') {
                if (this.commandHistory.length > 0) {
                    if (this.historyIndex === -1) {
                        this.historyIndex = this.commandHistory.length - 1;
                    } else if (this.historyIndex > 0) {
                        this.historyIndex--;
                    }
                    this.inputElement.value = this.commandHistory[this.historyIndex] || '';
                }
                e.preventDefault();
            }
            else if (e.key === 'ArrowDown') {
                if (this.commandHistory.length > 0 && this.historyIndex >= 0) {
                    if (this.historyIndex < this.commandHistory.length - 1) {
                        this.historyIndex++;
                        this.inputElement.value = this.commandHistory[this.historyIndex];
                    } else {
                        this.historyIndex = -1;
                        this.inputElement.value = '';
                    }
                }
                e.preventDefault();
            }
        });
    }
    
    toggleMinimize() {
        this.isMinimized = !this.isMinimized;
        this.consoleElement.classList.toggle('minimized', this.isMinimized);
        this.minimizeBtn.textContent = this.isMinimized ? "+" : "_";
    }
    
    processCommand(command) {
        if (!command) return;
        
        // Agregar al historial
        this.commandHistory.push(command);
        if (this.commandHistory.length > 50) {
            this.commandHistory.shift();
        }
        
        // Mostrar comando en la consola
        this.addOutput(`> ${command}`);
        
        // Procesar comando
        const cmd = command.toLowerCase();
        
        if (cmd === 'help' || cmd === 'ayuda') {
            this.showHelp();
        }
        else if (cmd === 'clear' || cmd === 'limpiar') {
            this.outputElement.innerHTML = '';
        }
        else if (cmd === 'system' || cmd === 'sistema') {
            this.addOutput("Sistema Solar v2.3.5");
            this.addOutput("Módulos cargados: PlanetData, Router, LoadingScreen, Textures, Objects, SolarSystem, Animation, Utils");
        }
        else if (cmd === 'credits' || cmd === 'creditos') {
            this.addOutput("Desarrollado por Pino Lighuen");
            this.addOutput("Contacto: programacionconciente@ejemplo.com");
        }
        else if (cmd.startsWith('navigate ') || cmd.startsWith('navegar ')) {
            const planet = cmd.split(' ')[1];
            this.navigateToPlanet(planet);
        }
        else {
            this.addOutput(`Comando no reconocido: "${command}"`);
            this.addOutput('Escribe "help" para ver los comandos disponibles');
        }
    }
    
    showHelp() {
        this.addOutput("Comandos disponibles:");
        this.addOutput("- help/ayuda: Muestra esta ayuda");
        this.addOutput("- clear/limpiar: Limpia la consola");
        this.addOutput("- system/sistema: Muestra información del sistema");
        this.addOutput("- credits/creditos: Muestra los créditos");
        this.addOutput("- navigate/navegar [planeta]: Navega a un planeta (ej: navigate earth)");
        this.addOutput("Planetas disponibles: sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune");
    }
    
    addOutput(text) {
        const outputLine = document.createElement('div');
        outputLine.textContent = text;
        this.outputElement.appendChild(outputLine);
        this.outputElement.scrollTop = this.outputElement.scrollHeight;
    }
    
    navigateToPlanet(planetId) {
        const validPlanets = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
        
        if (validPlanets.includes(planetId)) {
            this.addOutput(`Navegando a ${planetId}...`);
            // Disparar evento para cambiar de planeta
            const event = new CustomEvent('console-navigate', { detail: planetId });
            document.dispatchEvent(event);
        } else {
            this.addOutput(`Planeta no válido: "${planetId}"`);
            this.addOutput('Planetas disponibles: sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune');
        }
    }
}