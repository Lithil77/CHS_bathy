import React, { useEffect, useState, createContext } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import { defaults as defaultInteractions, Pointer as PointerInteraction } from 'ol/interaction';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import ImageWMS from "ol/source/ImageWMS.js";
import ImageLayer from "ol/layer/Image.js";
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Image as ImageSource } from 'ol/source';
import Draw from 'ol/interaction/Draw';
import GeoJSON from 'ol/format/GeoJSON.js';
import { useColor } from './ColorContext';
import { nodeServerUrl, S124Navarea, S124NavWarningGroupLayer } from '../appConfig';
import axios from 'axios';
import { toast } from 'react-toastify';
import WMSCapabilities from 'ol/format/WMSCapabilities';
import { isEmpty } from 'ol/extent';

var parser = new GeoJSON();
var allfeaturesList = [];
var featuresGeometry = [];

export const OLMapContext = createContext(undefined);

export const OLMapProvider = ({ children }) => {

    const [olMap, setOlMap] = useState(null);

    const [featureInfoLoader, setFeatureInfoLoader] = useState(false);

    const [depthFileterSelectedlayerFlag, setDepthFileterSelectedlayerFlag] = useState(false);

    const updateDepthFileterSelectedlayerFlag = (layer) => {
        setDepthFileterSelectedlayerFlag(layer)
    }

    const [depthFileterSelectedlayer, setDepthFileterSelectedlayer] = useState(null);

    const updateDepthFileterSelectedlayer = (layer) => {
        setDepthFileterSelectedlayer(layer)
    }

    const [mapLayerConfigs, setMapLayerConfigs] = useState([]);

    const updateMapLayerConfigs = (layerConfig) => {
        setMapLayerConfigs(layerConfig);
    }

    const updateFeatureInfoLoader = (isValue) => {
        setFeatureInfoLoader(isValue)
    }

    const { fillColor, strokeColor } = useColor();

    const [mapHeight, setMapHeight] = useState();

    const [updateLayerSwitcherFlag, setUpdateLayerSwitcherFlag] = useState(false);
    const updateLayerSwitcherFlagFn = (isValue) => {
        setUpdateLayerSwitcherFlag(isValue);
    }
    const [geoServerWorkSpaceList, setGeoServerWorkSpaceList] = useState([]);

    const updateGeoServerWorkSpaceList = (urls) => {
        setGeoServerWorkSpaceList(urls);
    }

    const [inBuilder, setInBuilder] = useState();

    const updateInBuilder = (isValue) => {
        setInBuilder(isValue);
    }

    const [hamburgerMenuOpen, setHumburgerMenuOpen] = useState(true);

    const [previousExtend, setPreviousExtend] = useState([]);

    const [nextExtend, setNextExtend] = useState([]);

    const [islayerAdded, setLayerAdded] = useState(false);

    const updateIsLayerAdded = (value) => {
        setLayerAdded(value);
    }

    const [attributeQueryOverLayVisible, setAttributeQueryOverLayVisible] = useState(false);

    const updateAttributeQueryOverLayVisible = (value) => {
        setAttributeQueryOverLayVisible(value)
    }

    const [s124NavWarningOverLayVisible, setS124NavWarningOverLayVisible] = useState(false);

    const updateS124NavWarningOverLayVisible = (visibility) => {
        setS124NavWarningOverLayVisible(visibility)
    }

    const [regularOverLayVisible, setRegularOverLayVisible] = useState(false);

    const updateRegularOverLayVisible = (visibility) => {
        setRegularOverLayVisible(visibility)
    }

    const [datasetFileIdentifier, setDatasetFileIdentifier] = useState('');


    const [s124DrawLineButtonActive, setS124DrawLineButtonActive] = useState(false);
    const updateS124DrawLineButtonActive = (value) => {
        setS124DrawLineButtonActive(value);
    }

    const [s124DrawPolygonButtonActive, setS124DrawPolygonButtonActive] = useState(false);

    const updateS124DrawPolygonButtonActive = (value) => {
        setS124DrawPolygonButtonActive(value);
    }

    const [s124DrawPointButtonActive, setS124DrawPointButtonActive] = useState(false);
    const updateS124DrawPointButtonActive = (value) => {
        setS124DrawPointButtonActive(value);
    }

    useEffect(() => {
        const olMap = new Map({
            controls: [],
            interactions: defaultInteractions({ doubleClickZoom: false }).extend([
                new PointerInteraction({
                    handleDoubleClickEvent: (event) => {
                        event.preventDefault();
                    },
                }),
            ]),
        });
        setOlMap(olMap);
    }, []);

    const updatePreviousExtend = () => {
        if (olMap) {
            const extent = olMap.getView().calculateExtent(olMap.getSize());
            setPreviousExtend((prevExtent) => [
                ...prevExtent,
                extent,
            ]);
        }
    }

    const updateNextExtend = () => {
        if (olMap) {
            const extent = olMap.getView().calculateExtent(olMap.getSize())
            setNextExtend((prevExtent) => [
                ...prevExtent,
                extent,
            ]);
        }
    }

    const toggleHumburgerMenu = (value) => {
        setHumburgerMenuOpen(value)
    }

    const updateMapHeight = (value) => {
        setMapHeight(value);
    }

    const stopDrawAction = () => {
        if (olMap) {
            const interactions = olMap.getInteractions();
            interactions.forEach(interaction => {
                if (interaction instanceof Draw) {
                    if (interaction.getActive()) {
                        interaction.finishDrawing();
                        interaction.setActive(false);
                        olMap.removeInteraction(interaction);
                    }
                }
            });
        }
    };

    const clearVectorSource = () => {

        if (olMap) {
            var layers = olMap.getLayers().getArray();

            for (let index = 0; index < 5; index++) {
                layers.map((lyr) => {
                    if (lyr instanceof VectorLayer && lyr.getSource() instanceof VectorSource) {
                        if (lyr.get('title') == 'Highlight-selected-Features') {
                            lyr.getSource().clear();
                            olMap.removeLayer(lyr);
                            olMap.render();
                        } else {
                            lyr.getSource().clear();
                            olMap.removeLayer(lyr);
                            olMap.render();
                        }
                    }
                })
            }
        }
    }

    const clearImageSource = (olMap) => {

        if (olMap) {
            var layers = olMap.getLayers().getArray();
            layers.map((lyr) => {
                if (lyr instanceof ImageLayer && lyr.getSource() instanceof ImageSource) {
                    olMap.removeLayer(lyr);
                    olMap.render();
                }
            })
        }
    }

    const renderHighlightedFeatures = (data) => {
        const vectorLayer = createStylingVectorLayerWithStyles();
        if (data) {
            try {
                const features = parser.readFeatures(data);
                const vectorSource = vectorLayer.getSource();
                vectorSource.addFeatures(features);
            } catch (error) {
                console.error("Error parsing features:", error);
            }
        }
        return vectorLayer;
    };

    const renderWarningHighlightedFeatures = (data) => {
        const vectorLayer = createStylingVectorLayerWithStyles();
        if (data && data.length > 0) {
            const geojsonData = {
                type: "FeatureCollection",
                features: data.map(warning => {
                    let coordinates = [];
                    const coordsArray = warning.coordinates.trim().split(" ");

                    if (warning.geometryType === "Point") {
                        coordinates = coordsArray.map(coord => parseFloat(coord));
                        if (coordinates.length !== 2) {
                            console.error(`Invalid Point coordinates for warning ${warning.datasetFileIdentifier}`);
                            return null;
                        }
                    } else if (warning.geometryType === "Line" || warning.geometryType === "LineString") {
                        for (let i = 0; i < coordsArray.length; i += 2) {
                            const lon = parseFloat(coordsArray[i]);
                            const lat = parseFloat(coordsArray[i + 1]);
                            if (isNaN(lon) || isNaN(lat)) {
                                console.error(`Invalid LineString coordinates for warning ${warning.datasetFileIdentifier}`);
                                return null;
                            }
                            coordinates.push([lon, lat]);
                        }
                    } else if (warning.geometryType === "Polygon") {
                        const tempCoords = [];
                        for (let i = 0; i < coordsArray.length; i += 2) {
                            const lon = parseFloat(coordsArray[i]);
                            const lat = parseFloat(coordsArray[i + 1]);
                            if (isNaN(lon) || isNaN(lat)) {
                                console.error(`Invalid Polygon coordinates for warning ${warning.datasetFileIdentifier}`);
                                return null;
                            }
                            tempCoords.push([lon, lat]);
                        }
                        if (tempCoords.length < 4 || !tempCoords[0].every((val, index) => val === tempCoords[tempCoords.length - 1][index])) {
                            console.error(`Invalid Polygon closure for warning ${warning.datasetFileIdentifier}`);
                            return null;
                        }
                        coordinates = [tempCoords];
                    } else {
                        console.error(`Unsupported geometry type ${warning.geometryType} for warning ${warning.datasetFileIdentifier}`);
                        return null;
                    }

                    return {
                        type: "Feature",
                        geometry: {
                            type: warning.geometryType === "Line" ? "LineString" : warning.geometryType,
                            coordinates: coordinates
                        },
                        properties: {
                            datasetFileIdentifier: warning.datasetFileIdentifier,
                            datasetTitle: warning.datasetTitle,
                            information: warning.information
                        }
                    };
                }).filter(feature => feature !== null) // Filter out any invalid features
            };

            const features = parser.readFeatures(geojsonData, {
                featureProjection: olMap.getView().getProjection()
            });

            vectorLayer.getSource().addFeatures(features);
        }

        return vectorLayer;
    };

    const hexToRgba = (hex, alpha) => {
        const hexColor = hex.replace('#', '');
        const r = parseInt(hexColor.substring(0, 2), 16);
        const g = parseInt(hexColor.substring(2, 4), 16);
        const b = parseInt(hexColor.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const pointStyle = new Style({
        image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
                color: hexToRgba(strokeColor, 0.7),
            }),
            fill: new Fill({
                color: hexToRgba(fillColor, 0.7),
            }),
        }),
    });

    const lineStyle = new Style({
        stroke: new Stroke({
            color: hexToRgba(strokeColor, 0.9),
            width: 3,
        }),
    });

    const polygonStyle = new Style({
        fill: new Fill({
            color: hexToRgba(strokeColor, 0.5),
        }),
        stroke: new Stroke({
            color: hexToRgba(fillColor, 0.9),
            width: 3,
        }),
    });


    const createStylingVectorLayerWithStyles = () => {
        const vectorLayer = new VectorLayer({
            source: new VectorSource(),
            title: "Highlight-selected-Features",
            style: function (feature) {
                switch (feature.getGeometry().getType()) {
                    case 'Point':
                        return pointStyle;
                    case 'LineString':
                        return lineStyle;
                    case 'Polygon':
                        return polygonStyle;
                    default:
                        return null;
                }
            },
        });
        return vectorLayer;
    };

    const ConfigWMSLayerToMap = (olMap, wmsUrl, workspace, layerName) => {
        const wmsSource = new ImageWMS({
            url: wmsUrl,
            params: {
                LAYERS: `${workspace}:${layerName}`,
                TILED: false,
            },
            serverType: "geoserver",
        });

        const wmsLayer = new ImageLayer({
            title: layerName,
            visible: true,
            source: wmsSource,
        });

        olMap.addLayer(wmsLayer);
    };

    const hightLightSelectedFeature = (olMap, _data) => {

        if (_data && olMap) {
            const vectorLayer = new VectorLayer({
                title: 'Highlight-Vector-Layer',
                source: new VectorSource(),
                style: function (feature) {
                    switch (feature.getGeometry().getType()) {
                        case 'Point':
                            return pointStyle;
                        case 'LineString':
                            return lineStyle;
                        case 'Polygon':
                            return polygonStyle;
                        default:
                            return null;
                    }
                },
            });
            var features = parser.readFeatures(_data, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            });

            vectorLayer.getSource().addFeatures(features);
            var extent = vectorLayer.getSource().getExtent();
            olMap.getView().fit(extent, {
                padding: [250, 250, 350, 250], minResolution: 10,
                duration: 1000
            });
            olMap.addLayer(vectorLayer);
        }
    }

    const getAllVisibleLayers = () => {
        if (olMap) {
            const allLayers = olMap.getLayers().getArray();
            const visibleLayerTitles = new Set();

            for (let i = 0; i < allLayers.length; i++) {
                const layer = allLayers[i];
                if (layer instanceof ImageLayer && layer.getSource() instanceof ImageWMS) {
                    if (layer.getVisible() === true) {
                        const title = layer.get('title');
                        if (title !== S124Navarea) {
                            visibleLayerTitles.add(title);
                        }
                    }
                }
            }

            return Array.from(visibleLayerTitles);
        }
    };

    const getTargetLayer = (selectedLayer) => {
        const layersList = olMap.getLayers().getArray();
        const targetLayer = layersList.find((lyr) =>
            lyr instanceof ImageLayer &&
            lyr.getSource() instanceof ImageWMS &&
            selectedLayer === lyr.get('title') &&
            lyr.getVisible()
        );
        return targetLayer;
    }

    const getMapClickFeatures = async (event, componentType) => {
        clearVectorSource();
        stopDrawAction();
        var layers = olMap.getLayers().getArray();
        featuresGeometry = [];
        allfeaturesList = [];
        updateFeatureInfoLoader(true);
        if (s124DrawLineButtonActive !== true && s124DrawPointButtonActive !== true && s124DrawPolygonButtonActive !== true) {
            const promises = layers.map(async (lyr) => {
                if (lyr instanceof ImageLayer && lyr.getSource() instanceof ImageWMS) {
                    if (lyr.getVisible() === true && lyr.get('title') !== S124Navarea) {
                        var viewResolution = event.target.getView().getResolution();
                        var featureUrl = lyr
                            .getSource()
                            .getFeatureInfoUrl(event.coordinate, viewResolution, "EPSG:3857", {
                                INFO_FORMAT: "application/json",
                                FEATURE_COUNT: 20
                            });

                        if (featureUrl) {
                            //const queryParams = { param: featureUrl };

                            try {
                                //const res = await axios.get(`${nodeServerUrl}/getFeatureInfo`, { params: queryParams });
                                const res = await axios.get(featureUrl);
                                if (res.data.features) {
                                    const lyrTitle = lyr.get('title');
                                    if (Array.isArray(res.data.features) && res.data.features.length > 0) {
                                        featuresGeometry.push(res.data.features);

                                        for (let index = 0; index < res.data.features.length; index++) {
                                            let properties = res.data.features[index].properties;
                                            properties.layerName = lyrTitle;

                                            const existingFeature = allfeaturesList.some(existing =>
                                                JSON.stringify(existing) === JSON.stringify(properties)
                                            );

                                            if (!existingFeature) {
                                                allfeaturesList.push(properties);
                                            }
                                        }
                                    }
                                }

                                if (allfeaturesList.length > 0) {
                                    const vectorLayer = renderHighlightedFeatures(res.data);
                                    if (componentType === 'featureInfo') {

                                        const features = vectorLayer.getSource().getFeatures();

                                        if (features.length > 0) {
                                            const geometry = features[0].getGeometry();
                                            let center;

                                            switch (geometry.getType()) {
                                                case 'Point':
                                                    center = geometry.getCoordinates();
                                                    break;
                                                case 'LineString':
                                                    center = geometry.getCoordinates()[Math.floor(geometry.getCoordinates().length / 2)];
                                                    break;
                                                case 'Polygon':
                                                    center = geometry.getInteriorPoint().getCoordinates();
                                                    break;
                                                default:
                                                    center = geometry.getCoordinates()[0];
                                                    break;
                                            }

                                            olMap.getView().setCenter(center);
                                        }

                                        olMap.addLayer(vectorLayer);

                                        /* const extent = vectorLayer.getSource().getExtent();
                                         if (!isEmpty(extent)) {
                                             olMap.getView().fit(extent, {
                                                 padding: [180, 180, 250, 180],
                                                 minResolution: 10,
                                                 duration: 1000
                                             });
                                         }*/
                                    }
                                }

                            } catch (error) {
                                console.log(`Error while getting features based on given coordinates from ${componentType}`);
                                toast.info(`features are not available for this  coordinates from ${componentType}`);
                            }
                        }
                    }
                }
            });

            await Promise.all(promises);
            updateFeatureInfoLoader(false);
            return { features: allfeaturesList, geometry: featuresGeometry };
        }
    };

    const refreshS124NavWarnMap = () => {
        const allLayers = olMap.getLayers().getArray();
        for (let i = 0; i < allLayers.length; i++) {
            const layer = allLayers[i];
            if (layer instanceof ImageLayer && layer.getSource() instanceof ImageWMS) {
                if (layer.getVisible() === true) {
                    if (layer.get('title') === S124NavWarningGroupLayer)
                        if (layer) {
                            layer.getSource().updateParams({ _: Date.now() });
                            olMap.render();
                        }
                }
            }
        }
    }

    const getWorkSpacesFromGeoServer = async (geoServerUrlList) => {
        var workSpaces = [];

        await Promise.all(geoServerUrlList.map(async (geoServerUrl) => {
            if (geoServerUrl) {
                const url = `${geoServerUrl}/ows?service=WMS&version=1.3.0&request=GetCapabilities`;
                const queryParams = { param: url };

                try {
                    const response = await axios.get(`${nodeServerUrl}/getWorkSpaces`, { params: queryParams });

                    const parser = new WMSCapabilities();
                    const result = parser.read(response.data);

                    const layers = result?.Capability?.Layer?.Layer || [];

                    if (layers.length > 0) {
                        layers.forEach(layer => {
                            const layerName = layer.Name;
                            if (layerName) {
                                const workSpaceName = layerName.split(':')[0];
                                const workSpaceUrl = `${geoServerUrl}/${workSpaceName}/wms`;
                                const workSpaceConfig = {
                                    workSpace: workSpaceName,
                                    workSpaceUrl: workSpaceUrl
                                };

                                if (!workSpaces.some(ws => ws.workSpace === workSpaceConfig.workSpace)) {
                                    workSpaces.push(workSpaceConfig);
                                }
                            }
                        });
                    } else {
                        return workSpaces;
                    }
                } catch (error) {
                    return workSpaces;
                }
            }
        }));
        return workSpaces;
    };

    const getWorkSpaces = () => {
        const myTimeOut = setTimeout(async () => {
            try {
                const response = await axios.get(`${nodeServerUrl}/geoConfigs`);
                if (response) {
                    const urls = response.data.map(config => config.url);
                    const workSpaces = await getWorkSpacesFromGeoServer(urls);
                    if (workSpaces.length > 0) {
                        updateGeoServerWorkSpaceList(workSpaces);
                    } else {
                        updateGeoServerWorkSpaceList([]);
                    }
                }
            } catch (error) {
                toast.warn('Error fetching workspaces')
            } finally {
                clearTimeout(myTimeOut);
            }
        }, 500);
    }

    const VisibleAllData = (selectedMapLayer = "") => {
        if (olMap) {
            const layersList = olMap.getLayers().getArray();
            layersList.forEach(layer => {
                if (layer instanceof ImageLayer && layer.getSource() instanceof ImageWMS) {
                    if (selectedMapLayer) {
                        if (selectedMapLayer === layer.get('title')) {
                            layer.setVisible(true);
                            const params = layer.getSource().getParams();
                            params.cql_filter = null;
                            layer.getSource().updateParams(params);
                        }
                    } else {
                        layer.setVisible(true);
                        const params = layer.getSource().getParams();
                        params.cql_filter = null;
                        layer.getSource().updateParams(params);
                    }
                }
            });
        }
    }

    return (
        <>
            <OLMapContext.Provider value={{
                olMap, updateMapHeight, mapHeight,
                hamburgerMenuOpen, toggleHumburgerMenu,
                updatePreviousExtend, updateNextExtend, previousExtend, nextExtend,
                hightLightSelectedFeature, clearImageSource, clearVectorSource,
                renderHighlightedFeatures, stopDrawAction, ConfigWMSLayerToMap, renderWarningHighlightedFeatures,
                updateIsLayerAdded, islayerAdded, getAllVisibleLayers, getTargetLayer,
                attributeQueryOverLayVisible, updateAttributeQueryOverLayVisible, s124NavWarningOverLayVisible,
                updateS124NavWarningOverLayVisible, updateInBuilder, inBuilder, regularOverLayVisible, updateRegularOverLayVisible,
                getMapClickFeatures, refreshS124NavWarnMap, updateGeoServerWorkSpaceList, geoServerWorkSpaceList, getWorkSpaces,
                createStylingVectorLayerWithStyles, datasetFileIdentifier, s124DrawLineButtonActive, updateS124DrawLineButtonActive, s124DrawPolygonButtonActive,
                updateS124DrawPolygonButtonActive, s124DrawPointButtonActive, updateS124DrawPointButtonActive, featureInfoLoader,
                VisibleAllData, updateLayerSwitcherFlagFn, updateLayerSwitcherFlag, updateMapLayerConfigs, mapLayerConfigs,
                updateDepthFileterSelectedlayer, depthFileterSelectedlayer, updateDepthFileterSelectedlayerFlag, depthFileterSelectedlayerFlag
            }}>
                {children}
            </OLMapContext.Provider>
        </>
    )
};

