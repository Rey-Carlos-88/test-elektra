import Characters from '../components/Characters/character';
import Episodes from '../components/Episodes/episodes';
import Locations from '../components/Locations/locations';

const routes = [
    {
        path: '/characters/pages/',
        Component: Characters,
        title: 'Characters'
    },
    {
        path: '/locations',
        Component: Locations,
        title: 'Locations',
    },
    {
        path: '/episodes',
        Component: Episodes,
        title: 'Episodes',
    },
]

export default routes;