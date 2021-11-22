deepCopyFunction = inObject => {
    let outObject, value, key
    if (typeof inObject !== "object" || inObject === null) {
        return inObject // Return the value if inObject is not an object
    }
    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {}
    for (key in inObject) {
        value = inObject[key]
        if (typeof value !== "function") {
            outObject[key] = deepCopyFunction(value)
        }
    }
    return outObject;
}

Object.prototype.clone = apply => {
    let obj = deepCopyFunction(this, this.clone);
    if (typeof apply === 'function') {
        apply(obj);
    }
    return obj
}

/* Exemplos de como usar a função: */

const validJson = {
    "id": "123456",
    "document": [
        {
            "cpf": "123.456.789-10",
            "rg": "12.345.678"
        },
        {
            "cpf": "999.888.777-66"
        }
    ]
}


// Alterar valor de uma propriedade:
const json1 = validJson.clone(obj => { obj.id = null })
const json2 = validJson.clone(obj => { 
    obj.document[0].cpf = "109.876.543-21"
    obj.document[0].rg = "87.654.321"
})

// Inserir propriedade:
const json3 = validJson.clone(obj => { obj.document[1].rg = "99.888.777" })

// Deletar propriedade:
const json4 = validJson.clone(obj => { delete obj.document[0].rg })

console.log(json1)