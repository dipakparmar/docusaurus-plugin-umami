const clientModule = {
    onRouteUpdate({ location, previousLocation }) {
        if (previousLocation && location.pathname !== previousLocation.pathname) {
            window.umami.trackView(location.pathname);
        }
    },
};

export default clientModule;