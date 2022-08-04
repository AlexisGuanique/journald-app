module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    // Esta configuracion es necesaria para que no haga la transpilacion en la parte de firebase
    transformIgnorePatterns: [],
    // Para modificar el tiempo de espera para una respuesta en una prueba
    setupFilesAfterEnv: ['./jest.setup.js'],
}