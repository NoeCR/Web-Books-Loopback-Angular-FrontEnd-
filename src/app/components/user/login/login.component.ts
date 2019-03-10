import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { UserInterface } from "src/app/models/user-interface";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  public title: string = "Login";
  private user: UserInterface = {
    email: "",
    password: ""
  };
  public isError: boolean = false;
  ngOnInit() {}
  onLogin(form: NgForm) {
    if (form.valid) {
      return this.authService
        .loginUser(this.user.email, this.user.password)
        .subscribe(
          data => {
            this.authService.setUser(data.user);
            this.authService.setToken(data.id);
            this.router.navigate(["/user/profile"]);
            location.reload();
            this.isError = false;
          },
          error => {
            this.onErrors();
          }
        );
    } else {
      this.onErrors();
    }
  }
  onErrors() {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }
}
