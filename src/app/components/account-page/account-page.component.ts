import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Limitation } from 'src/app/models/limitation';
import { Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user-service/user.service';
import { LimitationService } from 'src/app/services/limitation-service/limitation.service';
import { Router } from '@angular/router';
import { CustomCategoryService } from 'src/app/services/custom-category-service/custom-category.service';
import { CustomCategory } from 'src/app/models/customCategory';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
  providers: [UserService, LimitationService, CustomCategoryService]
})
export class AccountPageComponent implements OnInit {

  userId: number;
  user: User = new User();

  limitation: Limitation = new Limitation();

  hidden: boolean = true;
  hidden2: boolean = true;

  newLimitation = new FormControl('', [Validators.required, Validators.min(0.1)]);
  newCustomCategory = new FormControl('', [Validators.required]);

  customCategories: CustomCategory[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private limitationService: LimitationService,
    private router: Router,
    private customCategoryService: CustomCategoryService,
    ) { }

  ngOnInit(): void {
    this.userId =  this.userService.currentUserId();
    this.userService.get(this.userId).subscribe(user => this.user = user);
    this.limitationService.getByUserId(this.userId).subscribe(limitation => this.limitation = limitation);
    this.getCategories();
  }

  hide() {
    if (this.hidden)
      this.hidden = false;
    else
      this.hidden = true;
  }

  hide2() {
    if (this.hidden2)
      this.hidden2 = false;
    else
      this.hidden2 = true;
  }

  getNewLimitationErrorMessage() {
    if (this.newLimitation.hasError('required')) {
      return 'You must enter a value';
    }

    return this.newLimitation.hasError('min') ? 'Value have to be greater then 0.1' : '';
  }

  changeLimitation() {
    if (this.newLimitation.valid) {
      let limitation = new Limitation();
      limitation.id = this.limitation.id;
      limitation.limit = this.newLimitation.value;
      limitation.userId = this.userId;

      this.limitationService.update(limitation).subscribe(
        response => { 
          this.snackBar.open("Done!", "", {duration: 2000});
          this.limitation = limitation;
          console.log(response);
        },
        err => console.log(err)
      );
    }
  }

  logOut() {
    localStorage.removeItem("jwt");
    this.router.navigate(["/"]);
  }

  addCategory() {
    if (this.newCustomCategory.valid) {
      
      let customCategory: CustomCategory = new CustomCategory();
      customCategory.userId = this.userId;
      customCategory.name = this.newCustomCategory.value;

      this.customCategoryService.add(customCategory).subscribe(
        response => { 
          this.snackBar.open("Done!", "", {duration: 2000});
          this.getCategories();
          console.log(response);
        },
        err => console.log(err)
      );;
    }
  }

  getCategories() {
    this.customCategoryService.getCustomCategories(this.userId).subscribe(customCategories => 
      this.customCategories = customCategories);
  }

  deleteCategory(id: number) {
    this.customCategoryService.delete(id).subscribe(
      response => { 
        this.snackBar.open("Done!", "", {duration: 2000});
        console.log(response);
        this.getCategories();
      },
      err => console.log(err)
    );;
  }
}
