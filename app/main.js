//main.js 
import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/xyz'; //加载离线
import OSM from 'ol/source/osm' 
import SourceVector from 'ol/source/Vector'
import LayerVector from 'ol/layer/Vector'
import Draw from 'ol/interaction/draw'

var raster = new TileLayer({
    source: new OSM()
});

var source = new SourceVector({
    wrapX: false
});

var vector = new LayerVector({
    source: source
});

var map = new Map({
    layers: [raster, vector],
    target: 'map',
    view: new View({
        center: [-11000000, 4600000],
        zoom: 4
    })
});

var typeSelect = document.getElementById('type');

var draw; // global so we can remove it later
function addInteraction() {
    var value = typeSelect.value;
    if (value !== 'None') {
        draw = new Draw({
            source: source,
            type: typeSelect.value
        });
        map.addInteraction(draw);
    }
}


/**
 * Handle change event.
 */
typeSelect.onchange = function () {
    map.removeInteraction(draw);
    addInteraction();
};

addInteraction();