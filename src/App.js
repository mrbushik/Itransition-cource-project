import NavBar from './Components/navigation/navBar';
import UserPage from './Components/pages/userPage';
import { Route, Switch, Redirect } from 'react-router-dom';
import CollectionPage from './Components/pages/collectionPage';
import Login from './Components/pages/login';
import AdminPage from './Components/pages/adminPage';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        {/* заменить path ибо станица коллекции будет зависить от id  */}
        {/* поменять в дальнейшем на реальную главную страницу */}

        <Route path="/admin-panel" component={AdminPage} />
        <Route path="/login" component={Login} />
        <Route path="/:Id" component={CollectionPage} />
        <Route path="/" component={UserPage} />

        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
