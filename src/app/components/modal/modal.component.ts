import { Component, OnInit } from "@angular/core";
import { DataApiService } from "src/app/services/data-api.service";
import { BookInterface } from "src/app/models/book-interface";
import { NgForm } from "@angular/forms";
import { Location } from "@angular/common";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"]
})
export class ModalComponent implements OnInit {
  constructor(private dataApi: DataApiService, private location: Location) {}
  public book: BookInterface;
  ngOnInit() {}

  onSaveBook(bookForm: NgForm): void {
    if (bookForm.value.id == null) {
      //NEW
      console.log(bookForm.value);
      this.dataApi
        .saveBook(bookForm.value)
        .subscribe(book => location.reload());
    } else {
      //UPDATE
      this.dataApi
        .updateBook(bookForm.value)
        .subscribe(book => location.reload());
    }
  }
}
