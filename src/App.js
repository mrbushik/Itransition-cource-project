import UserPage from './Components/pages/userPage';
import { Route, Switch, Redirect } from 'react-router-dom';

import CollectionPosts from './Components/pages/collectionPosts';
import Login from './Components/pages/login';
import AdminPage from './Components/pages/adminPage';
import MainPage from './Components/pages/mainPage';
import UsersCollections from './Components/pages/usersCollections';
import AdminCollections from './Components/pages/adminCollections';

function App() {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/admin-panel" component={AdminPage} />
        <Route path="/admin-collections/:Id" component={CollectionPosts} />
        <Route path="/admin-collections" component={AdminCollections} />
        <Route path="/collection/:Id" component={CollectionPosts} />
        <Route path="/collection" component={UserPage} />
        <Route path="/:Id" component={UsersCollections} />
        <Route path="/" component={MainPage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
