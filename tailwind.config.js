module.exports = {
    mode: 'jit',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            f1_red: "#ff1e00",
        },
        extend: {
            colors: {
                'gray-900': '#111827',
                'gray-700': '#374151',
                'gray-300': '#D1D5DB',
            }
        }
    },
    variants: {
        extend: {
            rotate: ['peer-checked'],
            translate: ['peer-checked'],
            zIndex: ['peer-checked'],
            width: ['peer-checked'],
            backgroundColor: ['peer-checked'],
        },
    },
    plugins: [],
}
