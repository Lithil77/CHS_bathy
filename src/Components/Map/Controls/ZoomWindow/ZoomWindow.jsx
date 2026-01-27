import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyledMapControlButton } from '../../../Reusable/StyledComponent';
import { OLMapContext } from '../../../../Contexts/OlMapContext';
import DragBox from 'ol/interaction/DragBox';
import { TbZoomPan } from "react-icons/tb";
import './ZoomWindow.css';
import { useUtility } from '../../../../Contexts/UtilityContext';

function ZoomWindow() {

    const [title] = useState('ZoomWindow');
    const { olMap } = useContext(OLMapContext);
    const { toggleComponent, dragBoxRef, updateZoomWindowButtonActive, zoomWindowButtonActive, zoomWindowBtnFlag,
        removeZoomWindowFunctionality, updateZoomWindowBtnFlag } = useUtility();

    useEffect(() => {
        var zoomWindowButtonList = document.getElementById('zoomWindowButtonList');
        const zoomWindowContainer = document.getElementById('zoomWindowContainer');

        if (zoomWindowButtonList && zoomWindowContainer != null) {
            if (!zoomWindowButtonList.contains(zoomWindowContainer)) {
                zoomWindowButtonList.append(zoomWindowContainer);
            }
        }
    }, []);

    const handleZoomWindow = () => {
        if (zoomWindowBtnFlag) {
            toggleComponent(title, olMap);
            zoomWindowFunctionality();
            updateZoomWindowBtnFlag(false);
            updateZoomWindowButtonActive(true);
        }
        else {
            removeZoomWindowFunctionality(olMap);
            updateZoomWindowBtnFlag(true);
            updateZoomWindowButtonActive(false);
            var buttons = document.querySelectorAll('.ZoomextentBtn');
            buttons.forEach(function (button) {
                button.classList.remove('active');
            });
        }
    }

    const zoomWindowFunctionality = () => {
        const dragBox = new DragBox({
            condition: function (event) {
                return event.type === 'pointerdown';
            },
            style: {
                stroke: {
                    color: 'rgba(0, 0, 255, 1)',
                },
                fill: {
                    color: 'rgba(0, 0, 255, 0.1)',
                },
            },
        });

        olMap.addInteraction(dragBox);
        dragBoxRef.current = dragBox;

        dragBox.on('boxend', function () {
            const extent = dragBox.getGeometry().getExtent();
            olMap.getView().fit(extent, { duration: 1000 });
        });
    }

    return (
        <div id='zoomWindowContainer' style={{ position: "relative" }}>
            <StyledMapControlButton title={title} id={title}
                active={zoomWindowButtonActive} className={`p-1 mb-1 drawBtn ${zoomWindowButtonActive ? 'active' : ''}`}
                onClick={handleZoomWindow}
            >
                <TbZoomPan style={{ width: '24px', height: '24px', position: 'relative', bottom: '3px' }} />
            </StyledMapControlButton>
        </div>
    )
}

export default ZoomWindow;