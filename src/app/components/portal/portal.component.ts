import { Component, OnInit } from '@angular/core';
import {Portalrow} from "../../models/portalrow";

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
    imageurl: string;
    portalrows: Portalrow[] =[];
    jenkins: Portalrow;
    dockerhost: Portalrow;
    wildfly: Portalrow;
    nginx: Portalrow;
    databaseServer: Portalrow;
    sonarqube: Portalrow;
    Drive: Portalrow;



  constructor() { }

  ngOnInit() {
      this.imageurl = "../../../assets/images/";

      this.jenkins = new Portalrow();
      this.jenkins.name = "Jenkins";
      this.jenkins.password = "admin";
      this.jenkins.url = "http://192.168.24.110:8081";
      this.jenkins.username= "admin";
      this.jenkins.image =this.imageurl+ "jenkins.png";

      this.dockerhost = new Portalrow();
      this.dockerhost.name = "Dockerhost";
      this.dockerhost.url = "http://192.168.24.110";
      this.dockerhost.username = "PTS-S63-A";
      this.dockerhost.password = "PTS-S63-A";
      this.dockerhost.image = this.imageurl+"docker.png";

      this.wildfly = new Portalrow();
      this.wildfly.name = "Wildfly";
      this.wildfly.url = "http://192.168.24.110:9990";
      this.wildfly.username = "admin";
      this.wildfly.password = "admin";
      this.wildfly.image = this.imageurl+"wildfly.jpg";

      this.nginx = new Portalrow();
      this.nginx.name = "Nginx";
      this.nginx.url = "http://192.168.24.110:80";
      this.nginx.image = this.imageurl+"nginx.png";

      this.databaseServer = new Portalrow();
      this.databaseServer.name = "Databaseserver";
      this.databaseServer.url = "http://192.168.24.111";
      this.databaseServer.image = this.imageurl+"mysql.png";

      this.sonarqube = new Portalrow();
      this.sonarqube.name = "Sonarqube";
      this.sonarqube.url = "http://192.168.24.110:9000";
      this.sonarqube.username = "admin";
      this.sonarqube.password = "admin";
      this.sonarqube.image = this.imageurl+ "sonarqube.png";

      this.Drive = new Portalrow();
      this.Drive.name="Drive";
      this.Drive.url = "https://drive.google.com/open?id=1YXpQtebGiC9_E72pBMJmdNxtQ1A6KV-D";
      this.Drive.image = this.imageurl+ "drive.png";


      this.portalrows.push(this.jenkins);
      this.portalrows.push(this.sonarqube);
      this.portalrows.push(this.databaseServer);
      this.portalrows.push(this.nginx);
      this.portalrows.push(this.wildfly);
      this.portalrows.push(this.dockerhost);
      this.portalrows.push(this.Drive);

  }

}


