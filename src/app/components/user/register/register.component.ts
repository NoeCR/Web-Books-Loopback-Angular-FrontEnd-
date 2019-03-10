import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UserInterface } from "src/app/models/user-interface";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  public title: string = "Register";
  private user: UserInterface = {
    name: "",
    email: "",
    password: ""
  };
  public isError: boolean = false;
  public msgError: string = "";
  ngOnInit() {}

  onRegister(form: NgForm): void {
    console.log(form);
    if (form.valid) {
      this.authService
        .registerUser(this.user.name, this.user.email, this.user.password)
        .subscribe(
          user => {
            this.authService.setUser(user);
            let token = user.id;
            this.authService.setToken(token);
            this.router.navigate(["/user/profile"]);
            location.reload();
            this.isError = false;
          },
          res => {
            console.log(res.error);
            this.msgError = res.error.error.details.messages.email;
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
