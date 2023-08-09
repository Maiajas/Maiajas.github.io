if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { scope: '/' });
}
function toggleVisibility(id) { 
    if(document.getElementById(id).style.display == 'none'){
        document.getElementById(id).style.display = 'block';
    }else if(document.getElementById(id).style.display == 'block'){
        document.getElementById(id).style.display = 'none'; 
    }
} 