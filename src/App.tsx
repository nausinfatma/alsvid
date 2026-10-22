import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Bpo from './pages/Bpo';
import ServicePage from './pages/ServicePage';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import ProfessionalServices from './pages/ProfessionalServices';
import NotFound from './pages/NotFound';
import { services } from './data/site';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="professional-services" element={<ProfessionalServices />} />
        <Route path="bpo" element={<Bpo />} />
        {services.map(s => <Route key={s.slug} path={s.path.slice(1)} element={<ServicePage service={s} />} />)}
        <Route path="about" element={<About />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
