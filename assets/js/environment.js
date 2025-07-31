export const environment = {
    production: !(location.hostname === '127.0.0.1' || location.hostname === 'localhost'),
    local: {
        credits: "../data/credits.json"
    },
    prod: {
        credits: "<YOUR-ONLINE-PATH>/data/credits.json"
    }
}