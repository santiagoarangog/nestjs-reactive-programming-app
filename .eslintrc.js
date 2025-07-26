module.exports = {
    parser: '@typescript-eslint/parser', // Especifica el parser para TypeScript
    parserOptions: {
        project: 'tsconfig.json', // Ruta al archivo de configuración de TypeScript
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint/eslint-plugin', // Plugin de ESLint para TypeScript
        'prettier', // Integra Prettier como una regla de ESLint
    ],
    extends: [
        'plugin:@typescript-eslint/recommended', // Reglas recomendadas de TypeScript ESLint
        'plugin:prettier/recommended', // Desactiva reglas de ESLint que puedan entrar en conflicto con Prettier
    ],
    root: true, // Indica que este es el archivo de configuración raíz para ESLint
    env: {
        node: true, // Habilita variables y alcance globales de Node.js
        jest: true, // Habilita variables y alcance globales de Jest
    },
    ignorePatterns: ['.eslintrc.js'], // Archivos que ESLint debe ignorar
    rules: {
        // Aquí puedes personalizar reglas. Por defecto, las siguientes son comunes en proyectos NestJS.
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'prettier/prettier': 'error', // Reporta las diferencias de formato de Prettier como errores de ESLint
    },
};