
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { OLMapProvider } from './Contexts/OlMapContext.jsx';
import { UtilityProvider } from './Contexts/UtilityContext.jsx';
import { ColorProvider } from './Contexts/ColorContext.jsx';
import './index.css';
import { ProductFilterProvider } from './Contexts/ProductFilterContext.jsx';
import { RTZFileProvider } from './Contexts/RTZFileContext.jsx';
import OlMapPreviewProvider from './Components/utils/MapPreview/MapPreviewContext.jsx';
import MousePosition from './Components/Map/Controls/MousePosition/MousePosition';
import Home from './Components/Map/Controls/Home/Home';
import OlMap from './Components/Map/Controls/OlMap/OlMap';
import ZoomOut from './Components/Map/Controls/ZoomOut/ZoomOut';
import ZoomIn from './Components/Map/Controls/ZoomIn/ZoomIn';
import BaseMaps from './Components/Map/Controls/BaseMaps/BaseMaps';

import FeatureInfo from './Components/Map/Controls/FeatureInfo/FeatureInfo';
import LayerSwitcher from './Components/Map/Controls/LayerSwitcher/LayerSwitcher';
import DepthFilter from './Components/Map/Controls/DepthFilter/DepthFilter';
import ZoomWindow from './Components/Map/Controls/ZoomWindow/ZoomWindow';

function App() {

  document.title = 'CHSBathyProject';

  const MapComponents = () => {
    return (
      <div>
        <MousePosition />
        <Home />
        <OlMap />
        <ZoomOut />
        <ZoomIn />
        <BaseMaps />
        <FeatureInfo />
        <LayerSwitcher />
        <DepthFilter />
        <ZoomWindow />
      </div>
    );
  };

  return (
    <>
      <ColorProvider>
        <OLMapProvider>
          <OlMapPreviewProvider>
            <UtilityProvider>
              <ProductFilterProvider>
                <RTZFileProvider>
                  <Router>
                    <Routes>
                      <Route path="/" element={<MapComponents />} />
                      <Route path="/mainLayout/:projectName/:projectId" element={<MapComponents />} />
                    </Routes>
                  </Router>
                </RTZFileProvider>
              </ProductFilterProvider>
            </UtilityProvider>
          </OlMapPreviewProvider>
        </OLMapProvider>
      </ColorProvider>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
export default App;
