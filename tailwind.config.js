export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                byakko: {
                    red: '#D32F2F', // Rojo Karate/Japon
                    black: '#1a1a1a', // Negro Zen
                    gray: '#f5f5f5', // Blanco humo
                    gold: '#C5A059'  // Detalles dorados
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                zen: ['Noto Serif JP', 'serif']
            }
        },
    },
    plugins: [],
}
