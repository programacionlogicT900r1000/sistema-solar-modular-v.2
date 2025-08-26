/**
 * @class PlanetData
 * @description Almacena datos de planetas y configuración de rutas
 */
export class PlanetData {
    static planets = [
        { 
            id: "sun",
            name: "Sol", 
            size: 12, 
            distance: 0, 
            speed: 0.001, 
            color: 0xffaa00, 
            texturePattern: 'lava',
            emissive: true,
            type: "Estrella",
            description: "El Sol es la estrella central de nuestro sistema solar. Es una esfera casi perfecta de plasma caliente, calentada hasta la incandescencia por reacciones de fusión nuclear en su núcleo."
        },
        { 
            id: "mercury",
            name: "Mercurio", 
            size: 2.8, 
            distance: 30, 
            speed: 0.008, 
            color: 0x8a8a8a, 
            texturePattern: 'craters',
            type: "Planeta Terrestre",
            description: "Mercurio es el planeta más pequeño y cercano al Sol. Su superficie está cubierta de cráteres, similar a nuestra Luna, debido a la ausencia de atmósfera significativa."
        },
        { 
            id: "venus",
            name: "Venus", 
            size: 4.0, 
            distance: 45, 
            speed: 0.006, 
            color: 0xe39e1c, 
            texturePattern: 'craters',
            type: "Planeta Terrestre",
            description: "Venus es el segundo planeta desde el Sol y el más caliente del sistema solar. Tiene una densa atmósfera de dióxido de carbono que crea un efecto invernadero descontrolado."
        },
        { 
            id: "earth",
            name: "Tierra", 
            size: 4.2, 
            distance: 60, 
            speed: 0.004, 
            color: 0x6b93d6, 
            texturePattern: 'craters',
            type: "Planeta Terrestre",
            description: "La Tierra es nuestro hogar y el único planeta conocido que alberga vida. Tiene una superficie compuesta aproximadamente por 70% de agua y una atmósfera rica en nitrógeno y oxígeno."
        },
        { 
            id: "mars",
            name: "Marte", 
            size: 3.5, 
            distance: 75, 
            speed: 0.003, 
            color: 0xc1440e, 
            texturePattern: 'craters',
            type: "Planeta Terrestre",
            description: "Marte, conocido como el Planeta Rojo, tiene una superficie polvorienta y fría. Presenta características superficiales como volcanes gigantes y profundos cañones."
        },
        { 
            id: "jupiter",
            name: "Júpiter", 
            size: 8.0, 
            distance: 95, 
            speed: 0.0015, 
            color: 0xc9a688, 
            texturePattern: 'gas',
            type: "Gigante Gaseoso",
            description: "Júpiter es el planeta más grande de nuestro sistema solar. Es un gigante gaseoso cuya atmósfera está compuesta principalmente de hidrógeno y helio."
        },
        { 
            id: "saturn",
            name: "Saturno", 
            size: 7.0, 
            distance: 120, 
            speed: 0.001, 
            color: 0xe3d9b6, 
            texturePattern: 'gas',
            type: "Gigante Gaseoso",
            description: "Saturno es famoso por sus impresionantes anillos, compuestos principalmente de partículas de hielo y roca. Es el sexto planeta desde el Sol y el segundo más grande."
        },
        { 
            id: "uranus",
            name: "Urano", 
            size: 6.0, 
            distance: 145, 
            speed: 0.0008, 
            color: 0x7ec4cf, 
            texturePattern: 'ice',
            type: "Gigante de Hielo",
            description: "Urano es un planeta único que gira de lado. Está clasificado como un gigante de hielo y tiene una atmósfera compuesta principalmente de hidrógeno, helio y metano."
        },
        { 
            id: "neptune",
            name: "Neptuno", 
            size: 5.8, 
            distance: 170, 
            speed: 0.0006, 
            color: 0x3b66d9, 
            texturePattern: 'ice',
            type: "Gigante de Hielo",
            description: "Neptuno es el planeta más alejado del Sol. Es un mundo frío y oscuro azotado por los vientos más fuertes del sistema solar, que pueden alcanzar los 2.100 km/h."
        }
    ];

    /**
     * Obtiene los datos de un planeta por su ID
     * @param {string} planetId - ID del planeta
     * @returns {Object} Datos del planeta
     */
    static getPlanetById(planetId) {
        return this.planets.find(planet => planet.id === planetId);
    }

    /**
     * Obtiene todos los planetas
     * @returns {Array} Lista de planetas
     */
    static getAllPlanets() {
        return this.planets;
    }
}