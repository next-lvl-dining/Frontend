import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    profileForm: FormGroup;
    user: User;

    constructor(private authService: AuthService,
                private userService: UserService,
                private formBuilder: FormBuilder) {
        this.profileForm = this.formBuilder.group({
            email: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            suffix: ['', Validators.required],
            street: ['', Validators.required],
            streetNumber: ['', Validators.required],
            city: ['', Validators.required],
            zipcode: ['', Validators.required],
            phoneNumber: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.getUser();
        console.log('userId: ' + localStorage.getItem('token'))
    }

    getUser() {
        this.userService.findUserById(localStorage.getItem('id')).subscribe(x => this.setUserForm(x));
    }

    setUserForm(user: User) {
        this.user = user;
        this.profileForm.controls.email.setValue(user.email);
        this.profileForm.controls.firstName.setValue(user.firstName);
        this.profileForm.controls.lastName.setValue(user.lastName);
        this.profileForm.controls.suffix.setValue(user.suffix);
        this.profileForm.controls.street.setValue(user.street);
        this.profileForm.controls.streetNumber.setValue(user.streetNumber);
        this.profileForm.controls.city.setValue(user.city);
        this.profileForm.controls.zipcode.setValue(user.zipcode);
        this.profileForm.controls.phoneNumber.setValue(user.phoneNumber);
    }

    updateUser() {
        if(this.profileForm.invalid) {
           alert('Please fill all fields correctly')
        } else {
            this.user.email = this.profileForm.value.email;
            this.user.firstName = this.profileForm.value.firstName;
            this.user.lastName = this.profileForm.value.lastName;
            this.user.suffix = this.profileForm.value.suffix;
            this.user.street = this.profileForm.value.street;
            this.user.streetNumber = this.profileForm.value.streetNumber;
            this.user.city = this.profileForm.value.city;
            this.user.zipcode = this.profileForm.value.zipcode;
            this.user.phoneNumber = this.profileForm.value.phoneNumber;

            console.log(this.user);
            this.userService.updateUser(this.user).subscribe();
            alert('Updated user' + this.user.email)
        }
    }
}
