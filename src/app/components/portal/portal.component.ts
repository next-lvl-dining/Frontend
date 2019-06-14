import { Component, OnInit } from '@angular/core';
import { Portalrow } from '../../models/portalrow';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  imageurl: string;
  portalrows: Portalrow[] = [];
  jenkins: Portalrow;
  jenkinsmaster: Portalrow;
  nginx: Portalrow;
  reservedevelop: Portalrow;
  reservemaster: Portalrow;
  orderdevelop: Portalrow;
  ordermaster: Portalrow;
  logindevelop: Portalrow;
  loginmaster: Portalrow;
  loggingdevelop: Portalrow;
  loggingmaster: Portalrow;
  deliverdevelop: Portalrow;
  delivermaster: Portalrow;
  promotiondevelop: Portalrow;
  promotionmaster: Portalrow;
  paymentdevelop: Portalrow;
  paymentmaster: Portalrow;
  monitordevelop: Portalrow;
  monitormaster: Portalrow;
  databaseServer: Portalrow;
  sonarqube: Portalrow;
  sonarqubemaster: Portalrow;
  Drive: Portalrow;
  prometheusdevelop: Portalrow;
  grafanadevelop: Portalrow;
  prometheusmaster: Portalrow;
  grafanamaster: Portalrow;
  rabbitmqdevelop: Portalrow;
  rabbitmqmaster: Portalrow;
  simulationmaster: Portalrow;
  simulationdevelop: Portalrow;
  constructor() { }

  ngOnInit() {
    this.imageurl = '../../../assets/images/';

    this.jenkins = new Portalrow();
    this.jenkins.name = 'Jenkins-Develop';
    this.jenkins.password = 'admin';
    this.jenkins.url = 'http://192.168.24.110:8081';
    this.jenkins.username = 'admin';
    this.jenkins.image = this.imageurl + 'jenkins.png';

    this.jenkinsmaster = new Portalrow();
    this.jenkinsmaster.name = 'Jenkins-Master';
    this.jenkinsmaster.password = 'admin';
    this.jenkinsmaster.url = 'http://192.168.24.113:8081';
    this.jenkinsmaster.username = 'admin';
    this.jenkinsmaster.image = this.imageurl + 'jenkins.png';


    this.reservedevelop = new Portalrow();
    this.reservedevelop.name = 'Reservation Develop';
    this.reservedevelop.url = 'http://192.168.24.110:9990';
    this.reservedevelop.resturl = 'http://192.168.24.110:8080/reserve';
    this.reservedevelop.username = 'admin';
    this.reservedevelop.password = 'admin';
    this.reservedevelop.image = this.imageurl + 'wildfly_logo.png';

    this.reservemaster = new Portalrow();
    this.reservemaster.name = 'Reservation Master';
    this.reservemaster.url = 'http://192.168.24.113:9990';
    this.reservemaster.resturl = 'http://192.168.24.113:8080/reserve';
    this.reservemaster.username = 'admin';
    this.reservemaster.password = 'admin';
    this.reservemaster.image = this.imageurl + 'wildfly_logo.png';

    this.loggingdevelop = new Portalrow();
    this.loggingdevelop.name = 'Logging Develop';
    this.loggingdevelop.url = 'http://192.168.24.110:9991';
    this.loggingdevelop.resturl = 'http://192.168.24.110:8082/logging';
    this.loggingdevelop.username = 'admin';
    this.loggingdevelop.password = 'admin';
    this.loggingdevelop.image = this.imageurl + 'wildfly_logo.png';

    this.loggingmaster = new Portalrow();
    this.loggingmaster.name = 'Logging Master';
    this.loggingmaster.url = 'http://192.168.24.113:9991';
    this.loggingmaster.resturl = 'http://192.168.24.113:8082/logging';
    this.loggingmaster.username = 'admin';
    this.loggingmaster.password = 'admin';
    this.loggingmaster.image = this.imageurl + 'wildfly_logo.png';

    this.logindevelop = new Portalrow();
    this.logindevelop.name = 'Login Develop';
    this.logindevelop.url = 'http://192.168.24.110:9992';
    this.logindevelop.resturl = 'http://192.168.24.110:8083/login';
    this.logindevelop.username = 'admin';
    this.logindevelop.password = 'admin';
    this.logindevelop.image = this.imageurl + 'wildfly_logo.png';

    this.loginmaster = new Portalrow();
    this.loginmaster.name = 'Login Master';
    this.loginmaster.url = 'http://192.168.24.113:9992';
    this.loginmaster.resturl = 'http://192.168.24.113:8083/login';
    this.loginmaster.username = 'admin';
    this.loginmaster.password = 'admin';
    this.loginmaster.image = this.imageurl + 'wildfly_logo.png';

    this.orderdevelop = new Portalrow();
    this.orderdevelop.name = 'Order Develop';
    this.orderdevelop.url = 'http://192.168.24.110:9993';
    this.orderdevelop.resturl = 'http://192.168.24.110:8084/order';
    this.orderdevelop.username = 'admin';
    this.orderdevelop.password = 'admin';
    this.orderdevelop.image = this.imageurl + 'wildfly_logo.png';

    this.ordermaster = new Portalrow();
    this.ordermaster.name = 'Order Master';
    this.ordermaster.url = 'http://192.168.24.113:9993';
    this.ordermaster.resturl = 'http://192.168.24.113:8084/order';
    this.ordermaster.username = 'admin';
    this.ordermaster.password = 'admin';
    this.ordermaster.image = this.imageurl + 'wildfly_logo.png';

    this.paymentdevelop = new Portalrow();
    this.paymentdevelop.name = 'Payment Develop';
    this.paymentdevelop.url = 'http://192.168.24.110:9994';
    this.paymentdevelop.resturl = 'http://192.168.24.110:8085/payment';
    this.paymentdevelop.username = 'admin';
    this.paymentdevelop.password = 'admin';
    this.paymentdevelop.image = this.imageurl + 'wildfly_logo.png';

    this.paymentmaster = new Portalrow();
    this.paymentmaster.name = 'Payment Master';
    this.paymentmaster.url = 'http://192.168.24.113:9994';
    this.paymentmaster.resturl = 'http://192.168.24.113:8085/payment';
    this.paymentmaster.username = 'admin';
    this.paymentmaster.password = 'admin';
    this.paymentmaster.image = this.imageurl + 'wildfly_logo.png';

    this.promotiondevelop = new Portalrow();
    this.promotiondevelop.name = 'Promotion Develop';
    this.promotiondevelop.url = 'http://192.168.24.110:9995';
    this.promotiondevelop.resturl = 'http://192.168.24.110:8086/promotion';
    this.promotiondevelop.username = 'admin';
    this.promotiondevelop.password = 'admin';
    this.promotiondevelop.image = this.imageurl + 'wildfly_logo.png';

    this.promotionmaster = new Portalrow();
    this.promotionmaster.name = 'Promotion Master';
    this.promotionmaster.url = 'http://192.168.24.113:9995';
    this.promotionmaster.resturl = 'http://192.168.24.113:8086/promotion';
    this.promotionmaster.username = 'admin';
    this.promotionmaster.password = 'admin';
    this.promotionmaster.image = this.imageurl + 'wildfly_logo.png';

    this.monitordevelop = new Portalrow();
    this.monitordevelop.name = 'Monitor Develop';
    this.monitordevelop.url = 'http://192.168.24.110:9996';
    this.monitordevelop.resturl = 'http://192.168.24.110:8087/monitor';
    this.monitordevelop.username = 'admin';
    this.monitordevelop.password = 'admin';
    this.monitordevelop.image = this.imageurl + 'wildfly_logo.png';

    this.monitormaster = new Portalrow();
    this.monitormaster.name = 'Monitor Master';
    this.monitormaster.url = 'http://192.168.24.113:9996';
    this.monitormaster.resturl = 'http://192.168.24.113:8087/monitor';
    this.monitormaster.username = 'admin';
    this.monitormaster.password = 'admin';
    this.monitormaster.image = this.imageurl + 'wildfly_logo.png';

    this.deliverdevelop = new Portalrow();
    this.deliverdevelop.name = 'Deliver Develop';
    this.deliverdevelop.url = 'http://192.168.24.110:9997';
    this.deliverdevelop.resturl = 'http://192.168.24.110:8088/deliver';
    this.deliverdevelop.username = 'admin';
    this.deliverdevelop.password = 'admin';
    this.deliverdevelop.image = this.imageurl + 'wildfly_logo.png';

    this.delivermaster = new Portalrow();
    this.delivermaster.name = 'Deliver Master';
    this.delivermaster.url = 'http://192.168.24.113:9997';
    this.delivermaster.resturl = 'http://192.168.24.113:8088/deliver';
    this.delivermaster.username = 'admin';
    this.delivermaster.password = 'admin';
    this.delivermaster.image = this.imageurl + 'wildfly_logo.png';


    this.nginx = new Portalrow();
    this.nginx.name = 'Frontend';
    this.nginx.url = 'http://192.168.24.110:80';
    this.nginx.image = this.imageurl + 'nginx.png';

    this.databaseServer = new Portalrow();
    this.databaseServer.name = 'Databaseserver';
    this.databaseServer.url = 'http://192.168.24.111';
    this.databaseServer.image = this.imageurl + 'mysql.png';

    this.sonarqube = new Portalrow();
    this.sonarqube.name = 'Sonarqube-Develop';
    this.sonarqube.url = 'http://192.168.24.110:9000';
    this.sonarqube.username = 'admin';
    this.sonarqube.password = 'admin';
    this.sonarqube.image = this.imageurl + 'sonarqube.png';

    this.sonarqubemaster = new Portalrow();
    this.sonarqubemaster.name = 'Sonarqube-Master';
    this.sonarqubemaster.url = 'http://192.168.24.113:9000';
    this.sonarqubemaster.username = 'admin';
    this.sonarqubemaster.password = 'admin';
    this.sonarqubemaster.image = this.imageurl + 'sonarqube.png';

    this.Drive = new Portalrow();
    this.Drive.name = 'Drive';
    this.Drive.url = 'https://drive.google.com/open?id=1YXpQtebGiC9_E72pBMJmdNxtQ1A6KV-D';
    this.Drive.image = this.imageurl + 'drive.png';

    this.prometheusdevelop = new Portalrow();
    this.prometheusdevelop.name = 'Prometheus Develop';
    this.prometheusdevelop.url = 'http://192.168.24.110:9090';
    this.prometheusdevelop.image = this.imageurl + 'prometheus.png';

    this.prometheusmaster = new Portalrow();
    this.prometheusmaster.name = 'Prometheus Master';
    this.prometheusmaster.url = 'http://192.168.24.113:9090';
    this.prometheusmaster.image = this.imageurl + 'prometheus.png';

    this.grafanadevelop = new Portalrow();
    this.grafanadevelop.name = 'Grafana Develop';
    this.grafanadevelop.url = 'http://192.168.24.110:3000';
    this.grafanadevelop.username = 'admin';
    this.grafanadevelop.password = 'admin';
    this.grafanadevelop.image = this.imageurl + 'grafana.png';

    this.grafanamaster = new Portalrow();
    this.grafanamaster.name = 'Grafana Master';
    this.grafanamaster.url = 'http://192.168.24.113:3000';
    this.grafanamaster.username = 'admin';
    this.grafanamaster.password = 'admin';
    this.grafanamaster.image = this.imageurl + 'grafana.png';

    this.rabbitmqdevelop = new Portalrow();
    this.rabbitmqdevelop.name = 'RabbitMQ Develop';
    this.rabbitmqdevelop.url = 'http://192.168.24.110:15672';
    this.rabbitmqdevelop.username = 'guest';
    this.rabbitmqdevelop.password = 'guest';
    this.rabbitmqdevelop.image = this.imageurl + 'rabbitmq.jpg';

    this.rabbitmqmaster = new Portalrow();
    this.rabbitmqmaster.name = 'RabbitMQ Master';
    this.rabbitmqmaster.url = 'http://192.168.24.113:15672';
    this.rabbitmqmaster.username = 'guest';
    this.rabbitmqmaster.password = 'guest';
    this.rabbitmqmaster.image = this.imageurl + 'rabbitmq.jpg';

    this.simulationdevelop = new Portalrow();
    this.simulationdevelop.name = 'Simulation Develop';
    this.simulationdevelop.url = 'http://192.168.24.110:22';
    this.simulationdevelop.image = this.imageurl + 'python.png';

    this.simulationmaster = new Portalrow();
    this.simulationmaster.name = 'Simulation Master';
    this.simulationmaster.url = 'http://192.168.24.113:22';
    this.simulationmaster.image = this.imageurl + 'python.png';

    this.portalrows.push(this.jenkins);
    this.portalrows.push(this.sonarqube);
    this.portalrows.push(this.databaseServer);
    this.portalrows.push(this.nginx);
    this.portalrows.push(this.sonarqubemaster);
    this.portalrows.push(this.jenkinsmaster);
    this.portalrows.push(this.Drive);
    this.portalrows.push(this.reservedevelop);
    this.portalrows.push(this.reservemaster);
    this.portalrows.push(this.loggingdevelop);
    this.portalrows.push(this.loggingmaster);
    this.portalrows.push(this.logindevelop);
    this.portalrows.push(this.loginmaster);
    this.portalrows.push(this.orderdevelop);
    this.portalrows.push(this.ordermaster);
    this.portalrows.push(this.paymentdevelop);
    this.portalrows.push(this.paymentmaster);
    this.portalrows.push(this.promotiondevelop);
    this.portalrows.push(this.promotionmaster);
    this.portalrows.push(this.monitordevelop);
    this.portalrows.push(this.monitormaster);
    this.portalrows.push(this.deliverdevelop);
    this.portalrows.push(this.delivermaster);
    this.portalrows.push(this.prometheusdevelop);
    this.portalrows.push(this.prometheusmaster);
    this.portalrows.push(this.grafanadevelop);
    this.portalrows.push(this.grafanamaster);
    this.portalrows.push(this.rabbitmqdevelop);
    this.portalrows.push(this.rabbitmqmaster);
    this.portalrows.push(this.simulationdevelop);
    this.portalrows.push(this.simulationmaster);
  }

}


