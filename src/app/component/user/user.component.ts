import { Component, Inject } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
export interface userData {
  name: string;
  email: string;
  phone: string;
}

const ELEMENT_DATA: userData[] = [
  { name: "James", email: "james@gmail.com", phone: "858345234" },
  { name: "Clara", email: "clara@gmail.com", phone: "9983423854" },
  { name: "Wayne", email: "wayne@gmail.com", phone: "4348273323" },
  { name: "Maya", email: "maya@gmail.com", phone: "9920558566" },
];

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent {
  displayedColumns: string[] = [
    "name",
    "email",
    "phone",
    "Actions",
    "View Info",
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(public dialog: MatDialog) {}

  deleteRow(index: number) {
    
      this.dataSource.data.splice(index, 1 );
      console.log(this.dataSource.data);
      this.dataSource._updateChangeSubscription();
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.data.forEach((element: any) => {
      if (element.email === filterValue.trim().toLowerCase()) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
    });
   
  }
  createNewUser(){
    const dialogRef = this.dialog.open(CreateUserDetailsComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    this.dataSource.data.push(result);
    this.dataSource._updateChangeSubscription();
    });
  }
  }



@Component({
  selector: 'create-user-details.component',
  templateUrl: 'create-user-details.component.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class CreateUserDetailsComponent {
  
  constructor(
    public dialogRef: MatDialogRef<CreateUserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: userData,
  ) {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
