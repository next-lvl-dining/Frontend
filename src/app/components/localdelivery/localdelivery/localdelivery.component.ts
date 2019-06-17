import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { SimulationService } from 'src/app/services/simulation/simulation.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

declare var H: any;


@Component({
  selector: 'app-localdelivery',
  templateUrl: './localdelivery.component.html',
  styleUrls: ['./localdelivery.component.scss'],
  providers: [WebsocketService, SimulationService]
})
export class LocaldeliveryComponent implements OnInit {

  private simulatioService : SimulationService;


  @ViewChild("map")
  public mapElement: ElementRef;

  @Input()
  public appId: any;

  @Input()
  public appCode: any;

  @Input()
  public lat: any;

  @Input()
  public lng: any;

  @Input()
  public width: any;

  @Input()
  public height: any;

  private platform: any;

  private map: any;

  private ui: any;

  constructor(private ss: SimulationService) { 
    this.simulatioService = ss;
  }

  public ngOnInit() {
    this.platform = new H.service.Platform({
      "app_id": this.appId,
      "app_code": this.appCode
    });
  }

  public ngAfterViewInit() {
    let defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 13.9,
        center: { lat: this.lat, lng: this.lng }
      }
    );
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
    var query = "";
    this.simulatioService.connect("ws:/192.168.24.110:8088/deliver/simulation/"+localStorage.getItem('orderid')+"/websocket");
    this.simulatioService.messages.subscribe(msg => {
      if(!msg.lat.includes('stop')||!msg.lon.includes('stop')){
      var lon = msg.lon.replace(" ", "");
      lon = lon.replace('\"', '');
      var lonnumber = +lon;
      var lat = msg.lat;
      var latnumber = +lat;
      console.log("this is lon " + lonnumber + " this is lat " + latnumber);
      console.log(latnumber);
      console.log(lonnumber);
      this.dropMarker({ "lat": lonnumber, "lng": latnumber }, "deliverer" + msg.orderid);}
    })


  }
  private dropMarker(coordinates: any, data: string) {
    this.map.removeObjects(this.map.getObjects());
    var blueicon = new H.map.Icon("https://image.flaticon.com/icons/png/512/1332/1332184.png", { size: { w: 56, h: 56 } });
    let marker = new H.map.Marker(coordinates);
    marker.setData(data.toString());
    marker.setIcon(blueicon);
    marker.addEventListener('tap', event => {
        let bubble = new H.ui.InfoBubble(event.target.getPosition(), {
            content: event.target.getData()
        });
        this.ui.addBubble(bubble);
    }, false);
    this.map.addObject(marker);
    this.map.setCenter({lat:coordinates.lat, lng:coordinates.lng});
}

}
