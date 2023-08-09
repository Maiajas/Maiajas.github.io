if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/src/sw.js', { scope: '/' });
}