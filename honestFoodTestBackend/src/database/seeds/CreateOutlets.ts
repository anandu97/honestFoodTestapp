import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';
// import { RoleRepository } from '@base/api/repositories/Users/RoleRepository';
import * as fs from 'fs';
const jsdom = require('jsdom');
export default class CreateOutlets implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const { JSDOM } = jsdom;

    // const roles = [{ name: 'Admin' }, { name: 'Client' }];
    const data = fs.readFileSync(
      '/Users/ntpl-dev-129/Documents/honestFoodTest/honestFoodTestBackend/FullStackTest_DeliveryAreas.kml',
      'utf8',
    );
    console.log(data);
    let Doc = new JSDOM(data);
    let xmlDoc = Doc.window.document;
    // let xmlDoc = parser.parseFromString(data, 'text/xml');
    let googlePolygons = [];
    let googleMarkers = [];
    for (const item of xmlDoc.getElementsByTagName('Placemark') as any) {
      let placeMarkNames = item.getElementsByTagName('Placemark');
      let polygons = item.getElementsByTagName('Polygon');
      let markers = item.getElementsByTagName('Point');
      console.log(polygons);
      for (const place of placeMarkNames) {
        console.log(place);
        let coords = place.getElementsByTagName('name')[0].childNodes[0].nodeValue.trim();
        console.log(coords);
        let points = coords.split('\n');

        let googlePolygonsPaths = [];
        for (const point of points) {
          let coord = point.split(',');
          console.log(coord);
          googlePolygonsPaths.push({ lat: +coord[1], lng: +coord[0] });
        }
        googlePolygons.push(googlePolygonsPaths);
      }
      /** POLYGONS PARSE **/
      for (const polygon of polygons) {
        console.log(polygon);
        let coords = polygon.getElementsByTagName('coordinates')[0].childNodes[0].nodeValue.trim();
        console.log(coords);
        let points = coords.split('\n');

        let googlePolygonsPaths = [];
        for (const point of points) {
          let coord = point.split(',');
          console.log(coord);
          googlePolygonsPaths.push({ lat: +coord[1], lng: +coord[0] });
        }
        googlePolygons.push(googlePolygonsPaths);
      }

      /** MARKER PARSE **/
      for (const marker of markers) {
        var coords = marker.getElementsByTagName('coordinates')[0].childNodes[0].nodeValue.trim();
        let coord = coords.split(',');
        googleMarkers.push({ lat: +coord[1], lng: +coord[0] });
      }
    }
    console.log(googlePolygons);
    console.log(googleMarkers);

    // for (const [key, value] of Object.entries(roles)) {
    //   const role = await connection.getCustomRepository(RoleRepository).findOne({ where: { name: value.name } });

    //   if (role) {
    //     continue;
    //   }

    //   await connection.getCustomRepository(RoleRepository).createRole({ name: value.name });
    // }
  }
}
