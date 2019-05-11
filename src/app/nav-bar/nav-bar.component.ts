import { Component, OnInit, HostBinding } from '@angular/core';
import { NavBarService } from './nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @HostBinding('class.isLogin')
  public isLogin = false;


  constructor(private navBarService: NavBarService) { }
  ngOnInit() {
    this.navBarService.isLogged();
    this.navBarService.changeLogin.subscribe(isLogin => {
      this.isLogin = isLogin;
    });
  }
}
