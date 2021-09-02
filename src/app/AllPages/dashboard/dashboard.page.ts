import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/modal/Users';
import { AuthService } from 'src/app/Service/auth.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  imagePath: string;
  uniqueId: string;
  imageUrl: string;
  imageName: any;
  imageArray: any = [];



  uid: string;
  subs: Subscription[] = [];
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: AngularFireStorage,
    private userService: UserService,
  ) {
  
  }

  ngOnInit() {
    this.auth()
  }

  auth() {
    const sub = this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.uid = auth.uid
        this.getUser(this.uid)
      } else {
        this.router.navigate(['/login'])
      }
    });
    this.subs.push(sub)
  }


  getUser(i: any) {
    const sub2 = this.userService.getUser(i).subscribe(client => {
      this.user = client;
      console.log("Unser Info = ",this.user)
      sub2.unsubscribe();
    })
    this.subs.push(sub2);
  }

  ngOnDestroy() {
    this.subs.forEach(x => {
      x.unsubscribe();
    });
  }












  logout() {
    this.authService.logout()
    setTimeout(() => {
      this.router.navigate(['/login']);

    })

  }



  craeteImageName() {
    const newTime = Math.floor(Date.now() / 1000);
    return Math.floor(Math.random() * 20) + newTime

  }

  async selectImage(event: any) {
    //this.uniqueId = Math.random().toString(36).substring(2);
    this.imageName = this.craeteImageName();
    this.imagePath = 'uploadImages/' + this.imageName;
    console.log("image path =", this.imagePath)

    const task = this.uploadFile(event, this.imagePath);
    task.then(async (completed) => {
      this.imageUrl = await completed.ref.getDownloadURL();
      this.imageArray.push(this.imageUrl)
      console.log(this.imageArray);


      alert('Image uploaded successfully');
    }, (err) => {
      alert("image uploaded failed !!")
    });
  }

  uploadFile(event, filename) {
    // create a reference to the storage bucket location
    const ref = this.storage.ref(filename);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    return ref.put(event.target.files[0]);
  }




}
