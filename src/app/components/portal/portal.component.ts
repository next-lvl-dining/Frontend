import { Component, OnInit } from '@angular/core';
import {Portalrow} from "../../models/portalrow";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
    portalrows: Portalrow[] =[];
    jenkins: Portalrow;
    dockerhost: Portalrow;
    wildfly: Portalrow;
    drive: Portalrow;
    tomcat: Portalrow;
    databaseServer: Portalrow;
    sonarqube: Portalrow;


  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit() {
      this.jenkins = new Portalrow();
      this.jenkins.name = "Jenkins";
      this.jenkins.password = "admin";
      this.jenkins.url = "192.168.24.110:8081";
      this.jenkins.username= "admin";

      this.dockerhost = new Portalrow();
      this.dockerhost.name = "Dockerhost";
      this.dockerhost.url = "192.168.24.110";
      this.dockerhost.username = "PTS-S63-A";
      this.dockerhost.password = "PTS-S63-A";

      this.wildfly = new Portalrow();
      this.wildfly.name = "Wildfly";
      this.wildfly.url = "192.168.24.110:9990";
      this.wildfly.username = "admin";
      this.wildfly.password = "admin";

      this.tomcat = new Portalrow();
      this.tomcat.name = "Tomcat";
      this.tomcat.url = "192.168.24.110:80";

      this.databaseServer = new Portalrow();
      this.databaseServer.name = "Databaseserver";
      this.databaseServer.url = "192.168.24.111";

      this.sonarqube = new Portalrow();
      this.sonarqube.name = "Sonarqube";
      this.sonarqube.url = "192.168.24.110:9000";
      this.sonarqube.username = "admin";
      this.sonarqube.password = "admin";

      this.portalrows.push(this.jenkins);
      this.portalrows.push(this.sonarqube);
      this.portalrows.push(this.databaseServer);
      this.portalrows.push(this.tomcat);
      this.portalrows.push(this.wildfly);
      this.portalrows.push(this.dockerhost);

  }

    sanitize(url:string){
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

}


