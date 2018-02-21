import storageService from './StorageService.js'


// var input = 'the big bang'
// function query(input) {
//     return fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${input}`)
//         .then(res => res.json())
//         .then(res => {
//             return res.items;
//         })
// }



function saveToLocal(keyStore , item) {
    var arrs = getFromLocal();
    arrs.push(item)
    storageService.store(keyStore, arrs)
}

function getFromLocal(keyStore) {
    var arrs = storageService.load(keyStore) || []; 
    return arrs;
}

export default {
    // query,
    saveToLocal,
    getFromLocal
}