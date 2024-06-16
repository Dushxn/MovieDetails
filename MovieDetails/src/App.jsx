import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Homepage from './Pages/Homepage';
import Info from './Pages/components/Info';
import TvInfo from './Pages/components/TvInfo';
import Movies from './Pages/Movies';
import TvShows from './Pages/TvShows';
import Email from './Pages/components/Email';
import Search from './Pages/components/Search';
import { AllMovies, } from './Pages/components/AllMovies';
import Upcoming from './Pages/components/Upcoming';
import Popular from './Pages/components/Popular';
import TopRated from './Pages/components/TopRated';
import AirToday from './Pages/components/AirToday';
import OnAir from './Pages/components/OnAir';
import PopularShow from './Pages/components/PopularShow';
import TopRatedShow from './Pages/components/TopRatedShow.jsx';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/info/:id' element={<Info />} />
          <Route path='/tvinfo/:id' element={<TvInfo />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/tvshows' element={<TvShows />} />
          <Route path='/email' element={<Email />} />
          <Route path='/search/:search' element={<Search />} />
          <Route path='/allmovies' element={<AllMovies />} />
          <Route path='/upcoming' element={<Upcoming />} />
          <Route path='/popular' element={<Popular />} />
          <Route path='/toprated' element={<TopRated />} />
          <Route path='/airtoday' element={<AirToday />} />
          <Route path='/onair' element={<OnAir />} />
          <Route path='/popularshow' element={<PopularShow />} />
          <Route path='/topratedshow' element={<TopRatedShow />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
