import UserPage from './Components/pages/userPage';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CollectionPosts from './Components/pages/collectionPosts';
import Login from './Components/pages/login';
import AdminPage from './Components/pages/adminPage';
import MainPage from './Components/pages/mainPage';
import UsersCollections from './Components/pages/usersCollections';

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
        {/* заменить path ибо станица коллекции будет зависить от id  */}
        {/* поменять в дальнейшем на реальную главную страницу */}

        <Route path="/admin-panel" component={AdminPage} />
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
