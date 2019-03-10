import { Component, OnInit } from "@angular/core";
import { DataApiService } from "src/app/services/data-api.service";
import { BookInterface } from "src/app/models/book-interface";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-list-books",
  templateUrl: "./list-books.component.html",
  styleUrls: ["./list-books.component.css"]
})
export class ListBooksComponent implements OnInit {
  constructor(private dataApi: DataApiService) {}
  public books: BookInterface;
  public pageActual: number = 1;
  ngOnInit() {
    this.getListBooks();
  }
  getListBooks(): void {
    this.dataApi
      .getAllBooks()
      .subscribe((books: BookInterface) => (this.books = books));
  }
  onDeleteBook(id: string): void {
    if (confirm("Are you sure to delete?")) {
      this.dataApi.deleteBook(id).subscribe();
    }
  }
  onPreUpdateBook(book: BookInterface): void {
    this.dataApi.selectedBook = Object.assign({}, book);
  }
  resetForm(bookForm?: NgForm): void {
    this.dataApi.selectedBook = {
      id: null,
      titulo: "",
      idioma: "",
      descripcion: "",
      portada: "",
      precio: "",
      link_amazon: "",
      autor: "",
      oferta: ""
    };
  }
}
