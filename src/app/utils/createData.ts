import {Injectable} from '@angular/core';
import {Assignment, SchoolSubject, User} from '../models';

@Injectable()
export class CreateData {

  userList: User[] = [];
  listSchoolSubject: SchoolSubject[] = [];
  assignmentsList: Assignment[] = [];

  constructor() {
    this.createUsers();
    this.createSchoolSubjects();
    this.createAssignments();
  }

  createUsers(): void {
    this.userList.push({
      _id: 'tempo1',
      avatarUrl: 'https://cdn-prod.scalefast.com/public/assets/img/resized/bandai-namco-store-eu/f46a00e1b2a444ed338c3cd249919cdd_1920_KR.jpg',
      creationDate: new Date(),
      email: 'micbuffa@gmail.com',
      lastName: 'Michel',
      name: 'Buffa',
      password: 'buffa',
      pendingAssignments: [],
      subjects: [],
      submittedAssignments: [],
      userLevel: 'teacher'
    });
    this.userList.push({
      _id: 'tempo2',
      avatarUrl: 'https://cdn.futura-sciences.com/buildsv6/images/wide1920/5/0/0/500480a0e5_122942_iles-monde.jpg',
      creationDate: new Date(),
      email: 'gabriel.mopolo@gmail.com',
      lastName: 'Gabriel',
      name: 'Mopolo',
      password: 'mopolo',
      pendingAssignments: [],
      subjects: [],
      submittedAssignments: [],
      userLevel: 'teacher'
    });

    this.userList.push({
      _id: 'tempo3',
      avatarUrl: 'https://cdn.futura-sciences.com/buildsv6/images/wide1920/5/0/0/500480a0e5_122942_iles-monde.jpg',
      creationDate: new Date(),
      email: 'choisy.jeremy@gmail.com',
      lastName: 'Jérémy',
      name: 'Choisy',
      password: 'choisy',
      pendingAssignments: [],
      subjects: [],
      submittedAssignments: [],
      userLevel: 'student'
    });

    this.userList.push({
      _id: 'tempo4',
      avatarUrl: 'https://cdn.futura-sciences.com/buildsv6/images/wide1920/5/0/0/500480a0e5_122942_iles-monde.jpg',
      creationDate: new Date(),
      email: 'andredasilvagoncalves@hotmail.com',
      lastName: 'André',
      name: 'Da silva goncalves',
      password: 'da silva goncalves',
      pendingAssignments: [],
      subjects: [],
      submittedAssignments: [],
      userLevel: 'student'
    });
  }

  createSchoolSubjects(): void {

    this.listSchoolSubject.push({
      _id: 'tempoId684514415',
      name: 'JavaScript',
      subjectPictureUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1024px-Unofficial_JavaScript_logo_2.svg.png',
      teacher: this.userList[0],
      desc: 'Ecriture de lecteurs multimédia améliorés sous forme de WebComponents'
    });


    this.listSchoolSubject.push({
      _id: 'tempoId471717',
      name: 'Angular',
      subjectPictureUrl: 'data:image/png;base64,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',
      teacher: this.userList[0],
      desc: 'Améliorer le TP sur les Assignments'
    });

    this.listSchoolSubject.push({
      _id: 'tempoId487517',
      name: 'View Js',
      subjectPictureUrl: 'https://vuejs.org/images/logo.png',
      teacher: this.userList[0],
      desc: 'TP3 et Mini Projet - un gestionnaire de menus / cartes pour des restaurants'
    });

    this.listSchoolSubject.push({
      _id: 'tempoId487517',
      name: 'Oracle',
      subjectPictureUrl: 'https://idc-cema.com/dwn/SF_290023/oracle_logo.png',
      teacher: this.userList[1],
      desc: undefined
    });

  }

  createAssignments(): void {

    const date = new Date();
    this.assignmentsList.push({
      _id: 'tempoId471717',
      isSubmitted: true,
      creationDate: new Date(),
      author: this.userList[2],
      name: 'Rendu tp javascript',
      score: 20,
      subject: this.listSchoolSubject[0],
      submissionDate: new Date(date.getDate() - 3),
    });

    this.assignmentsList.push({
      _id: 'tempoId471717',
      isSubmitted: false,
      creationDate: new Date(),
      author: this.userList[3],
      name: 'Rendu tp javascript',
      score: 19,
      subject: this.listSchoolSubject[0],
      submissionDate: undefined,
    });

    this.assignmentsList.push({
      _id: 'tempoId4848779',
      isSubmitted: true,
      creationDate: new Date(),
      author: this.userList[3],
      name: 'Rendu tp oracle',
      score: 15,
      subject: this.listSchoolSubject[3],
      submissionDate: undefined,
    });
    this.assignmentsList.push({
      _id: 'tempoId4848778',
      isSubmitted: true,
      creationDate: new Date(),
      author: this.userList[2],
      name: 'Rendu tp oracle',
      score: 15,
      subject: this.listSchoolSubject[3],
      submissionDate: undefined,
    });

    this.userList[2].submittedAssignments.push(this.assignmentsList[0], this.assignmentsList[2]);
    this.userList[3].pendingAssignments.push(this.assignmentsList[1]);
    this.userList[3].submittedAssignments.push(this.assignmentsList[3]);
  }

}
