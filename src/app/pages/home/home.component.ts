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

  constructor(private authService: AuthService, private router: Router, private createDataUtils: CreateData) {
    // getList of school subject with the user access
    this.listSchoolSubject = createDataUtils.listSchoolSubject.filter(item => item.teacher.name === 'Michel');

  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
