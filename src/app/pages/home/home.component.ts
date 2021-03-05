import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services';
import {Router} from '@angular/router';
import {SchoolSubject} from '../../models';
import {CreateData} from '../../utils/createData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listSchoolSubject: SchoolSubject[] = [];

  constructor(private authService: AuthService, private router: Router) {
    // getList of school subject with the user access
    const createDataUtils = new CreateData();
    this.listSchoolSubject = createDataUtils.listSchoolSubject.filter(item => item.teacher.lastName === 'Michel');
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
