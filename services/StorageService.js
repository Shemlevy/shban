
function store(key, any) {
    var str = JSON.stringify(any);
    // console.log('any', str);
    window.localStorage.setItem(key, str);
}


function load(key) {
    var str = window.localStorage.getItem(key) || 'null';
    if(!str) return null
    console.log('str', str);
    var any = JSON.parse(str)
    console.log('any', any);
    return any;
}

export default {
    store,
    load
}