import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { NodeService } from '../node.service';
import { Node } from '../node/Node';
import { Line } from '../line/linha';
import { Path } from '../path/path';
import { LineService } from '../line.service';
import { PathService } from '../path.service';
import { PathNode } from '../path/pathNode';
import * as THREE from 'three';
import * as Threebox from './threebox-master/src/Threebox';
import { CubeReflectionMapping } from 'three';
import * as dat from 'dat.gui';
import $ from "jquery";
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 41.1786221;
  lng = -8.6087417;

  nodesArray: Node[];
  linesArray: Line[];
  nodesTemps: any;
  pathsArray: Path[];
  coordsT: number[][];
  nodepopup: any;
  geojson: any;

  constructor(
    private nodeService: NodeService,
    private lineService: LineService,
    private pathService: PathService
  ) { }

  ngOnInit() {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(
      environment.mapbox.accessToken
    );
    this.nodepopup = false;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat],
    });
    this.nodesTemps = [];
    this.setArrayPaths();
    this.setArrayNodes();

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
  }

  setMarkers() {
    const marker = new mapboxgl.Marker({ color: '#b40219', scale: 0.7 })
      .setLngLat([-8.6087417, 41.1786221])
      .setPopup(
        new mapboxgl.Popup({ offset: 1 }).setText(
          'Instituto Superior de Engenharia do Porto'
        )
      )
      .addTo(this.map);
    for (var i = 0; i < this.nodesArray.length; i++) {
      new mapboxgl.Marker({ color: 'orange', scale: 0.7 })
        .setLngLat([
          this.nodesArray[i].longitude,
          this.nodesArray[i].latitude,
        ])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setText(
            this.nodesArray[i].name +
            ' Lat: ' +
            this.nodesArray[i].latitude +
            '   Lon: ' +
            this.nodesArray[i].longitude
          )
        )
        .addTo(this.map);
    }
  }

  setArrayLines() {
    this.lineService.getLines().subscribe((lines) => {
      this.linesArray = lines;
      this.setLines();
    });
  }

  setArrayPaths() {
    this.pathService.getAllPaths().subscribe((paths) => {
      this.pathsArray = paths;
    });
  }


  setArrayNodes() {
    this.nodeService.getNodes().subscribe((nos) => {
      this.nodesArray = nos;
      this.addNodes();
      class PitchToggle {
        _bearing: number;
        _pitch: number;
        _minpitchzoom: any;
        _map: any;
        _btn: HTMLButtonElement;
        _btnP: HTMLButtonElement;
        _zoom: any;
        _container: HTMLDivElement;
        _containerP: HTMLDivElement;
        _switch: boolean;
        personToggle: any;
        nodesTemps: any;
        gui: any;
        count: any;
        modelRelief = '../assets/SignWithBus/SignWithBus2.gltf';
        modelDepoit = '../assets/BlueStop/BlueModel1.gltf';
        modelDefault = '../assets/BusModel/BusModel1.gltf';
        modelDefault2 = '../assets/BusSign/bussign1.gltf';
        nodesArray: any;
        customContainer: any;
        hour: number;
        date: Date;

        constructor({ bearing = -20, pitch = 70, minpitchzoom = null }, nodearray: Node[], nodesTemps: any) {
          this._bearing = bearing;
          this._pitch = pitch;
          this._minpitchzoom = minpitchzoom;
          this._switch = true;
          this.nodesArray = nodearray;
          this.nodesTemps = nodesTemps;
        }

        build3DModel() {
          let tb: Threebox;
          let nodesArray = this.nodesArray;
          let modelDepoit = this.modelDepoit;
          let modelRelief = this.modelRelief;
          let modelDefault = this.modelDefault;
          let modelDefault2 = this.modelDefault2;
          let map = this._map;
          let _this = this;

          map.addLayer({
            id: '3dmodels',
            type: 'custom',
            renderingMode: '3d',
            onAdd: function (map, mbxContext) {

              tb = new Threebox(
                map,
                mbxContext,
                {
                  defaultLights: false,
                  passiveRendering: false,
                  realSunlight: true,
                  realSunlightHelper: true
                }
              );

              const date = new Date(2020, 7, 14, 12, 30);

              var hours = new function () {
                this.hour = date.getHours();
              }

              let coords = tb.mapCenter

              tb.setSunlight(date, coords);

              class ColorGUIHelper {
                object: any;
                prop: any;
                constructor(object, prop) {
                  this.object = object;
                  this.prop = prop;
                }
                get value() {
                  return `#${this.object[this.prop].getHexString()}`;
                }
                set value(hexString) {
                  this.object[this.prop].set(hexString);
                }
              }

              function makeXYZGUI(gui, vector3, name, onChangeFn) {
                const folder = gui.addFolder(name);
                folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
                folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
                folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
                folder.open();
              }

              _this.gui = new dat.GUI({ autoPlace: false });

              var directionalLight = new THREE.DirectionalLight(0xffffff);
              directionalLight.position.set(0, 0, 0).normalize();
              directionalLight.castShadow = true;
              tb.add(directionalLight);
              tb.add(directionalLight.target);

              const light = new THREE.AmbientLight(0x333333);
              tb.add(light);

              function updateHours() {
                date.setHours(hours.hour);
                tb.setSunlight(date, coords);
                tb.update();
              }

              function updateLight() {
                tb.update();
                directionalLight.target.updateMatrixWorld();
              }


              _this.customContainer.appendChild(_this.gui.domElement);
              _this.gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
              _this.gui.add(light, 'intensity', 0, 2, 0.01);
              makeXYZGUI(_this.gui, directionalLight.position, 'position', updateLight);
              makeXYZGUI(_this.gui, directionalLight.target.position, 'target', updateLight);
              _this.gui.add(directionalLight, 'intensity', 0, 2, 0.01);
              _this.gui.add(hours, 'hour', 0, 24, 0.5).onChange(updateHours);
              $(_this.gui.domElement).attr("hidden", false);

              for (let node of nodesArray) {
                var options;
                if (node.isDepot === true && node.isReliefPoint === false) {
                  options = {
                    obj: modelDepoit,
                    type: 'gltf',
                    scale: 0.1,
                    rotation: { x: 90, y: 0, z: 0 }
                  }
                } else if (node.isDepot === false && node.isReliefPoint === true) {
                  options = {
                    obj: modelRelief,
                    type: 'gltf',
                    scale: 0.05,
                    rotation: { x: 90, y: 0, z: 0 }
                  }
                } else if (node.isDepot === false && node.isReliefPoint === false) {
                  options = {
                    obj: modelDefault,
                    type: 'gltf',
                    scale: 0.1,
                    rotation: { x: 90, y: 0, z: 0 }
                  }
                } else {
                  options = {
                    obj: modelDefault2,
                    type: 'gltf',
                    scale: 0.1,
                    rotation: { x: 90, y: 0, z: 0 }
                  }
                }
                let obj;
                tb.loadObj(options, function (options) {

                  obj = options.setCoords([node.longitude - 0.0003, node.latitude - 0.00025, 0]);
                  obj.castShadow = true;
                  tb.add(obj);
                });
              }
            },
            render: function (gl, matrix) {
              tb.update();
            }
          })
        }

        onAdd(map) {
          this._map = map;
          let _this = this;
          _this.customContainer = document.getElementById('my-gui-container');

          this._btn = document.createElement('button');
          this._btn.className = 'mapboxgl-ctrl-group button';
          this._btn.type = 'button';
          this._btn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d';
          this._btn.style.background = 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+ICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIHN0eWxlPSJmb250LXNpemU6IDE0cHg7IGZvbnQtZmFtaWx5OiAnSGVsdmV0aWNhIE5ldWUnLEFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmOyBmb250LXdlaWdodDogYm9sZDsgdGV4dC1hbmNob3I6IG1pZGRsZTsiPjNEPC90ZXh0Pjwvc3ZnPg==)';
          this._btn['aria-label'] = 'Toggle Pitch';
          map.dragRotate.disable();
          this._btnP = document.createElement('button');
          this._btnP.className = 'mapboxgl-ctrl-group button';
          this._btnP.type = 'button';
          this._btnP.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-persontoggle-3d';
          this._btnP.textContent = 'P';
          this._btnP['aria-label'] = 'Toggle Pitch';
          this._containerP = document.createElement('div');
          this._btn.onclick = function () {
            if (_this._switch === true) {
              let options = {
                pitch: _this._pitch,
                bearing: _this._bearing,
                zoom: map.getZoom(),
              };
              _this.build3DModel();
              map.easeTo(options);
              _this._btn.style.background = 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+ICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIHN0eWxlPSJmb250LXNpemU6IDE0cHg7IGZvbnQtZmFtaWx5OiAnSGVsdmV0aWNhIE5ldWUnLEFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmOyBmb250LXdlaWdodDogYm9sZDsgdGV4dC1hbmNob3I6IG1pZGRsZTsiPjJEPC90ZXh0Pjwvc3ZnPg==)';
              map.dragRotate.enable();
              _this._switch = false;
              _this.count = 1;
              map.addLayer(
                {
                  'id': '3d-buildings',
                  'source': 'composite',
                  'source-layer': 'building',
                  'filter': ['==', 'extrude', 'true'],
                  'type': 'fill-extrusion',
                  'minzoom': 15,
                  'paint': {
                    'fill-extrusion-color': '#aaa',

                    // use an 'interpolate' expression to add a smooth transition effect to the
                    // buildings as the user zooms in
                    'fill-extrusion-height': [
                      'interpolate',
                      ['linear'],
                      ['zoom'],
                      15,
                      0,
                      15.05,
                      ['get', 'height']
                    ],
                    'fill-extrusion-base': [
                      'interpolate',
                      ['linear'],
                      ['zoom'],
                      15,
                      0,
                      15.05,
                      ['get', 'min_height']
                    ],
                    'fill-extrusion-opacity': 0.6
                  }
                },
              );
              class PersonToggle {
                _bearing: number;
                _pitch: number;
                _minpitchzoom: any;
                _map: any;
                _btn: HTMLButtonElement;
                _zoom: any;
                _container: HTMLDivElement;
                _switch: boolean;
                nodesTemps: any;
                modelDepoit = '../assets/Bus/workwork.gltf';

                constructor({ bearing = -90, pitch = 70, minpitchzoom = 18 }, btn: HTMLButtonElement, container: HTMLDivElement, nodesTemps: any) {
                  this._bearing = bearing;
                  this._pitch = pitch;
                  this._minpitchzoom = minpitchzoom;
                  this._switch = true;
                  this._btn = btn;
                  this._container = container;
                  this.nodesTemps = nodesTemps;
                }

                getSwitch() {
                  return this._switch;
                }

                onAdd(map) {
                  this._map = map;
                  let _this = this;
                  this._btn.onclick = function () {
                    if (_this._switch === true) {

                      map.dragRotate.enable();

                      let tb: Threebox;
                      let modelDepoit = _this.modelDepoit;
                      let options = {
                        pitch: _this._pitch,
                        bearing: _this._bearing,
                        zoom: _this._minpitchzoom,
                      };
                      map.easeTo(options);
                      _this._btn.textContent = 'S';

                      map.addLayer({
                        id: 'car',
                        type: 'custom',
                        renderingMode: '3d',
                        onAdd: function (map, mbxContext) {

                          // instantiate threebox
                          tb = new Threebox(
                            map,
                            mbxContext,
                            {
                              defaultLights: true,
                              passiveRendering: false
                            }
                          );

                          var car = {
                            obj: modelDepoit,
                            type: 'gltf',
                            scale: 0.03,
                            rotation: { x: 90, y: -27, z: 0 }
                          }

                          let cube;
                          tb.loadObj(car, function (car) {

                            cube = car.setCoords([tb.mapCenter.lng, tb.mapCenter.lat, 0]);
                            tb.add(cube);
                          });

                          var deltaDegrees = 5;

                          function easing(t) {
                            return t * (2 - t);
                          }

                          let mapD;
                          var countD = 0;
                          var countA = 0;
                          var countW = 0;
                          var radius = 70;
                          var colisaoW = false;
                          var colisaoS = false;
                          map.getCanvas().focus();
                          map.getCanvas().addEventListener(
                            'keydown',
                            function keydown(e) {
                              e.preventDefault();
                              if (e.which === 87) {
                                if (colisaoS === false) {
                                  for (var i = 0; i < _this.nodesTemps.length; i++) {
                                    var newRadius = distanceInKmBetweenEarthCoordinates(cube.position.x, cube.position.y, _this.nodesTemps[i].position.x - 0.9975168365090212, _this.nodesTemps[i].position.y - 0.7863799248298164);
                                    if (newRadius < radius) {
                                      alert("Ocorreu colisão!")
                                      colisaoW = true;
                                    }
                                  }
                                }
                                if (colisaoW === false) {
                                  if (countW === 0) {
                                    map.panBy([0, -6.6], {
                                      easing: easing
                                    });
                                    cube.translateX(0.1);
                                    countW++;
                                  } else {
                                    map.panBy([0, -64.0], {
                                      easing: easing
                                    });
                                    cube.translateX(0.0425);
                                  }
                                  colisaoS = false;
                                }
                              } else if (e.which === 83) {
                                if (colisaoW === false) {
                                  for (var i = 0; i < _this.nodesTemps.length; i++) {
                                    var newRadius = distanceInKmBetweenEarthCoordinates(cube.position.x, cube.position.y, _this.nodesTemps[i].position.x - 0.9975168365090212, _this.nodesTemps[i].position.y - 0.7863799248298164);
                                    if (newRadius < radius) {
                                      colisaoS = true;
                                      alert("Ocorreu colisão!")
                                    }
                                  }
                                }
                                if (colisaoS === false) {
                                  if (countW === 0) {
                                    map.panBy([0, 6.5], {
                                      easing: easing
                                    });
                                    cube.translateX(-0.1);
                                    countW++;
                                  } else {
                                    map.panBy([0, 55.0], {
                                      easing: easing
                                    });
                                    cube.translateX(-0.0425);
                                  }
                                  colisaoW = false;
                                }
                              } else if (e.which === 68) {
                                if (colisaoW === false && colisaoS === false) {
                                  if (countD === 0) {
                                    mapD = map.getBearing() - deltaDegrees;
                                    countD++;
                                  } else {
                                    mapD = mapD - deltaDegrees;
                                  }
                                  map.easeTo({
                                    bearing: mapD,
                                    easing: easing
                                  });
                                  cube.rotateZ(0.08725);
                                }
                              } else if (e.which === 65) {
                                if (colisaoW === false && colisaoS === false) {
                                  if (countA === 0) {
                                    mapD = map.getBearing() + deltaDegrees;
                                    countA++;
                                  } else {
                                    mapD = mapD + deltaDegrees;
                                  }
                                  map.easeTo({
                                    bearing: mapD,
                                    easing: easing
                                  });
                                  cube.rotateZ(-0.08725);
                                }
                              }
                            },
                            true
                          );

                          map.getCanvas().addEventListener(
                            'keyup',
                            async function () {
                              countW = 0;
                            },
                            true
                          );

                          function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
                            var earthRadiusKm = 6371;

                            var dLat = degreesToRadians(lat2 - lat1);
                            var dLon = degreesToRadians(lon2 - lon1);

                            lat1 = degreesToRadians(lat1);
                            lat2 = degreesToRadians(lat2);

                            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
                            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                            return earthRadiusKm * c;
                          }

                          function degreesToRadians(degrees) {
                            return degrees * Math.PI / 180;
                          }

                        },
                        render: function (gl, matrix) {
                          tb.update();
                        }
                      })



                      _this._switch = false;
                    } else {
                      map.removeLayer('car');
                      map.dragRotate.enable();
                      map.easeTo({ pitch: 70, bearing: -20, zoom: 13 });
                      _this._btn.textContent = 'P';
                      _this._switch = true;
                    }
                  };

                  this._container.className = 'mapboxgl-ctrl-group mapboxgl-ctrl';
                  this._container.appendChild(this._btn);

                  return this._container;
                }
              }
              _this.personToggle = new PersonToggle({}, _this._btnP, _this._containerP, _this.nodesTemps);
              map.addControl(_this.personToggle, 'top-right');

            } else {
              if (_this.personToggle.getSwitch() === true) {
                map.easeTo({ pitch: 0, bearing: 0 });
                _this.customContainer.removeChild(_this.gui.domElement);
                _this._containerP.removeChild(_this._btnP);

                $(_this.gui.domElement).attr("hidden", true);
                _this._btn.style.background = 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+ICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIHN0eWxlPSJmb250LXNpemU6IDE0cHg7IGZvbnQtZmFtaWx5OiAnSGVsdmV0aWNhIE5ldWUnLEFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmOyBmb250LXdlaWdodDogYm9sZDsgdGV4dC1hbmNob3I6IG1pZGRsZTsiPjNEPC90ZXh0Pjwvc3ZnPg==)';
                map.removeLayer('3d-buildings');
                map.removeLayer('3dmodels');
                map.dragRotate.disable();
                _this._switch = true;
              }
            }
          };

          this._container = document.createElement('div');
          this._container.className = 'mapboxgl-ctrl-group mapboxgl-ctrl';
          this._container.appendChild(this._btn);

          return this._container;
        }
      }
      this.map.addControl(new PitchToggle({ minpitchzoom: 10 }, this.nodesArray, this.nodesTemps), 'top-right');
      this.setMarkers();
    });
  }

  addNodes() {
    let tb: Threebox;
    let map = this.map;
    let nodes = this.nodesArray;
    let nodesTemps = this.nodesTemps;

    this.map.on('load', () => {
      map.addLayer({
        id: 'nodes',
        type: 'custom',
        renderingMode: '3d',
        onAdd: function (map, mbxContext) {

          // instantiate threebox
          tb = new Threebox(
            map,
            mbxContext,
            { defaultLights: false }
          );
          for (var node of nodes) {
            const material = new THREE.MeshBasicMaterial({ color: 0x808080 })
            material.transparent = true;
            let geo = new THREE.CircleGeometry(1, 32);
            var nodeTemp = new THREE.Mesh(geo, material);
            nodeTemp = tb.Object3D({ obj: nodeTemp }).setCoords([node.longitude - 0.00035, node.latitude - 0.00026, -1]);
            nodeTemp.receiveShadow = true;
            nodesTemps.push(nodeTemp);
            tb.add(nodeTemp);
          }
        },
        render: function (gl, matrix) {
          tb.update();
        }
      })
      this.addToolTipsNodes();
      this.setArrayLines();
    });
  }

  addToolTipsNodes() {

    let map = this.map;

    map.loadImage('../assets/Marker/marker.png',
      function (error, image) {
        if (error) throw error;
        map.addImage('custom-marker', image);
      });

    this.geojson = new Array();
    for (var i = 0; i < this.nodesArray.length; i++) {
      var node = this.nodesArray[i];

      map.addSource(node.key + "a", {
        type: "geojson",
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [node.longitude, node.latitude]
          },
          properties: {
            description: '<strong>' + node.name + '</strong><p>' + ' Latitude: ' +
              node.latitude +
              ' Longitude: ' +
              node.longitude + '</p>'
          }
        },
      })

      map.addLayer({
        "id": node.key + "a",
        "type": "symbol",
        "source": node.key + "a",
        "layout": {
          "icon-image": 'custom-marker',
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top"
        }
      })

      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        anchor: 'top-left'
      });

      map.on('mouseenter', node.key + "a", function (e) {
        map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        popup.setLngLat(coordinates).setHTML(description).addTo(map);
      });

      map.on('mouseleave', node.key + "a", function () {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });
    }
  }

  setCoordsMatrix() {
    var matrix = [];
    for (var i = 0; i < this.nodesArray.length; i++) {
      matrix[i] = new Array(this.nodesArray.length);
    }
    this.coordsT = matrix;
  }

  async setLines() {
    this.setCoordsMatrix();

    var coord = new Array();

    var pathNodes: PathNode[];

    var nodes = new Array();

    for (var p = 0; p < this.linesArray.length; p++) {
      var line = this.linesArray[p];
      if (line.linePath != undefined) {
        if (line.linePath[0] != undefined) {
          if (line.linePath[0].linePath != undefined) {
            var linePaths = line.linePath[0].linePath;
            for (var i = 0; i < linePaths.length; i++) {
              var path;
              if (linePaths[i].path == undefined) {
                path = this.getPath(linePaths[i].props.path);
              } else {
                path = this.getPath(linePaths[i].path);
              }

              if (path.pathNodes[0] != undefined) {
                if (path.pathNodes[0].pathNode != undefined) {
                  pathNodes = path.pathNodes[0].pathNode;
                } else {
                  pathNodes = path.pathNodes;
                }
                for (var n = 0; n < pathNodes.length; n++) {
                  for (var t = 0; t < this.nodesArray.length; t++) {
                    if (pathNodes[n].node === this.nodesArray[t].key) {
                      var node = this.nodesArray[t];
                      nodes.push(node);
                    }
                  }
                }
              }
              var nodesName = new Array();
              for (var j = 0; j < nodes.length; j++) {
                nodesName.push(nodes[j].name);
                const lng = nodes[j].longitude;
                const lat = nodes[j].latitude;
                coord[j] = [lng, lat];
              }
              var coordF = this.updateCoordsMatrix(coord);
              var name = path.key;
              this.addLinPer(coordF, name, line.name, nodesName, this.rgbToHex(this.linesArray[p].color));

              coord = new Array();
              nodes = [];
            }
          }
        }
      }
    }
  }

  getPath(name: string) {
    for (var i = 0; i < this.pathsArray.length; i++) {
      var path = this.pathsArray[i];
      if (path.key === name) {
        return this.pathsArray[i];
      }
    }
  }

  updateCoordsMatrix(coord: Array<any>) {
    var verify = true;
    for (var i = 0; i < coord.length - 1; i++) {
      if (verify) {
        var nodeIndexI = this.getNodeIndex(coord[i]);
      } else {
        verify = true;
      }
      var nodeIndexF = this.getNodeIndex(coord[i + 1]);

      if (this.coordsT[nodeIndexI][nodeIndexF] === undefined) {
        this.coordsT[nodeIndexI][nodeIndexF] = 0;
      }
      if (this.coordsT[nodeIndexI][nodeIndexF] === 0) {
        this.coordsT[nodeIndexI][nodeIndexF] = 1;
      } else {
        verify = false;
        var coordTemp = coord[i];
        var coordTemp2 = coord[i + 1];
        var count = this.coordsT[nodeIndexI][nodeIndexF];
        var coordA = this.updateCoords(coordTemp, count);
        var coordB = this.updateCoords(coordTemp2, count);
        coord[i] = [coordA[0], coordA[1]];
        coord[i + 1] = [coordB[0], coordB[1]];
        this.coordsT[nodeIndexI][nodeIndexF] += 1;
      }
    }
    return coord;
  }

  updateCoords(coord: Array<any>, count: number) {
    var xA1 = coord[0];
    var yA1 = coord[1];
    var value = count * 0.0002;
    var alfa = value;
    var beta = alfa + 90;
    var cosBeta = Math.cos(beta);
    var sinBeta = Math.sin(beta);

    var xA2 = xA1 + value * cosBeta;

    var yA2 = yA1 + value * sinBeta;

    var coord = new Array();
    coord[0] = xA2;
    coord[1] = yA2;

    coord.push(coord);

    return coord;
  }

  getNodeIndex(coord: Array<any>) {
    for (var j = 0; j < this.nodesArray.length; j++) {
      if (
        coord[0] === this.nodesArray[j].longitude &&
        coord[1] === this.nodesArray[j].latitude
      ) {
        return j;
      }
    }
  }

  addLinPer(coord: Array<any>, name: string, lineName: string, nodesName: any, cor: string) {
    let tb: Threebox;
    let map = this.map;
    map.addLayer({
      id: name,
      type: 'custom',
      renderingMode: '3d',
      onAdd: function (map, mbxContext) {

        // instantiate threebox
        tb = new Threebox(
          map,
          mbxContext,
          { defaultLights: true }
        );

        var lineOptions = {
          geometry: coord,
          color: cor,
          width: 5
        }

        tb.add(tb.line(lineOptions))

      },
      render: function (gl, matrix) {
        tb.update();
      }
    })
    this.addToolTipLine(coord, name, lineName, nodesName);
  }

  addToolTipLine(coord: Array<any>, name: string, lineName: string, nodesName: any) {
    let map = this.map;
    let _nodesArray = this.nodesArray;
    let _nodepop = this.nodepopup;
    this.map.addSource(name + "a", {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {
          description: '<strong>' + lineName + '</strong><p>' + name + '</p>'
            + '<p>' + nodesName + '</p>'
        },
        geometry: {
          type: 'LineString',
          coordinates: coord,
        },
      },
    });
    this.map.addLayer({
      id: name + "a",
      type: 'line',
      source: name + "a",
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-width': 1,
        'line-opacity': 0
      },
    });

    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      anchor: 'bottom-right'
    });

    this.map.on('mouseenter', name + "a", function (e) {
      map.getCanvas().style.cursor = 'pointer';
      for (var i = 0; i < _nodesArray.length; i++) {
        var node = _nodesArray[i];
        if (e.lngLat.lat === node.latitude && e.lngLat.lng === node.longitude) {
          _nodepop = true;
        }
      }
      if (_nodepop === false) {

        var coordinates = e.features[0].geometry.coordinates[0].slice();
        var description = e.features[0].properties.description;

        if (coordinates[0][0] != undefined) {
          coordinates = coordinates[0].slice();
        }

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        popup.setLngLat(coordinates).setHTML(description).addTo(map);
      }
    });

    this.map.on('mouseleave', name + "a", function () {
      if (_nodepop === false) {
        map.getCanvas().style.cursor = '';
        popup.remove();
      }
    });
  }

  //Convert 'RGB(R,G,B)' to hexadecimal value
  rgbToHex(color: string) {
    var temp = color.split(',');
    var temp1 = temp[0].split('(');
    var temp2 = temp[2].slice(0, -1);

    const red = parseInt(temp1[1], 10);
    const green = parseInt(temp[1], 10);
    const blue = parseInt(temp2, 10);

    return (
      '#' +
      this.componentToHex(red) +
      this.componentToHex(green) +
      this.componentToHex(blue)
    );
  }

  componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  }
}
