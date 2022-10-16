import UserPage from './Components/pages/userPage';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CollectionPosts from './Components/pages/collectionPosts';
import Login from './Components/pages/login';
import AdminPage from './Components/pages/adminPage';
import MainPage from './Components/pages/mainPage';
import UsersCollections from './Components/pages/usersCollections';
import AdminCollections from './Components/pages/adminCollections';

function App() {
  const theme = useSelector(({ theme }) => theme.theme);

  if (theme === 'dark') {
    require('../src/Components/theme/dark.css');
  } else if (theme === 'light') {
    require('../src/Components/theme/light.css');
  }
  return (
    <>
      <Switch>
        <Route path="/admin-panel" component={AdminPage} />
        <Route path="/admin-collections/:Id" component={CollectionPosts} />
        <Route path="/admin-collections" component={AdminCollections} />
        <Route path="/login" component={Login} />

        <Route path="/collection/:Id" component={CollectionPosts} />
        <Route path="/collection" component={UserPage} />
        {/* <Route path="/" component={MainPage} />
         */}
        <Route path="/:Id" component={UsersCollections} />
        <Route path="/" component={MainPage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
