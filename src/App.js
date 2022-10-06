import NavBar from './Components/navigation/navBar';
import UserPage from './Components/pages/userPage';
import { Route, Switch, Redirect } from 'react-router-dom';
import CollectionPosts from './Components/pages/collectionPosts';
import Login from './Components/pages/login';
import AdminPage from './Components/pages/adminPage';
import MainPage from './Components/pages/mainPage';

function App() {
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
        <Route path="/" component={MainPage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
