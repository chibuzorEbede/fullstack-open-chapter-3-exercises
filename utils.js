const generateId = ()=>{
    const id  = Math.ceil(Math.random() * 1000000)
    return String(id)
}


module.exports = {generateId}