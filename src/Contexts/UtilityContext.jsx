import React, { useState, createContext, useContext, useRef } from 'react';
import { OLMapContext } from './OlMapContext';
import { S124NavigationalwarningsAPIs, S124NavWarningGroupLayer } from '../appConfig';
import axios from 'axios';

const UtilityContext = createContext(undefined);

export const useUtility = () => {
    return useContext(UtilityContext);
};

export const UtilityProvider = ({ children }) => {

    const { olMap, stopDrawAction, clearVectorSource, mapOverlay,
        updateAttributeQueryOverLayVisible, updateS124NavWarningOverLayVisible,
        updateRegularOverLayVisible } = useContext(OLMapContext);

    const [isHomeButtonActive, setIsHomeButtonActive] = useState(false);
    const updateIsHomeButtonActive = (isValue) => {
        setIsHomeButtonActive(isValue);
    }

    const [isZoomInButtonActive, setIsZoomInButtonActive] = useState(false);
    const updateIsZoomInButtonActive = (isValue) => {
        setIsZoomInButtonActive(isValue);
    }

    const [isZoomOutButtonActive, setIsZoomOutButtonActive] = useState(false);
    const updateIsZoomOutButtonActive = (isValue) => {
        setIsZoomOutButtonActive(isValue);
    }

    const [isPrevExtendButtonActive, setIsPrevExtendButtonActive] = useState(false);
    const updateIsPrevExtendButtonActive = (isValue) => {
        setIsPrevExtendButtonActive(isValue);
    }

    const [isNextExtendButtonActive, setIsNextExtendButtonActive] = useState(false);
    const updateIsNextExtendButtonActive = (isValue) => {
        setIsNextExtendButtonActive(isValue);
    }

    const [isFeatureInfoButtonActive, setIsFeatureInfoButtonActive] = useState(false);
    const updateIsFeatureInfoButtonActive = (isValue) => {
        setIsFeatureInfoButtonActive(isValue);
    }

    const [isProductFilterButtonActive, setIsProductFilterButtonActive] = useState(false);
    const updateIsProductFilterButtonActive = (isValue) => {
        setIsProductFilterButtonActive(isValue);
    }

    const [isS124NavWarnButtonActive, setIsS124NavWarnButtonActive] = useState(false);
    const updateIsS124NavWarnButtonActive = (isValue) => {
        setIsS124NavWarnButtonActive(isValue);
    }

    const [isLayerSwitcherButtonActive, setIsLayerSwitcherButtonActive] = useState(false);
    const updateIsLayerSwitcherButtonActive = (isValue) => {
        setIsLayerSwitcherButtonActive(isValue);
    }

    const [isS100ProductFeaturesButtonActive, setIsS100ProductFeaturesButtonActive] = useState(false);
    const updateIsS100ProductFeaturesButtonActive = (isValue) => {
        setIsS100ProductFeaturesButtonActive(isValue);
    }

    const [isAttributeQueryButtonActive, setIsAttributeQueryButtonActive] = useState(false);
    const updateIsAttributeQueryButtonActive = (isValue) => {
        setIsAttributeQueryButtonActive(isValue);
    }

    const [mapClickfeaturesGeometry, setMapClickfeaturesGeometry] = useState([]);

    const updateMapClickFeaturesGeometry = (isData) => {
        setMapClickfeaturesGeometry(isData);
    }

    const [mapClickFeatureInfoLayerName, setMapClickFeatureInfoLayerName] = useState(null);
    const updateMapClickFeatureInfoLayerName = (isValue) => {
        setMapClickFeatureInfoLayerName(isValue);
    }

    const dragBoxRef = useRef(null);
    const typeaheadRef = useRef(null);

    const [logoFlag, setLogoFlag] = useState(false);

    const updateLogoFlagValue = (value) => {
        setLogoFlag(value);
    }

    const [productFilterBottomTablePanelVisible, setProductFilterBottomTablePanelVisible] = useState(false);

    const updateProductFilterBottomTablePanelvisible = (values) => {
        setProductFilterBottomTablePanelVisible(values)
    }

    const [attributeQueryBottomTablePanelVisible, setAttributeQueryBottomTablePanelVisible] = useState(false);

    const updateAttributeQueryBottomTablePanelVisible = (value) => {
        setAttributeQueryBottomTablePanelVisible(value)
    };

    const [ActivewarnlistBottomTablePanelVisible, setActivewarnlistBottomTablePanelVisible] = useState(false);

    const updateActivewarnlistBottomTableVisible = (value) => {
        setActivewarnlistBottomTablePanelVisible(value)
    };

    const [collapsedQueryResultPanel, setCollapsedQueryResultPanel] = useState(false);

    const updateCollapsedQueryResultPanel = (value) => {
        setCollapsedQueryResultPanel(value)
    }

    const [selectedAttributeQueryOption, setSelectedAttributeQueryOption] = useState(null);
    const updateSelectedAttributeQueryOption = (option) => {
        setSelectedAttributeQueryOption(option)
    }

    const [searchInputloading, setSearchInputloading] = useState(false);
    const updateSearchInputloading = (value) => {
        setSearchInputloading(value);
    }

    const [featureSearchResults, setFeatureSearchResults] = useState([]);
    const updateFeatureSearchResults = (data) => {
        setFeatureSearchResults(data);
    }

    const clearFeatureSearchResults = () => {
        setFeatureSearchResults([]);
    }

    const [attributeQuerySelectedLayer, setAttributeQuerySelectedLayer] = useState('');
    const updateAttributeQuerySelectedLayer = (layerName) => {
        setAttributeQuerySelectedLayer(layerName);
    }

    const [attributeQueryPanelVisible, SetAttributeQueryPanelVisible] = useState(false);
    const updateAttributeQueryPanelVisible = (value) => {
        SetAttributeQueryPanelVisible(value);
    }

    const [isBaseMapWindowVisible, setIsBaseMapWindowVisible] = useState(false);

    const updateIsBaseMapwindowVisible = (value) => {
        setIsBaseMapWindowVisible(value);
        activeAndDeactivateButton(value, "BaseMaps");
    }

    const [isMeasureAreaWindowVisible, setIsMeasureAreaWindowVisible] = useState(false);

    const updateIsMeasureAreaWindowVisible = (value) => {
        setIsMeasureAreaWindowVisible(value);
        activeAndDeactivateButton(value, "Measure");
    }

    const [featureInfoFlag, setFeatureInfoFlag] = useState(false);

    const updateFeatureInfoFlag = (isValue) => {
        setFeatureInfoFlag(isValue);
    };

    const [clickHandlers, setClickHandlers] = useState([]);

    const [zoomWindowBtnFlag, setZoomWindowBtnFlag] = useState(true);

    const updateZoomWindowBtnFlag = (value) => {
        setZoomWindowBtnFlag(value)
    }

    const [zoomWindowButtonActive, setZoomWindowButtonActive] = useState(false);
    const updateZoomWindowButtonActive = (value) => {
        setZoomWindowButtonActive(value)
    }

    const [featureInfoSideBarPanel, setFeatureInfoSideBarPanel] = useState(false);

    const updateFeatureInfoSideBarPanel = (value) => {
        setFeatureInfoSideBarPanel(value);
    }

    const [s100ProductFeaturesSideBarPanel, setS100ProductFeaturesSideBarPanel] = useState(false);

    const updateS100ProductFeaturesSideBarPanel = (value) => {
        setS100ProductFeaturesSideBarPanel(value);
    }

    const [layerSwitcherSideBarPanel, setLayerSwitcherSideBarPanel] = useState(false);

    const updateLayerSwitcherSideBarPanel = (value) => {
        setLayerSwitcherSideBarPanel(value);
    }

    const [productFilterSideBarPanel, setProductFilterSideBarPanel] = useState(false);

    const updateProductFilterSideBarPanel = (value) => {
        setProductFilterSideBarPanel(value);
    }
    const [s124NavWarningsSideBarPanel, sets124NavWarningsSideBarPanel] = useState(false);

    const updates124NavWarningsSideBarPanel = (value) => {
        sets124NavWarningsSideBarPanel(value);
    }

    const [productfilteredNavWarnings, setProductfilteredNavWarnings] = useState([]);

    const updateProductFilteredNavWarnings = (value) => {
        setProductfilteredNavWarnings(value)
    }

    const [s124NavWarnSearchFilterTitle, setS124NavWarnSearchFilterTitle] = useState('');

    const updateS124NavWarnSearchFilterTitle = (value) => {
        setS124NavWarnSearchFilterTitle(value);
    }

    const [s124NavWarnSearchFilterNoResultFound, setS124NavWarnSearchFilterNoResultFound] = useState('');

    const updateS124NavWarnSearchFilterNoResultFound = (value) => {
        setS124NavWarnSearchFilterNoResultFound(value);
    }

    const [clearWarningsfilter, setClearWarningsFilter] = useState(false);
    const updateClearWarningsFilter = (value) => {
        setClearWarningsFilter(value);
    }

    const [activeKey, setActiveKey] = useState('listAllActiveWarns');

    const updates124activekey = (value) => {
        setActiveKey(value);
    }

    const [s124edit, setS124Edit] = useState(false);

    const updateS124edit = (value) => {
        setS124Edit(value);
    }

    const [s124NavWarningDataSetFileIdentifier, setS124NavWarningDataSetFileIdentifier] = useState('');

    const updateS124NavWarningDataSetFileIdentifier = (value) => {
        setS124NavWarningDataSetFileIdentifier(value);
    }

    const [s124listvalue, setS124s124listvalue] = useState('');

    const updateS124listvalue = (value) => {
        setS124s124listvalue(value);
    }

    const removeZoomWindowFunctionality = (olMap) => {
        if (dragBoxRef.current) {
            olMap.removeInteraction(dragBoxRef.current);
        }
    }

    const activeAndDeactivateButton = (isValue, component) => {

        const baseMapsActive = document.getElementById(component);
        if (isValue === false) {
            if (baseMapsActive !== null) {
                baseMapsActive.classList.remove('active');
            }
        }
        else {
            if (baseMapsActive !== null) {
                baseMapsActive.classList.add('active');
            }
        }
    }

    const registerFeatureInfoClickHandler = (type, handler, olMap) => {
        setClickHandlers((prevHandlers) => [...prevHandlers, { type, handler }]);
        olMap.on(type, handler);
    };

    const unregisterFeatureInfoClickHandlers = (type, olMap) => {

        if (olMap) {
            olMap.getTargetElement().style.cursor = 'default';
            clickHandlers.forEach(({ type, handler }) => {
                olMap.un(type, handler);
            });

            setClickHandlers([]);
        }

        var buttons = document.querySelectorAll('.ZoomextentBtn');
        buttons.forEach(function (button) {
            button.classList.remove('active');
        });
        updateZoomWindowButtonActive(false);

        let featureInfoBtn = document.getElementById("featureInfoBtn");

        if (featureInfoBtn != null) {
            featureInfoBtn.classList.remove('active');
        }

        let mapContainer = document.getElementById('map-container');
        if (mapContainer) {
            mapContainer.style.cursor = 'default';
        }

        const validTypes = ['productFilter', 'attributeQuery', 'FeatureInfo', 'S124NavigationalWarnings',
            'BaseMaps', 'Measure', 'ZoomWindow', 'Home', "other"];

        if (validTypes.includes(type)) {

            for (let i = 0; i < 5; i++) {
                clearVectorSource();
            }
            const tooltipStatic = document.querySelectorAll(".ol-tooltip-static");

            if (tooltipStatic) {
                tooltipStatic.forEach(tooltip => {
                    tooltip.style.display = "none";
                });
            }
        }

    };

    const [showDepthFilterPopUpContainer, setShowDepthFilterPopUpContainer] = useState(false);

    const updateDepthFilterPopUpContainer = (isValue) => {
        setShowDepthFilterPopUpContainer(isValue)
    }

    const [featureInfoRecords, setFeatureInfoRecords] = useState([]);

    const updateFeatureInfoRecords = (records) => {
        setFeatureInfoRecords(records);
    }

    const toggleComponent = (component, olMap) => {
        const componentActions = {
            "ZoomIn": () => {
                updateIsHomeButtonActive(false);
                updateIsZoomInButtonActive(true);
                updateIsZoomOutButtonActive(false);
                updateIsPrevExtendButtonActive(false);
                updateIsNextExtendButtonActive(false);
                updateIsLayerSwitcherButtonActive(false);
                updateIsS100ProductFeaturesButtonActive(false);
                updateIsAttributeQueryButtonActive(false);
                updateIsBaseMapwindowVisible(false);
                updateIsMeasureAreaWindowVisible(false);
                removeZoomWindowFunctionality(olMap);
                updateLayerSwitcherSideBarPanel(false);
                updateS100ProductFeaturesSideBarPanel(false);
                updateS124NavWarningOverLayVisible(false);
                updateDepthFilterPopUpContainer(false);
                //updates124NavWarningsSideBarPanel(false);
                updateZoomWindowButtonActive(false);
                if (isFeatureInfoButtonActive) {
                    updateIsZoomInButtonActive(false);
                }
            },
            "ZoomOut": () => {
                updateIsHomeButtonActive(false);
                updateIsZoomInButtonActive(false);
                updateIsZoomOutButtonActive(true);
                updateIsPrevExtendButtonActive(false);
                updateIsNextExtendButtonActive(false);
                updateIsLayerSwitcherButtonActive(false);
                updateIsS100ProductFeaturesButtonActive(false);
                updateIsAttributeQueryButtonActive(false);
                updateIsBaseMapwindowVisible(false);
                updateIsMeasureAreaWindowVisible(false);
                removeZoomWindowFunctionality(olMap);
                updateLayerSwitcherSideBarPanel(false);
                updateS100ProductFeaturesSideBarPanel(false);
                updateS124NavWarningOverLayVisible(false);
                updateDepthFilterPopUpContainer(false);
                //updates124NavWarningsSideBarPanel(false);
                updateZoomWindowButtonActive(false);
                if (isFeatureInfoButtonActive) {
                    updateIsZoomOutButtonActive(false);
                }
            },
            "Home": () => {
                updateIsHomeButtonActive(true);
                updateIsZoomInButtonActive(false);
                updateIsZoomOutButtonActive(false);
                updateIsPrevExtendButtonActive(false);
                updateIsNextExtendButtonActive(false);
                updateIsFeatureInfoButtonActive(false);
                updateIsProductFilterButtonActive(false);
                updateIsS124NavWarnButtonActive(false);
                updateIsLayerSwitcherButtonActive(false);
                updateIsS100ProductFeaturesButtonActive(false);
                updateIsAttributeQueryButtonActive(false);
                updateZoomWindowButtonActive(false);
                updateS124NavWarningOverLayVisible(false);
                updateDepthFilterPopUpContainer(false);

                unregisterFeatureInfoClickHandlers("Home", olMap);
                stopDrawAction();
                updateIsBaseMapwindowVisible(false);
                updateIsMeasureAreaWindowVisible(false);
                updateFeatureInfoFlag(false);
                removeZoomWindowFunctionality(olMap);
                updateFeatureInfoSideBarPanel(false);
                updateS100ProductFeaturesSideBarPanel(false);
                updateLayerSwitcherSideBarPanel(false);
                updates124NavWarningsSideBarPanel(false);
                updateZoomWindowButtonActive(false);
                clearAttributeQueryValues();
            },
            "PreviousExtend": () => {
                updateIsHomeButtonActive(false);
                updateIsZoomInButtonActive(false);
                updateIsZoomOutButtonActive(false);
                updateIsPrevExtendButtonActive(true);
                updateIsNextExtendButtonActive(false);
                updateIsFeatureInfoButtonActive(false);
                updateIsLayerSwitcherButtonActive(false);
                updateIsS100ProductFeaturesButtonActive(false);
                updateIsAttributeQueryButtonActive(false);
                updateZoomWindowButtonActive(false);
                updateS124NavWarningOverLayVisible(false);
                updateDepthFilterPopUpContainer(false);

                unregisterFeatureInfoClickHandlers("previousExtend", olMap);
                stopDrawAction();
                updateIsBaseMapwindowVisible(false);
                updateIsMeasureAreaWindowVisible(false);
                updateFeatureInfoFlag(false);
                removeZoomWindowFunctionality(olMap);
                updateFeatureInfoSideBarPanel(false);
                updateS100ProductFeaturesSideBarPanel(false);
                updateLayerSwitcherSideBarPanel(false);
                updates124NavWarningsSideBarPanel(false);
                clearAttributeQueryValues();
                bottomTablePanelDisabled();
            },
            "NextExtend": () => {
                updateIsHomeButtonActive(false);
                updateIsZoomInButtonActive(false);
                updateIsZoomOutButtonActive(false);
                updateIsPrevExtendButtonActive(false);
                updateIsNextExtendButtonActive(true);
                updateIsFeatureInfoButtonActive(false);
                updateIsLayerSwitcherButtonActive(false);
                updateIsS100ProductFeaturesButtonActive(false);
                updateIsAttributeQueryButtonActive(false);
                updateZoomWindowButtonActive(false);
                updateS124NavWarningOverLayVisible(false);
                updateDepthFilterPopUpContainer(false);

                unregisterFeatureInfoClickHandlers("NextExtend", olMap);
                stopDrawAction();
                updateIsBaseMapwindowVisible(false);
                updateIsMeasureAreaWindowVisible(false);
                updateFeatureInfoFlag(false);
                removeZoomWindowFunctionality(olMap);
                updateFeatureInfoSideBarPanel(false);
                updateS100ProductFeaturesSideBarPanel(false);
                updateLayerSwitcherSideBarPanel(false);
                updates124NavWarningsSideBarPanel(false);
                clearAttributeQueryValues();
                bottomTablePanelDisabled();
            },
            "ZoomWindow": () => {
                updateIsHomeButtonActive(false);
                updateIsZoomInButtonActive(false);
                updateIsZoomOutButtonActive(false);
                updateIsPrevExtendButtonActive(false);
                updateIsNextExtendButtonActive(false);
                updateIsFeatureInfoButtonActive(false);
                updateIsProductFilterButtonActive(false);
                updateIsS124NavWarnButtonActive(false);
                updateIsLayerSwitcherButtonActive(false);
                updateIsS100ProductFeaturesButtonActive(false);
                updateIsAttributeQueryButtonActive(false);
                updateS124NavWarningOverLayVisible(false);
                updateDepthFilterPopUpContainer(false);

                unregisterFeatureInfoClickHandlers("ZoomWindow", olMap);
                stopDrawAction();
                updateIsBaseMapwindowVisible(false);
                updateIsMeasureAreaWindowVisible(false);
                updateFeatureInfoFlag(false);
                updateFeatureInfoSideBarPanel(false);
                updateS100ProductFeaturesSideBarPanel(false);
                updateLayerSwitcherSideBarPanel(false);
                updates124NavWarningsSideBarPanel(false);
                clearAttributeQueryValues();
                bottomTablePanelDisabled();
                updateProductFilterSideBarPanel(false);
            },
            "BaseMaps": () => {
                updateIsHomeButtonActive(false);
                updateIsZoomInButtonActive(false);
                updateIsZoomOutButtonActive(false);
                updateIsPrevExtendButtonActive(false);
                updateIsNextExtendButtonActive(false);
                updateIsFeatureInfoButtonActive(false);
                updateIsProductFilterButtonActive(false);
                updateIsS124NavWarnButtonActive(false);
                updateIsLayerSwitcherButtonActive(false);
                updateIsS100ProductFeaturesButtonActive(false);
                updateIsAttributeQueryButtonActive(false);
                updateS124NavWarningOverLayVisible(false);
                updateDepthFilterPopUpContainer(false);

                updateFeatureInfoSideBarPanel(false);
                updateS100ProductFeaturesSideBarPanel(false);
                updateLayerSwitcherSideBarPanel(false);
                unregisterFeatureInfoClickHandlers("BaseMaps", olMap);
                stopDrawAction();
                setTimeout(() => {
                    updateIsBaseMapwindowVisible(true);
                }, 200);
                updateIsMeasureAreaWindowVisible(false);
                updateFeatureInfoFlag(false);
                removeZoomWindowFunctionality(olMap);
                updateZoomWindowBtnFlag(false);
                updateZoomWindowButtonActive(false);
                updates124NavWarningsSideBarPanel(false);
                clearAttributeQueryValues();
                bottomTablePanelDisabled();
                updateProductFilterSideBarPanel(false);
                updateAttributeQueryOverLayVisible(false);
                updateS124NavWarningOverLayVisible(false);
            },
            "FeatureInfo": () => {
                updateMapClickFeaturesGeometry([]);
                updateFeatureInfoRecords([]);
                updateMapClickFeatureInfoLayerName(null)
                updateAttributeQueryOverLayVisible(false);
                updateS124NavWarningOverLayVisible(false);
                updateRegularOverLayVisible(false);
                updateS124listvalue('');
                updateIsHomeButtonActive(false);
                updateIsZoomInButtonActive(false);
                updateIsZoomOutButtonActive(false);
                updateIsPrevExtendButtonActive(false);
                updateIsNextExtendButtonActive(false);
                updateIsFeatureInfoButtonActive(true);
                updateIsProductFilterButtonActive(false);
                updateIsS124NavWarnButtonActive(false);
                updateIsLayerSwitcherButtonActive(false);
                updateIsS100ProductFeaturesButtonActive(false);
                updateIsAttributeQueryButtonActive(false);
                updateZoomWindowButtonActive(false);
                updateDepthFilterPopUpContainer(false);


                updateIsBaseMapwindowVisible(false);
                updateIsMeasureAreaWindowVisible(false);
                removeZoomWindowFunctionality(olMap);
                stopDrawAction();
                updateLayerSwitcherSideBarPanel(false);
                updateFeatureInfoSideBarPanel(true);
                updateS100ProductFeaturesSideBarPanel(false);
                updates124NavWarningsSideBarPanel(false);
                clearAttributeQueryValues();
                updateCollapsedQueryResultPanel(true);
                updateAttributeQueryBottomTablePanelVisible(false);
                updateProductFilterBottomTablePanelvisible(true);
                updateProductFilterSideBarPanel(false);
            },
            "LayerSwitcher": () => {
                updateIsAttributeQueryButtonActive(false);
                updateIsHomeButtonActive(false);
                updateIsZoomInButtonActive(false);
                updateIsZoomOutButtonActive(false);
                updateIsPrevExtendButtonActive(false);
                updateIsNextExtendButtonActive(false);
                updateIsFeatureInfoButtonActive(false);
                updateIsProductFilterButtonActive(false);
                updateIsS124NavWarnButtonActive(false);
                updateIsS100ProductFeaturesButtonActive(false);
                updateS100ProductFeaturesSideBarPanel(false);
                updateZoomWindowButtonActive(false);
                updateS124NavWarningOverLayVisible(false);
                updateLayerSwitcherSideBarPanel(true);
                updateIsBaseMapwindowVisible(false);
                updateIsMeasureAreaWindowVisible(false);
                updateIsLayerSwitcherButtonActive(true);
                unregisterFeatureInfoClickHandlers("layerSwitcher", olMap);
                stopDrawAction();
                updateFeatureInfoFlag(false);
                removeZoomWindowFunctionality(olMap);
                updateProductFilterSideBarPanel(false);
                updates124NavWarningsSideBarPanel(false);
                updateAttributeQueryOverLayVisible(false);
                updateS124NavWarningOverLayVisible(false);
                updateDepthFilterPopUpContainer(false);
                clearAttributeQueryValues();
            },
            "S100ProductFeatures": () => {
                updateIsHomeButtonActive(false);
                updateIsZoomInButtonActive(false);
                updateIsZoomOutButtonActive(false);
                updateIsPrevExtendButtonActive(false);
                updateIsNextExtendButtonActive(false);
                updateIsFeatureInfoButtonActive(false);
                updateIsProductFilterButtonActive(false);
                updateIsS124NavWarnButtonActive(false);
                updateIsLayerSwitcherButtonActive(false);
                updateIsS100ProductFeaturesButtonActive(true);
                updateS100ProductFeaturesSideBarPanel(true);
                updateIsAttributeQueryButtonActive(false);
                updateZoomWindowButtonActive(false);
                updateS124NavWarningOverLayVisible(false);
                updateDepthFilterPopUpContainer(false);


                updateLayerSwitcherSideBarPanel(false);
                updateIsBaseMapwindowVisible(false);
                updateIsMeasureAreaWindowVisible(false);
                unregisterFeatureInfoClickHandlers("other", olMap);
                stopDrawAction();
                updateFeatureInfoFlag(false);
                removeZoomWindowFunctionality(olMap);
                updateProductFilterSideBarPanel(false);
                updates124NavWarningsSideBarPanel(false);
            },
            "S124NavigationalWarnings": () => {
                updateIsHomeButtonActive(false);
                updateIsZoomInButtonActive(false);
                updateIsZoomOutButtonActive(false);
                updateIsPrevExtendButtonActive(false);
                updateIsNextExtendButtonActive(false);
                updateIsFeatureInfoButtonActive(false);
                updateIsProductFilterButtonActive(false);
                updateIsS124NavWarnButtonActive(true);
                updateIsLayerSwitcherButtonActive(false);
                updateIsS100ProductFeaturesButtonActive(false);
                updateIsAttributeQueryButtonActive(false);
                clearAttributeQueryValues();
                updateZoomWindowButtonActive(false);
                updateIsBaseMapwindowVisible(false);
                updateIsMeasureAreaWindowVisible(false);
                removeZoomWindowFunctionality(olMap);
                unregisterFeatureInfoClickHandlers("S124NavigationalWarnings", olMap);
                stopDrawAction();
                updateLayerSwitcherSideBarPanel(false);
                updateFeatureInfoSideBarPanel(false);
                updateS100ProductFeaturesSideBarPanel(false);
                updates124NavWarningsSideBarPanel(true);
                updateAttributeQueryOverLayVisible(false);
                updateS124NavWarningOverLayVisible(false);
                updateRegularOverLayVisible(false);
                updateDepthFilterPopUpContainer(false);
                //updateS124edit(false);
            },
            "productFilter": () => {
                updateIsHomeButtonActive(false);
                updateIsZoomInButtonActive(false);
                updateIsZoomOutButtonActive(false);
                updateIsPrevExtendButtonActive(false);
                updateIsNextExtendButtonActive(false);
                updateIsFeatureInfoButtonActive(false);
                updateIsProductFilterButtonActive(true);
                updateIsS124NavWarnButtonActive(false);
                updateIsLayerSwitcherButtonActive(false);
                updateIsS100ProductFeaturesButtonActive(false);
                updateIsAttributeQueryButtonActive(false);
                updateZoomWindowButtonActive(false);
                updateS124NavWarningOverLayVisible(false);
                updateDepthFilterPopUpContainer(false);

                unregisterFeatureInfoClickHandlers("productFilter", olMap);
                stopDrawAction();
                updateIsBaseMapwindowVisible(false);
                updateIsMeasureAreaWindowVisible(false);
                updateFeatureInfoFlag(false);
                removeZoomWindowFunctionality(olMap);
                updateFeatureInfoSideBarPanel(false);
                updateS100ProductFeaturesSideBarPanel(false);
                updateLayerSwitcherSideBarPanel(false);
                clearAttributeQueryValues();
                updateProductFilterSideBarPanel(true);
                updateAttributeQueryBottomTablePanelVisible(false);
                updates124NavWarningsSideBarPanel(false);
            },
            "attributeQuery": () => {
                updateIsHomeButtonActive(false);
                updateIsZoomInButtonActive(false);
                updateIsZoomOutButtonActive(false);
                updateIsPrevExtendButtonActive(false);
                updateIsNextExtendButtonActive(false);
                updateIsFeatureInfoButtonActive(false);
                updateIsProductFilterButtonActive(false);
                updateIsS124NavWarnButtonActive(false);
                updateIsLayerSwitcherButtonActive(false);
                updateIsS100ProductFeaturesButtonActive(false);
                updateIsAttributeQueryButtonActive(true);
                updateZoomWindowButtonActive(false);
                updateDepthFilterPopUpContainer(false);

                unregisterFeatureInfoClickHandlers("attributeQuery", olMap);
                stopDrawAction();
                updateIsBaseMapwindowVisible(false);
                updateIsMeasureAreaWindowVisible(false);
                updateFeatureInfoFlag(false);
                removeZoomWindowFunctionality(olMap);
                updateFeatureInfoSideBarPanel(false);
                updateS100ProductFeaturesSideBarPanel(false);
                updateLayerSwitcherSideBarPanel(false);
                updates124NavWarningsSideBarPanel(false);
                updateAttributeQueryPanelVisible(true);
                updateProductFilterBottomTablePanelvisible(false);
                updateProductFilterSideBarPanel(false);
                if (attributeQueryPanelVisible && mapOverlay) {
                    olMap.addOverlay(mapOverlay);
                }
                updateAttributeQueryOverLayVisible(false);
                updateS124NavWarningOverLayVisible(false);
                updateRegularOverLayVisible(false);
                updateS124edit(false);
            },
            "Measure": () => {
                updateIsHomeButtonActive(false);
                updateIsZoomInButtonActive(false);
                updateIsZoomOutButtonActive(false);
                updateIsPrevExtendButtonActive(false);
                updateIsNextExtendButtonActive(false);
                updateIsFeatureInfoButtonActive(false);
                updateIsProductFilterButtonActive(false);
                updateIsS124NavWarnButtonActive(false);
                updateIsLayerSwitcherButtonActive(false);
                updateIsS100ProductFeaturesButtonActive(false);
                updateIsAttributeQueryButtonActive(false);
                updateZoomWindowButtonActive(false);
                updateS124NavWarningOverLayVisible(false);
                updateDepthFilterPopUpContainer(false);

                updateFeatureInfoSideBarPanel(false);
                updateS100ProductFeaturesSideBarPanel(false);
                updateLayerSwitcherSideBarPanel(false);
                unregisterFeatureInfoClickHandlers("Measure", olMap);
                stopDrawAction();
                updateIsBaseMapwindowVisible(false);
                setTimeout(() => {
                    updateIsMeasureAreaWindowVisible(true);
                }, 200);
                updateFeatureInfoFlag(false);
                removeZoomWindowFunctionality(olMap);
                updates124NavWarningsSideBarPanel(false);
                clearAttributeQueryValues();
                bottomTablePanelDisabled();
                updateProductFilterSideBarPanel(false);
                updateAttributeQueryBottomTablePanelVisible(false);
                updateProductFilterBottomTablePanelvisible(false);
                updateAttributeQueryOverLayVisible(false);
                updateS124NavWarningOverLayVisible(false);
            },
            "Cart": () => {
                updateIsHomeButtonActive(false);
                updateIsZoomInButtonActive(false);
                updateIsZoomOutButtonActive(false);
                updateIsPrevExtendButtonActive(false);
                updateIsNextExtendButtonActive(false);
                updateIsFeatureInfoButtonActive(false);
                updateIsProductFilterButtonActive(false);
                updateIsS124NavWarnButtonActive(false);
                updateIsLayerSwitcherButtonActive(false);
                updateIsS100ProductFeaturesButtonActive(false);
                updateIsAttributeQueryButtonActive(false);
                updateZoomWindowButtonActive(false);
                updateS124NavWarningOverLayVisible(false);
                updateDepthFilterPopUpContainer(false);

                updateFeatureInfoSideBarPanel(false);
                updateS100ProductFeaturesSideBarPanel(false);
                updateLayerSwitcherSideBarPanel(false);
                unregisterFeatureInfoClickHandlers("Cart", olMap);
                stopDrawAction();
                updateIsBaseMapwindowVisible(false);
                updateIsMeasureAreaWindowVisible(false);
                updateFeatureInfoFlag(false);
                removeZoomWindowFunctionality(olMap);
                clearAttributeQueryValues();
            },

            "DepthFilter": () => {
                updateDepthFilterPopUpContainer(true);
                updateIsHomeButtonActive(false);
                updateIsZoomInButtonActive(false);
                updateIsZoomOutButtonActive(false);
                updateIsPrevExtendButtonActive(false);
                updateIsNextExtendButtonActive(false);
                updateIsFeatureInfoButtonActive(false);
                updateIsProductFilterButtonActive(false);
                updateIsS124NavWarnButtonActive(false);
                updateIsLayerSwitcherButtonActive(false);
                updateIsS100ProductFeaturesButtonActive(false);
                updateIsAttributeQueryButtonActive(false);
                updateZoomWindowButtonActive(false);

                unregisterFeatureInfoClickHandlers("DepthFilter", olMap);
                stopDrawAction();
                updateIsBaseMapwindowVisible(false);
                updateIsMeasureAreaWindowVisible(false);
                updateFeatureInfoFlag(false);
                removeZoomWindowFunctionality(olMap);
                updateFeatureInfoSideBarPanel(false);
                updateS100ProductFeaturesSideBarPanel(false);
                updateLayerSwitcherSideBarPanel(false);
                updates124NavWarningsSideBarPanel(false);
                clearAttributeQueryValues();
                bottomTablePanelDisabled();
                updateProductFilterSideBarPanel(false);
                updateAttributeQueryBottomTablePanelVisible(false);
                updateProductFilterBottomTablePanelvisible(false);
                updateAttributeQueryOverLayVisible(false);
                updateS124NavWarningOverLayVisible(false);
                updateRegularOverLayVisible(false);
            },

            "default": () => {
                updateDepthFilterPopUpContainer(false);
                updateIsHomeButtonActive(false);
                updateIsZoomInButtonActive(false);
                updateIsZoomOutButtonActive(false);
                updateIsPrevExtendButtonActive(false);
                updateIsNextExtendButtonActive(false);
                updateIsFeatureInfoButtonActive(false);
                updateIsProductFilterButtonActive(false);
                updateIsS124NavWarnButtonActive(false);
                updateIsLayerSwitcherButtonActive(false);
                updateIsS100ProductFeaturesButtonActive(false);
                updateIsAttributeQueryButtonActive(false);
                updateZoomWindowButtonActive(false);

                unregisterFeatureInfoClickHandlers("other", olMap);
                stopDrawAction();
                updateIsBaseMapwindowVisible(false);
                updateIsMeasureAreaWindowVisible(false);
                updateFeatureInfoFlag(false);
                removeZoomWindowFunctionality(olMap);
                updateFeatureInfoSideBarPanel(false);
                updateS100ProductFeaturesSideBarPanel(false);
                updateLayerSwitcherSideBarPanel(false);
                updates124NavWarningsSideBarPanel(false);
                clearAttributeQueryValues();
                bottomTablePanelDisabled();
                updateProductFilterSideBarPanel(false);
                updateAttributeQueryBottomTablePanelVisible(false);
                updateProductFilterBottomTablePanelvisible(false);
                updateAttributeQueryOverLayVisible(false);
                updateS124NavWarningOverLayVisible(false);
                updateRegularOverLayVisible(false);
            }
        };

        (componentActions[component] || componentActions["default"])();
    };

    const clearAttributeQueryValues = () => {
        updateAttributeQueryPanelVisible(false);

        if (attributeQueryPanelVisible == false) {
            olMap.removeOverlay(mapOverlay);
        }
        if (typeaheadRef.current) {
            typeaheadRef.current.clear();
        }
        clearFeatureSearchResults();
        updateAttributeQuerySelectedLayer('')
    }

    const bottomTablePanelDisabled = () => {
        updateCollapsedQueryResultPanel(false);
        updateAttributeQueryBottomTablePanelVisible(false);
        updateProductFilterBottomTablePanelvisible(false);
    }

    const checkingLayerAddedToMap = () => {
        if (!olMap) {
            return false;
        }
        const layersList = olMap.getLayers().getArray();
        for (let i = 0; i < layersList.length; i++) {
            const layer = layersList[i];
            if (layer.get('title') === S124NavWarningGroupLayer) {
                return true;
            }
        }
        return false;
    }

    const [selectedNavigationWarningType, setSelectedNavigationWarningType] = useState('');

    const updateSelectedNavigationWarningType = (value) => {
        setSelectedNavigationWarningType(value);
    }

    const [selectedMessageType, setSelectedMessageType] = useState('');

    const updateSelectedMessageType = (value) => {
        setSelectedMessageType(value);
    }

    const [selectedOption, setSelectedOption] = useState('select');

    const updateSelectedOption = (value) => {
        setSelectedOption(value);
    }

    const [s124V2activeKey, setS124V2activeKey] = useState('');

    const updateS124V2activeKey = (value) => {
        setS124V2activeKey(value);
    }

    const [s124WarningTypes, setS124WarningTypes] = useState([]);
    const [s124MessageTypes, setS124MessageTypes] = useState([]);
    const [s124warningNumbers, setS124warningNumbers] = useState([]);
    const [s124Years, setS124Years] = useState([]);

    const [s124FeatureDeleteFlag, setS124FeatureDeleteFlag] = useState(false);

    const updateS124FeatureDeleteFlag = (value) => {
        setS124FeatureDeleteFlag(value);
    }

    const [s124FilterIsLoading, setIsLoading] = useState(false);

    const [selectedFormOption, setSelectedFormOption] = useState(false);

    const updateSelectedFormOption = (value) => {
        setSelectedFormOption(value)
    }

    const getWarnings = async () => {
        setIsLoading(true);
        const apiResponse = await axios.get(`${S124NavigationalwarningsAPIs.productFilter_WarningTypes}`);
        if (apiResponse?.data) {
            const apiWarningType = apiResponse?.data;
            setS124WarningTypes(apiWarningType);
            setIsLoading(false);
        } else {
            setS124WarningTypes([]);
            setIsLoading(false);
        }
    }

    const getWarningNumbers = async () => {
        setIsLoading(true);
        const apiResponse = await axios.get(`${S124NavigationalwarningsAPIs.productFilter_WarningNumbers}`);
        if (apiResponse?.data) {
            const apiWarningNumbers = apiResponse?.data;
            setS124warningNumbers(apiWarningNumbers)
            setIsLoading(false);
        } else {
            setS124warningNumbers([]);
            setIsLoading(false);
        }
    }

    const getYears = async () => {
        setIsLoading(true);
        const apiResponse = await axios.get(`${S124NavigationalwarningsAPIs.productFilter_Years}`);
        if (apiResponse?.data) {
            const apiYears = apiResponse?.data;
            setS124Years(apiYears)
            setIsLoading(false);
        } else {
            setS124Years([]);
            setIsLoading(false);
        }
    }

    const getMessageTypes = async () => {
        setIsLoading(true);
        const apiResponse = await axios.get(`${S124NavigationalwarningsAPIs.productFilter_MessageTypes}`);
        if (apiResponse?.data) {
            const apiMessageType = apiResponse?.data;
            setS124MessageTypes(apiMessageType);
            setIsLoading(false);
        } else {
            setS124MessageTypes([]);
            setIsLoading(false);
        }
    }

    return (
        <>
            <UtilityContext.Provider value={{
                isBaseMapWindowVisible, updateIsBaseMapwindowVisible,
                isMeasureAreaWindowVisible, updateIsMeasureAreaWindowVisible, dragBoxRef,
                registerFeatureInfoClickHandler, unregisterFeatureInfoClickHandlers,
                featureInfoFlag, updateFeatureInfoFlag, toggleComponent, zoomWindowBtnFlag,
                zoomWindowButtonActive, updateZoomWindowBtnFlag, updateZoomWindowButtonActive,
                removeZoomWindowFunctionality, featureInfoSideBarPanel, updateFeatureInfoSideBarPanel,
                layerSwitcherSideBarPanel, updateLayerSwitcherSideBarPanel,
                attributeQueryPanelVisible, updateAttributeQueryPanelVisible,
                attributeQuerySelectedLayer, updateAttributeQuerySelectedLayer,
                featureSearchResults, updateFeatureSearchResults, clearFeatureSearchResults,
                searchInputloading, updateSearchInputloading, typeaheadRef, updateSelectedAttributeQueryOption,
                selectedAttributeQueryOption, collapsedQueryResultPanel, updateCollapsedQueryResultPanel,
                attributeQueryBottomTablePanelVisible, updateAttributeQueryBottomTablePanelVisible,
                ActivewarnlistBottomTablePanelVisible, updateActivewarnlistBottomTableVisible,
                activeKey, updates124activekey, updateS124NavWarningDataSetFileIdentifier, s124NavWarningDataSetFileIdentifier,
                s100ProductFeaturesSideBarPanel, updateS100ProductFeaturesSideBarPanel, isS100ProductFeaturesButtonActive, updateIsS100ProductFeaturesButtonActive,
                productFilterBottomTablePanelVisible, updateProductFilterBottomTablePanelvisible, logoFlag, updateLogoFlagValue,
                productFilterSideBarPanel, updateProductFilterSideBarPanel, updates124NavWarningsSideBarPanel, s124NavWarningsSideBarPanel,
                updateFeatureInfoRecords, featureInfoRecords, s124listvalue, updateS124listvalue, checkingLayerAddedToMap, updateS124edit, s124edit,
                isHomeButtonActive, isZoomInButtonActive, isZoomOutButtonActive, isPrevExtendButtonActive, isNextExtendButtonActive,
                isFeatureInfoButtonActive, isProductFilterButtonActive, isS124NavWarnButtonActive, isLayerSwitcherButtonActive,
                isAttributeQueryButtonActive, updateMapClickFeaturesGeometry, mapClickfeaturesGeometry, updateMapClickFeatureInfoLayerName,
                mapClickFeatureInfoLayerName, updateProductFilteredNavWarnings, productfilteredNavWarnings,
                updateS124NavWarnSearchFilterTitle, s124NavWarnSearchFilterTitle, updateS124NavWarnSearchFilterNoResultFound, s124NavWarnSearchFilterNoResultFound,
                updateClearWarningsFilter, clearWarningsfilter, updateSelectedNavigationWarningType, selectedNavigationWarningType,
                updateSelectedMessageType, selectedMessageType, selectedOption, updateSelectedOption, updateS124V2activeKey, s124V2activeKey,
                s124WarningTypes, s124MessageTypes, s124warningNumbers, s124Years, getWarnings, getWarningNumbers, getYears, getMessageTypes,
                s124FilterIsLoading, updateSelectedFormOption, selectedFormOption, updateS124FeatureDeleteFlag, s124FeatureDeleteFlag, updateIsS124NavWarnButtonActive,
                updateIsAttributeQueryButtonActive, showDepthFilterPopUpContainer

            }}>
                {children}
            </UtilityContext.Provider>
        </>
    )
};

