import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SchoolSubject} from '../../models';
import {UserApiService} from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  listSchoolSubject: SchoolSubject[] = [];

  constructor(private userApiService: UserApiService, private router: Router) {
    // Todo recup list of school subject by user name
  }

  ngOnInit(): void {
  }

  logout(): void {
    /* todo disconnect from api*/
    this.router.navigateByUrl('/login');
  }
}

