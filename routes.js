
import HomePage from './pages/HomePage.js'
import NotesMgmt from './KeeperMgmt/pages/NotesMgmt.js'
import NoteDetailsPage from './KeeperMgmt/pages/NoteDetailsPage.js'
import EmailsMgmt from './EmailsMgmt/pages/EmailMgmtPage.js'
import PlacesMgmt from './PlacesMgmt/pages/PlacesMgmt.js'

const routes = [
    {
        path: '/',
        component: HomePage
    },   
        {
        path: '/notes',
        component: NotesMgmt
    },
    {
        path: '/notes/:noteId',
        component: NoteDetailsPage
    },
    {
        path: '/emails/:emailCatagory',
        component: EmailsMgmt
    },
    {
        path: '/emails/:emailCatagory/:emailId',
        component: EmailsMgmt
    },
    {
        path: '/maps',
        component: PlacesMgmt
    },
];

export default routes;