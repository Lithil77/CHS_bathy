import React, { useRef, useEffect, useContext, useState } from 'react';
import 'ol/ol.css';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { OLMapContext } from '../../../../Contexts/OlMapContext.jsx';
import HumburgerMenu from '../../../utils/HumburgerMenu.jsx';
import './OlMap.css';
import { nodeServerUrl } from '../../../../appConfig.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Container, Popover, ButtonGroup } from 'react-bootstrap';
import { useUtility } from '../../../../Contexts/UtilityContext.jsx';
import { useParams } from "react-router-dom";
import { useColor } from '../../../../Contexts/ColorContext.jsx';
import { mapLayers } from '../../../../Utils/layersDataConfig.js';
import { id, isBuilder, olMapHeight } from '../../../../Utils/AppDetails.jsx';
import { StyledButton } from '../../../Reusable/StyledComponent.jsx';
import classNames from 'classnames';

function OlMap() {

    const { projectId: routeProjectId } = useParams();

    const selectedProjectId = routeProjectId === undefined ? id : routeProjectId;

    const { olMap, mapHeight, ConfigWMSLayerToMap, attributeQueryOverLayVisible, s124NavWarningOverLayVisible,
        updateAttributeQueryOverLayVisible, updateS124NavWarningOverLayVisible,
        updateRegularOverLayVisible, clearVectorSource } = useContext(OLMapContext);

    const { featureInfoSideBarPanel, layerSwitcherSideBarPanel, productFilterSideBarPanel,
        s124NavWarningsSideBarPanel, updateFeatureInfoSideBarPanel, updates124NavWarningsSideBarPanel,
        updates124activekey, updateS124edit, updateS124listvalue, updateProductFilterSideBarPanel,
        s100ProductFeaturesSideBarPanel, updateIsS124NavWarnButtonActive } = useUtility();

    const { fetchAndCreateProperty, getPropertyBasedOnProjectId } = useColor();

    const mapRef = useRef(null);

    const [layersData, setLayersData] = useState(null);

    useEffect(() => {
        if (olMap) {
            var view = new View({
                center: [0, 0],
                zoom: 1,
            });
            var lyr = new TileLayer({
                title: 'OSM',
                type: 'base',
                visible: true,
                source: new OSM(),
            });

            olMap.setView(view);
            olMap.addLayer(lyr);
            olMap.on('loadstart', function () { olMap.getTargetElement().classList.add('spinner'); });
            olMap.on('loadend', function () { olMap.getTargetElement().classList.remove('spinner'); });
            if (mapRef.current) {
                olMap.setTarget(mapRef.current);
            }
        }

    }, [olMap]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLayersData(null);
                if (isBuilder) {
                    const response = await axios.get(`${nodeServerUrl}/layers/${selectedProjectId}`);
                    if (response) {
                        setLayersData(response.data);
                    }
                }
                else {
                    if (mapLayers.length > 0) {
                        setLayersData(mapLayers);
                    }
                }
            } catch (error) {
                toast.error('Unable to fetch layers due to network error, Please try after some time.');
            }
        };

        fetchData();
        setTimeout(async () => {
            if (isBuilder) {
                const propertices = await getPropertyBasedOnProjectId(selectedProjectId)
                if (propertices.length == 0) {
                    fetchAndCreateProperty(selectedProjectId);
                }
            }
        }, 200);

    }, [selectedProjectId]);

    useEffect(() => {
        if (layersData) {
            const selectedLayers = layersData.filter(layer => layer.layer !== "S102 Bathy Raster" && layer.layer !== "BSH S102 Bathy Raster");
            if (selectedLayers.length > 0) {
                selectedLayers.map((layerData) => {
                    ConfigWMSLayerToMap(olMap, layerData.url, layerData.workspace, layerData.layer);
                });
            }
        }
    }, [layersData]);

    const handlePopoverClose = () => {
        updateAttributeQueryOverLayVisible(false);
        updateS124NavWarningOverLayVisible(false);
        updateFeatureInfoSideBarPanel(false);
        updateRegularOverLayVisible(false);
        clearVectorSource();
    }

    const handleFeatureInfoIcon = () => {
        updateFeatureInfoSideBarPanel(true);
        updates124activekey('createNavWarn');
        updates124NavWarningsSideBarPanel(false);
        updateProductFilterSideBarPanel(false);
    }

    const handleEditIcon = () => {
        const registeredUser = sessionStorage.getItem('username');
        if (registeredUser) {
            clearVectorSource();
            updateFeatureInfoSideBarPanel(false);
            updates124activekey('createNavWarn');
            updates124NavWarningsSideBarPanel(true);
            updateIsS124NavWarnButtonActive(true);
            updateS124edit(true);
            updateS124listvalue(false);
        }
        else {
            toast.info('Please do login while update S-124 Navigational Warning')
        }
    }

    const PopUpOverLay = (
        <Popover id="popover-basic">
            <Popover.Header as="h3" className='p-1 text-end'>
                <span onClick={handlePopoverClose} style={{ cursor: 'pointer' }}>
                    <i className='bi bi-x'></i>
                </span>
            </Popover.Header>
            <Popover.Body className='p-2'>
                <ButtonGroup>
                    <StyledButton title='Feature information' onClick={handleFeatureInfoIcon}> <i className='bi bi-info'></i></StyledButton>
                    <StyledButton title='Update feature' onClick={handleEditIcon}><i className='bi bi-pencil'></i></StyledButton>
                </ButtonGroup>
            </Popover.Body>
        </Popover>
    );

    return (
        <Container fluid className='main-content px-0'>
            <div
                ref={mapRef}
                id="map-container"
                style={{ height: `${mapHeight ? `${mapHeight}px` : `${olMapHeight}px`}` }}
                className={classNames('map-container', {
                    'active': featureInfoSideBarPanel || layerSwitcherSideBarPanel || s124NavWarningsSideBarPanel || productFilterSideBarPanel || s100ProductFeaturesSideBarPanel,
                    's124-nav-warning': s124NavWarningsSideBarPanel,
                })}
            >
                <HumburgerMenu />
            </div>
            <div id='attributeQueryOverLayContainer' className="overlay" style={{ display: attributeQueryOverLayVisible ? 'block' : 'none' }}>
                {PopUpOverLay}
            </div>
            <div id='S124NavWarningOverLayContainer' className="overlay" style={{ display: s124NavWarningOverLayVisible ? 'block' : 'none' }}>
                {PopUpOverLay}
            </div>
            <div id='featureInfoSidebar' className={`sideBar ${featureInfoSideBarPanel ? 'active' : ''}`} style={{ display: featureInfoSideBarPanel ? 'block' : 'none' }} ></div>
            <div id='layerSwitcherInfoSidebar' className={`sideBar ${layerSwitcherSideBarPanel ? 'active' : ''}`} style={{ display: layerSwitcherSideBarPanel ? 'block' : 'none' }}></div>
            <div id='productFilterInfoSidebar' className={`sideBar ${productFilterSideBarPanel ? 'active' : ''}`} style={{ display: productFilterSideBarPanel ? 'block' : 'none' }}></div>
            <div id='s124NavWarningsInfoSidebar' className={`sideBar ${s124NavWarningsSideBarPanel ? 'active' : ''}`} style={{ display: s124NavWarningsSideBarPanel ? 'block' : 'none' }}></div>
            <div id='s100ProductFeaturesInfoSidebar' className={`sideBar ${s100ProductFeaturesSideBarPanel ? 'active' : ''}`} style={{ display: s100ProductFeaturesSideBarPanel ? 'block' : 'none' }}></div>
        </Container>
    )
}

export default OlMap;