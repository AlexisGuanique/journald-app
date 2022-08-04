
// SOLUCIONAR EL PROBLEMA DE LAS VARIABLES DE ENTORNO
export const getEnvironments = () => {
    // eslint-disable-next-line no-unused-expressions
    import.meta.env;

    return {
        
        ...import.meta.env
    }

}