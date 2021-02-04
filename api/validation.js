// codigos para validações antes das requisiçoes

module.exports = app => {
    // valida um valor se existe ou não
    function existsOrError(value, msg){
        if(!value) throw msg
        // se array, e for vazio
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }
    
    function notExistsOrError(value, msg){
        try {
            // se existir o erro, chama a funcao para relatar o erro
            existsOrError(value, msg)
        } catch(msg){
            // se nao der o erro , retorne apenas
            return
        }
        throw msg
    }
    // se valore iguais
    function equalsOrError(valueA, valueB, msg){
        if(valueA !== valueB) throw msg
    }
    // consign carregara as funções
    return { existsOrError,notExistsOrError,equalsOrError }
}