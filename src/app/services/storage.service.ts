export default {
    loadFromStorage,
    saveToStorage

}

function saveToStorage(key:string, val:any) {
    localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key:string) {
    var val:any = localStorage.getItem(key);
    return JSON.parse(val);
}