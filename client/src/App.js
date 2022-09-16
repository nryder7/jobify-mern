import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Error,
  Landing,
  Register,
  ProtectedRoute,
  RegisterFormik,
} from './pages/index.js';
import {
  AllJobs,
  AddJob,
  Profile,
  Stats,
  SharedLayout,
  Calendar,
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
          <Route path='calendar' element={<Calendar />} />
        </Route>
        <Route path='/register' element={<RegisterFormik />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
