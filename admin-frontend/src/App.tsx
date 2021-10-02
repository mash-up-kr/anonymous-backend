import { Suspense, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Header } from './components/Header';
import { GalleryPage } from './pages/Gallery';

function App() {
  const history = useHistory();
  console.log(process.env.REACT_APP_API_HOST);
  useEffect(() => {
    if (history.location.pathname !== '/assets') {
      history.replace('/assets');
    }
  }, [history]);

  return (
    <Suspense fallback={null}>
      <Header />
      <Route path="/assets">
        <GalleryPage />
      </Route>
    </Suspense>
  );
}

export default App;
