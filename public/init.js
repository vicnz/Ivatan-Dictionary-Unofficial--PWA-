window.onload = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js', {}).then(res => {
            if (res.installing) {
                console.log('Service Worker Is Installing...')
            } else if (res.waiting) {
                console.log('Service Worker is installed')
            } else if (res.active) {
                console.log('Service Worker Is Active')
            }
        }).catch(rej => {
            console.log('Registering Service Worker Failed')
        })
    }
}