import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { convertJSONDateToString } from 'src/app/util/DateParser';
import { DeliveryOrder } from 'src/app/models/deliveryorder';
import { Deliveryorderservice } from 'src/app/services/deliveryorder/deliveryorder.service';

declare var H: any;


@Component({
  selector: 'app-deliverer-map',
  templateUrl: './deliverer-map.component.html',
  styleUrls: ['./deliverer-map.component.scss']
})
export class DelivererMapComponent implements OnInit {

  private deliveryOrderService: Deliveryorderservice;


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
  private search: any;

  deliveryOrders: DeliveryOrder[] = [];

  chosenOrders: DeliveryOrder[] = [];

  orderService: OrderService;

  constructor(private delService: Deliveryorderservice,private orservice: OrderService) {
    this.deliveryOrderService = delService;
    this.orderService = orservice;
  }



  ngOnInit() {
    this.platform = new H.service.Platform({
      "app_id": this.appId,
      "app_code": this.appCode
    });
    this.search = new H.places.Search(this.platform.getPlacesService());
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
    this.deliveryOrderService.connect("ws://192.168.24.110:8084/order/websocket/1");
    this.deliveryOrderService.deliveryorders.subscribe(msg => {
      console.log(msg);
      this.placeMarkersForOrders(msg.deliveryOrders);
    })


  }

  public placeMarkersForOrders(delOrders: DeliveryOrder[]) {
    var query = "";
    console.log("Length of delorders " + delOrders.length);

    for (let i = 0; i < delOrders.length; i++) {

      query = delOrders[i].address.street + " " + delOrders[i].address.streetNr + " " + delOrders[i].address.city + " " + delOrders[i].address.zipcode;
      this.search.request({ "q": query, "at": this.lat + "," + this.lng }, {}, data => {
        delOrders[i].lat = data.results.items[0].position[0];
        delOrders[i].lon = data.results.items[0].position[1];
        this.dropMarker({ "lat": data.results.items[0].position[0], "lng": data.results.items[0].position[1] }, delOrders[i].id);
        this.deliveryOrders.push(delOrders[i]);

      }, error => {
        console.error(error);
      });
    }
  }

  private dropMarker(coordinates: any, data: string) {
    //console.log("here");
    //this.map.removeObjects(this.map.getObjects());
    var blueicon = new H.map.Icon("https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color/254000/66-512.png", { size: { w: 56, h: 56 } });
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
  }

  checkValue(values: any) {
    var objects = this.map.getObjects();
    var redicon = new H.map.Icon("https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color/254000/67-512.png", { size: { w: 56, h: 56 } });
    var blueicon = new H.map.Icon("https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color/254000/66-512.png", { size: { w: 56, h: 56 } });


    if (values.currentTarget.checked) {
      for (let z = 0; z < objects.length; z++) {
        if (values.currentTarget.name == objects[z].getData()) {
          objects[z].setIcon(redicon);
          var order = this.deliveryOrders.find(x => x.id === objects[z].getData());
          this.chosenOrders.push(order);
          console.log(this.chosenOrders);

        }

      }
    }
    if (!values.currentTarget.checked) {
      for (let z = 0; z < objects.length; z++) {
        if (values.currentTarget.name == objects[z].getData()) {
          objects[z].setIcon(blueicon);
          var order = this.deliveryOrders.find(x => x.id === objects[z].getData());
          var index = this.chosenOrders.indexOf(order);
          this.chosenOrders.splice(index, 1);
          console.log(this.chosenOrders);

        }

      }
    }
  }
  deliver() {
    
  }

}