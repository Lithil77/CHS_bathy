import React, { useEffect, useRef, useContext, useImperativeHandle,useState } from 'react';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { OlMapPreviewContext } from './MapPreviewContext';
import { Zoom, Control } from 'ol/control';
import { Draw } from 'ol/interaction';
import './MapPreview.css';
import Polygon from 'ol/geom/Polygon'; 
import Feature from 'ol/Feature'; 
import { useGeographic } from 'ol/proj'; // Import useGeographic
class DrawPolygonButton extends Control {
    constructor(options) {
        const button = document.createElement('button');
        button.innerHTML = '<i class="bi bi-pentagon"></i>';
        button.onclick = options.handleClick;
        button.setAttribute('aria-label', 'Draw Polygon');
        const element = document.createElement('div');
        element.className = 'draw-polygon-button';
        element.style.cursor = 'pointer';
        element.appendChild(button);
        super({ element: element });
    }
}

const MapPreview=React.forwardRef(({ mapHeight,isLocalArea,localAreaCoordinates,isEditMode},ref)=> {
    
    const { map, updateDrawCoordinates } = useContext(OlMapPreviewContext);
    const mapRef = useRef();
    const draw = useRef(null); 
    const vectorSource = useRef(new VectorSource()); 
    const vectorLayer = useRef(new VectorLayer({ source: vectorSource.current })); 
    const [isDrawingActive, setIsDrawingActive] = useState(false);

    useGeographic();
  
const deleteFeatureFromMap = (coordinatesToDelete) => {
    
    if (mapRef.current) {
        const features = vectorSource.current.getFeatures();

        coordinatesToDelete.forEach(coordinateToDelete => {
            const { lat, lon } = coordinateToDelete; 

            features.forEach(feature => {
                const geometry = feature.getGeometry();
                const featureCoords = geometry.getCoordinates();

                if (geometry.getType() === 'Polygon' || geometry.getType() === 'MultiPolygon') {
                    const newCoords = featureCoords.map(coordArray => {
                        const filteredCoords = coordArray.filter(([lonFeature, latFeature]) => {
                            return !(Math.abs(lonFeature - lon) < 0.00001 && Math.abs(latFeature - lat) < 0.00001);
                        });

                        
                        if (filteredCoords.length > 0 && filteredCoords.length >= 3) {
                            filteredCoords.push(filteredCoords[0]);
                        }

                        return filteredCoords;
                    });

                    const isPolygonInvalid = newCoords.some(coordArray => coordArray.length < 4);
                    
                    if (isPolygonInvalid) {
                        vectorSource.current.removeFeature(feature);  
                        
                    } else if (JSON.stringify(newCoords) !== JSON.stringify(featureCoords)) {
                        geometry.setCoordinates(newCoords);  
                        
                    } else {
                        console.log("No matching coordinates to remove for feature:", feature);
                    }
                }
            });
        });
    }
};

   useImperativeHandle(ref, () => ({
    clearVectorSource: () => {
        vectorSource.current.clear();
    },
    deleteFeatureFromMap
}));

const autoPopulatePolygon = (coordinates) => {
    if (!coordinates || coordinates.length === 0) return;

    if (typeof coordinates === 'string') {
        if (coordinates.includes(' ')) {
            coordinates = coordinates.trim().replace(/ +/g, ','); 
        }

        const coordinateArray = coordinates.split(',').map(Number); 
        
        const formattedCoordinates = [];
        
        for (let i = 0; i < coordinateArray.length; i += 2) {
            const coordPair = [coordinateArray[i], coordinateArray[i + 1]];
            formattedCoordinates.push(coordPair);
        }

        const firstCoordinate = formattedCoordinates[0];
        const lastCoordinate = formattedCoordinates[formattedCoordinates.length - 1];

        if (firstCoordinate[0] !== lastCoordinate[0] || firstCoordinate[1] !== lastCoordinate[1]) {
            
            formattedCoordinates.push([...firstCoordinate]);
        }

        if (formattedCoordinates.length < 3) {
            console.error('A valid polygon must have at least 3 coordinates.');
            return;
        }

        const polygon = new Polygon([formattedCoordinates]);
        
        const extent = polygon.getExtent();
        if (extent.every(val => val === Infinity || val === -Infinity)) {
            console.error('Invalid polygon geometry or extent.');
            return;
        }
        
        const feature = new Feature({ geometry: polygon });
        vectorSource.current.clear(); 
        vectorSource.current.addFeature(feature);
        map.getView().fit(polygon.getExtent(), { padding: [20, 20, 20, 20] });
    }
};

    useEffect(() => {
        if (map) {
            const center = isLocalArea ? [-130.1207, 47.2827] : [0, 0];
            const view = new View({
                center: center,
                zoom: isLocalArea ? 4 : 2, 
            });

            const lyr = new TileLayer({
                title: 'OSM',
                type: 'base',
                visible: true,
                source: new OSM(),
            });

            map.setView(view);
            map.addLayer(lyr);
            map.setTarget(mapRef.current);

            if (isLocalArea) {
                map.addLayer(vectorLayer.current);
                const zoomControl = new Zoom({
                    className: 'zoom-control',
                    zoomInLabel: '+',
                    zoomOutLabel: '-',
                });
                map.addControl(zoomControl);

                const drawPolygonButton = new DrawPolygonButton({
                    handleClick: () => {
                        vectorSource.current.clear();
                        if (draw.current) {
                            map.removeInteraction(draw.current);
                        }
                        draw.current = new Draw({
                            source: vectorSource.current,
                            type: 'Polygon',
                        });

                        map.addInteraction(draw.current);
                        setIsDrawingActive(true);                        
                        draw.current.on('drawend', (event) => {
                            const feature = event.feature;
                            const drawGeometry = feature.getGeometry();
                            const coordinates = drawGeometry.getCoordinates();
                        const flatCoordinates = coordinates[0].flat().join(' ');
                        updateDrawCoordinates(flatCoordinates)
                            map.removeInteraction(draw.current);
                            map.updateSize();
                        });
                    },
                });

                map.addControl(drawPolygonButton);
            }

            map.on('loadstart', function () {
                map.getTargetElement().classList.add('spinner');
            });
            map.on('loadend', function () {
                map.getTargetElement().classList.remove('spinner');
            });
        }
    }, [map, isLocalArea]);

    useEffect(() => {
        if ((!isDrawingActive && localAreaCoordinates && localAreaCoordinates.length > 0) || isEditMode) {
            autoPopulatePolygon(localAreaCoordinates);
        }
    }, [localAreaCoordinates, isDrawingActive, isEditMode]);
    
    return (
        <>        
        <div ref={mapRef} id="mapPreviewcontainer" className="mapPreviewcontainer shadow border" style={{ height: mapHeight }}></div>
        </>
    );
});

export default MapPreview;
