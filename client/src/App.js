import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Error, Landing, Register, ProtectedRoute } from './pages/index.js';
import {
  AllJobs,
  AddJob,
  Profile,
  Stats,
  SharedLayout,
} from './pages/dashboard/index.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
          <Route path='stats' element={<Stats />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
