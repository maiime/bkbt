function setupApp(arg) {
    function App(params) {
        
    }
    App.prototype.$ = function (className) {
        return document.getElementsByClassName(className)[0];
    }
}