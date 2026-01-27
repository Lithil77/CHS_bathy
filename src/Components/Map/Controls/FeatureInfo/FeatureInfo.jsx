import React, { useEffect, useState, useContext } from 'react'
import { useUtility } from '../../../../Contexts/UtilityContext';
import { OLMapContext } from '../../../../Contexts/OlMapContext';
import { CloseButton, StyledLoaderInner, StyledLoaderWraper, StyledMapControlButton } from '../../../Reusable/StyledComponent';
import { Table, Card, Stack, Container } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import { useColor } from '../../../../Contexts/ColorContext';
import './FeatureInfo.css';
import { centroid, polygon, lineString, lineSliceAlong, multiPolygon, multiLineString, point, multiPoint } from '@turf/turf';

function FeatureInfo() {

    const [title] = useState('FeatureInfo');

    const { olMap, clearVectorSource, renderHighlightedFeatures,
        getMapClickFeatures, featureInfoLoader } = useContext(OLMapContext);
    const { backgroundColor, textColor, borderColor, fontFamily } = useColor();

    const { featureInfoFlag, updateFeatureInfoFlag, registerFeatureInfoClickHandler,
        unregisterFeatureInfoClickHandlers, toggleComponent, updateFeatureInfoRecords,
        featureInfoRecords, updateMapClickFeaturesGeometry, mapClickfeaturesGeometry,
        updateMapClickFeatureInfoLayerName, mapClickFeatureInfoLayerName,
        isFeatureInfoButtonActive, s124edit, updateS124edit, updates124activekey } = useUtility();

    const sidebarHeight = window.innerHeight;
    const [columns, setColumns] = useState([]);
    const recordsPerPage = 1;
    const [currentPage, setCurrentPage] = useState(1);
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const [records, setRecords] = useState([]);
    const numberOfPages = Math.ceil(featureInfoRecords.length / recordsPerPage);
    const pageNumbers = Array.from({ length: numberOfPages }, (_, i) => i + 1);

    useEffect(() => {

        if (olMap) {
            var featureInfoButtonList = document.getElementById('featureInfoButtonList');
            const featureInfoContainer = document.getElementById('featureInfoContainer');
            if (featureInfoButtonList && featureInfoContainer != null) {
                if (!featureInfoButtonList.contains(featureInfoContainer)) {
                    featureInfoButtonList.append(featureInfoContainer);
                }
            }

            var featureInfoSidebar = document.getElementById('featureInfoSidebar');
            const featureInfoSidebarConatiner = document.getElementById('featureInfoSidebarConatiner');
            if (featureInfoSidebar != null && featureInfoSidebarConatiner != null) {
                featureInfoSidebar.append(featureInfoSidebarConatiner);
            }

            const mapContainer = document.getElementById('map-container');
            const productFilterable = document.getElementById('productFilterable');

            if (mapContainer && productFilterable) {
                mapContainer.appendChild(productFilterable);
            }
        }
    }, [olMap]);

    useEffect(() => {
        setCurrentPage(1);
        if (featureInfoRecords.length > 0) {
            setRecords([]);
            setColumns(Object.keys(featureInfoRecords[0]));
            var data = featureInfoRecords.slice(firstIndex, lastIndex);
            // Remove duplicate records by ensuring unique features
            const uniqueData = Array.from(new Set(data.map(a => a.id))) // Assuming each record has an 'id' field
                .map(id => data.find(a => a.id === id)); // Find the record by id
            setRecords(uniqueData);
        } else {
            setColumns([]);
        }
    }, [featureInfoRecords]);

    const handleMapClick = async (event) => {
        setRecords([]);
        updateFeatureInfoRecords([]);
        const data = await getMapClickFeatures(event, "featureInfo");
        if (data) {
            if (Array.isArray(data?.geometry) && data.geometry.length > 0) {
                const geometries = data.geometry;
                const combinedGeometry = geometries.flat();
                updateMapClickFeaturesGeometry(combinedGeometry);
            }
            updateFeatureInfoRecords(data?.features);
            updateMapClickFeatureInfoLayerName(data?.features[0]?.layerName);
        }
    };

    const handleFeatureInfo = () => {
        toggleComponent(title, olMap);
        setColumns([]);
        setRecords([]);
        let featureInfoBtn = document.getElementById("featureInfoBtn");
        if (featureInfoBtn) {
            featureInfoBtn.classList.add('active');
        }

        if (featureInfoFlag === false) {
            olMap.getTargetElement().style.cursor = 'pointer';
            registerFeatureInfoClickHandler('click', handleMapClick, olMap);
            updateFeatureInfoFlag(true);
            if (s124edit) {
                updates124activekey('createNavWarn');
                updateS124edit(false);
            }
        } else {
            if (featureInfoBtn) {
                featureInfoBtn.classList.remove('active');
                olMap.getTargetElement().style.cursor = 'default';
                unregisterFeatureInfoClickHandlers(olMap);
                updateFeatureInfoFlag(false);
            }
        }
    }

    const renderPageNumbers = () => {
        const visiblePages = 4;
        const middleIndex = Math.floor(visiblePages / 2);

        if (numberOfPages <= visiblePages) {
            return pageNumbers.map((n) => (
                <Pagination.Item key={n} active={currentPage === n} onClick={() => changeCurrentPage(n)}>
                    {n}
                </Pagination.Item>
            ));
        } else {
            let pagesToDisplay = [];

            if (currentPage <= middleIndex) {
                pagesToDisplay = [...pageNumbers.slice(0, visiblePages), 'ellipsis', numberOfPages];
            } else if (currentPage > numberOfPages - middleIndex) {
                pagesToDisplay = [1, 'ellipsis', ...pageNumbers.slice(-visiblePages)];
            } else {
                pagesToDisplay = [
                    1,
                    'ellipsis',
                    ...pageNumbers.slice(currentPage - middleIndex, currentPage + middleIndex - 1),
                    'ellipsis',
                    numberOfPages
                ];
            }

            return pagesToDisplay.map((page, index) => (
                <React.Fragment key={index}>
                    {page === 'ellipsis' ? (
                        <Pagination.Ellipsis />
                    ) : (
                        <Pagination.Item active={currentPage === page} onClick={() => changeCurrentPage(page)}>
                            {page}
                        </Pagination.Item>
                    )}
                </React.Fragment>
            ));
        }
    };


    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > numberOfPages) return;

        setCurrentPage(newPage);

        const startIndex = (newPage - 1) * recordsPerPage;
        const endIndex = startIndex + recordsPerPage;

        const currentRecords = featureInfoRecords.slice(startIndex, endIndex);

        const uniqueRecords = getUniqueRecordsById(currentRecords);

        setRecords(uniqueRecords);
        setColumns(Object.keys(currentRecords[0] || {}));

        if (uniqueRecords.length > 0) {
            const updatedLayerName = uniqueRecords[0].layerName;
            updateMapClickFeatureInfoLayerName(updatedLayerName);
        }

        if (mapClickfeaturesGeometry.length > 0) {
            const geometryData = mapClickfeaturesGeometry[newPage - 1];

            if (geometryData) {
                clearVectorSource(olMap);
                const vectorLayer = renderHighlightedFeatures(geometryData);
                handleVectorLayer(vectorLayer);
            }
        }
    };

    const getUniqueRecordsById = (records) => {
        const uniqueIds = new Set();
        return records.filter(record => {
            if (!uniqueIds.has(record.id)) {
                uniqueIds.add(record.id);
                return true;
            }
            return false;
        });
    };

    const handleVectorLayer = (vectorLayer) => {
        const features = vectorLayer.getSource().getFeatures();

        features.forEach(feature => {
            const geometry = feature.getGeometry();

            if (geometry) {
                const center = getFeatureCenter(geometry);
                if (center) {
                    olMap.getView().setCenter(center);
                    olMap.addLayer(vectorLayer);
                }
            }
        });
    };

    const getFeatureCenter = (geometry) => {
        switch (geometry.getType()) {
            case 'Point':
                return getPointCenter(geometry);
            case 'Polygon':
                return getPolygonCenter(geometry);
            case 'LineString':
                return getLineStringCenter(geometry);
            case 'MultiPoint':
                return getMultiPointCenter(geometry);
            case 'MultiPolygon':
                return getMultiPolygonCenter(geometry);
            case 'MultiLineString':
                return getMultiLineStringCenter(geometry);
            case 'GeometryCollection':
                return getGeometryCollectionCenter(geometry);
            case 'Circle':
                return getCircleCenter(geometry);
            default:
                return null;
        }
    };

    const getPointCenter = (geometry) => {
        return geometry.getCoordinates();
    };

    const getPolygonCenter = (geometry) => {
        const coordinates = geometry.getCoordinates()[0];
        const polygonGeoJSON = polygon([coordinates]);
        const centroidResult = centroid(polygonGeoJSON);
        return centroidResult.geometry.coordinates;
    };

    const getLineStringCenter = (geometry) => {
        const coordinates = geometry.getCoordinates();
        const lineStringGeoJSON = lineString(coordinates);
        const midpoint = lineSliceAlong(lineStringGeoJSON, 0, lineStringGeoJSON.length / 2);
        return midpoint.geometry.coordinates;
    };

    const getMultiPointCenter = (geometry) => {
        const coordinates = geometry.getCoordinates();
        const multiPointGeoJSON = multiPoint(coordinates);
        const centroidResult = centroid(multiPointGeoJSON);
        return centroidResult.geometry.coordinates;
    };

    const getMultiPolygonCenter = (geometry) => {
        const coordinates = geometry.getCoordinates();
        const multiPolygonGeoJSON = multiPolygon(coordinates);
        const centroidResult = centroid(multiPolygonGeoJSON);
        return centroidResult.geometry.coordinates;
    };

    const getMultiLineStringCenter = (geometry) => {
        const coordinates = geometry.getCoordinates();
        const multiLineStringGeoJSON = multiLineString(coordinates);
        const centroidResult = centroid(multiLineStringGeoJSON);
        return centroidResult.geometry.coordinates;
    };

    const getGeometryCollectionCenter = (geometry) => {
        const geometries = geometry.getGeometries();
        let allCoords = [];
        geometries.forEach(geom => {
            const coords = geom.getCoordinates();
            allCoords = allCoords.concat(coords);
        });
        const geometryCollectionGeoJSON = point(allCoords); // Approximation by creating a point from all coordinates
        const centroidResult = centroid(geometryCollectionGeoJSON);
        return centroidResult.geometry.coordinates;
    };

    const getCircleCenter = (geometry) => {
        const coordinates = geometry.getCenter();
        return coordinates;
    };

    const prePage = () => {
        handlePageChange(currentPage - 1);
    };

    const changeCurrentPage = (page) => {
        handlePageChange(page);
    };

    const nextPage = () => {
        handlePageChange(currentPage + 1);
    };

    const handleCloseSideBar = () => {
        toggleComponent("default", olMap)
    }

    function formatString(str) {
        let formattedStr = String(str).replace(/_/g, ' ');
        formattedStr = formattedStr.charAt(0).toUpperCase() + formattedStr.slice(1);
        formattedStr += ' ';
        return formattedStr;
    }

    return (
        <>
            <div id='featureInfoContainer' style={{ position: "relative" }}>
                <StyledMapControlButton title={title} id={title} className={`p-1 mb-1 ${isFeatureInfoButtonActive ? 'active' : ''}`}
                    onClick={(e) => { handleFeatureInfo(e) }}
                >
                    <i className="bi bi-info-circle" />
                </StyledMapControlButton>
            </div>
            <div id='featureInfoSidebarConatiner'>
                {featureInfoLoader && (
                    <StyledLoaderWraper>
                        <StyledLoaderInner />
                    </StyledLoaderWraper>
                )}
                {featureInfoRecords && featureInfoRecords.length > 0 ? (
                    <Card id='popup-content' style={{ borderColor: borderColor }}>
                        <Card.Header className="pe-1" style={{ backgroundColor: backgroundColor, color: textColor }}>
                            <Stack direction="horizontal">
                                <i className="bi bi-info-circle me-2"></i>
                                {featureInfoRecords.length > 0 ? <h6 className="mb-0">{mapClickFeatureInfoLayerName !== null && mapClickFeatureInfoLayerName}</h6> : <h6 className="mb-0"> Feature information</h6>}
                                <CloseButton onClick={handleCloseSideBar} id="popup-closer" className="ms-auto">
                                    <i className="bi bi-x"></i>
                                </CloseButton>
                            </Stack>
                        </Card.Header>
                        <Card.Body className="p-0" style={{ position: 'relative', maxHeight: `calc(${sidebarHeight}px - 105px)`, height: 'auto', minHeight: '100px', overflow: 'auto' }}>
                            <Table responsive className="table table-striped featureinfoTable">
                                <tbody>
                                    {
                                        records && records.map((item, index) => (
                                            columns.map((column, columnIndex) => (
                                                <tr key={columnIndex}>
                                                    <th style={{ width: '50%', textTransform: 'capitalize' }}>{formatString(column)}</th>
                                                    <td style={{ width: '50%' }}>
                                                        {item[column] &&
                                                            (typeof item[column] === "object" ? (
                                                                Object.entries(item[column]).map(([key, value]) => (
                                                                    <div key={key}>
                                                                        <strong>{key}:</strong> {value}
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                item[column]
                                                            ))}
                                                    </td>
                                                </tr>
                                            ))
                                        ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer className="px-1" style={{ borderColor: borderColor, fontFamily: fontFamily }}>
                            <Container className='px-0'>
                                <nav style={{ overflow: 'auto' }}>
                                    <Pagination className='mb-0 justify-content-center'>
                                        <Pagination.Prev onClick={prePage} />
                                        {renderPageNumbers()}
                                        <Pagination.Next onClick={nextPage} />
                                    </Pagination>
                                </nav>
                            </Container>
                        </Card.Footer>
                    </Card>
                ) : (
                    <Card>
                        <Card.Header className="pe-1" style={{ backgroundColor: backgroundColor, color: textColor }}>
                            <Stack direction='horizontal'>
                                <div className='mb-0'>
                                    <i className="bi bi-info-circle me-2"></i>
                                    Feature information
                                </div>
                                <CloseButton onClick={handleCloseSideBar} id='popup-closer' className='ms-auto'>
                                    <i className='bi bi-x'></i>
                                </CloseButton>
                            </Stack>
                        </Card.Header>
                        <Card.Body>
                            <h6>Please Select feature on the map to see the information.</h6>
                        </Card.Body>
                    </Card>
                )}
            </div>
        </>
    )
}

export default FeatureInfo;
