import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { SelectionModel } from '@angular/cdk/collections';
import * as $ from 'jquery';

@Component({
  selector: 'app-flextable',
  templateUrl: './flextable.component.html',
  styleUrls: ['./flextable.component.css']
})

export class FlextableComponent implements OnInit {

  displayedColumns = ['select', 'position', 'name', 'grade', 'salary'];
  data = Object.assign(ELEMENT_DATA);
  dataSource = new MatTableDataSource<Element>(this.data);
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(PerfectScrollbarDirective) directiveRef?: PerfectScrollbarDirective;
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(MatSort) sort: MatSort;

  public config: PerfectScrollbarConfigInterface = {};

  ngOnInit() {
    this.dataSource.sort = this.sort;

  }
  public scrollToY(grade: any): void {
    var indexValue = ELEMENT_DATA.map(function (element) { return element.grade; }).indexOf(grade);
    var position = 60 + (indexValue * 49);
    this.componentRef.directiveRef.scrollToY(position, 300);
  }

  addElement(grade: any) {
    var index = ELEMENT_DATA.map((element) => element.grade).indexOf(grade);
    ELEMENT_DATA.splice(index, 0, { position: index, name: 'Vijay' + index, grade: grade, salary: Math.random() * 10000000000000000 })
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  groupCheck(grade: any, currentIndex : number) {
    var index: number;
    var nextIndex: number;
    var nextGrade: any;
    var defaultNumber:number =1;
    if (grade == 'G2') {
      nextGrade = 'G4';
    } else if (grade == 'G4') {
      nextGrade = 'G6';
    } else if (grade == 'G6') {
      nextGrade = 'G8';
    }
    console.log("Grade : " + grade + " nextGrade : " + nextGrade);
    index = ELEMENT_DATA.map((element) => element.grade).indexOf(grade);
    nextIndex = ELEMENT_DATA.map((element) => element.grade).indexOf(nextGrade);
    if (grade == 'G8') {
      nextIndex = this.dataSource.data.length;
    } 
    
    var cNextIndex = +index + +defaultNumber; 
    console.log("index : " + +index + 1 + "nextIndex : " + nextIndex);
    if (ELEMENT_DATA[index].highlighted) {
      console.log("Has Value");
      for (var _i = index; _i < nextIndex; _i++) {
        console.log("index : " + _i);        
        this.selection.deselect(ELEMENT_DATA[_i]);
        ELEMENT_DATA[_i].highlighted = false;
      }
      this.selection.select(ELEMENT_DATA[currentIndex]);
      ELEMENT_DATA[currentIndex].highlighted = true;
    } else {
      console.log("no Value");
      for (var _i = index; _i < nextIndex; _i++) {
        console.log("index : " + _i);
        this.selection.select(ELEMENT_DATA[_i]);
        ELEMENT_DATA[_i].highlighted = true;
        
      } 
      this.selection.deselect(ELEMENT_DATA[currentIndex]);
        ELEMENT_DATA[currentIndex].highlighted = false;
    }

      // for (var _i = index; _i < nextIndex; _i++) {
      //   console.log("index : " + _i);
      //   if(ELEMENT_DATA[_i].highlighted){
      //     console.log("Has Value");
      //     this.selection.deselect(ELEMENT_DATA[_i]);
      //     ELEMENT_DATA[_i].highlighted = false;
      //   } else {
      //     console.log("No Value");
      //   this.selection.select(ELEMENT_DATA[_i]);
      //   ELEMENT_DATA[_i].highlighted = true; 
    //      }
    // }

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.dataSource.data.forEach(row => {
        this.selection.clear(); row.highlighted = false;
      }) :
      this.dataSource.data.forEach(row => {
        this.selection.select(row);
        row.highlighted = true;
      });
  }

  highlight(element: Element) {
    element.highlighted = !element.highlighted;
  }

  onChecked (e,i:number) {
   // const checkbox = e.target as HTMLInputElement;
  
    if (e.checked) {
      console.log("Checked : "+i);
     // this.selection.deselect(ELEMENT_DATA[i]);
      ELEMENT_DATA[i].highlighted=false;
    }else{
   //   this.selection.select(ELEMENT_DATA[i]);
      ELEMENT_DATA[i].highlighted=true;
      console.log("Not Checked : "+i);
     
    }
  }

}

export interface Element {
  name: string;
  position: number;
  grade: string;
  salary: number;
  highlighted?: boolean;
  hovered?: boolean;
}

const ELEMENT_DATA: Element[] = [
  { position: 1, name: 'Vijay', grade: 'G2', salary: 22000 },
  { position: 2, name: 'Raj', grade: 'G2', salary: 22000 },
  { position: 3, name: 'Kumar', grade: 'G2', salary: 20000 },
  { position: 4, name: 'Venkat', grade: 'G2', salary: 25000 },
  { position: 5, name: 'Vasanth', grade: 'G2', salary: 25000 },
  { position: 6, name: 'Prashant', grade: 'G4', salary: 45000 },
  { position: 7, name: 'Sasi', grade: 'G4', salary: 40000 },
  { position: 8, name: 'Sidd', grade: 'G4', salary: 40000 },
  { position: 9, name: 'Sathish', grade: 'G4', salary: 38000 },
  { position: 10, name: 'Guru', grade: 'G4', salary: 40000 },
  { position: 11, name: 'Dinesh', grade: 'G6', salary: 40000 },
  { position: 12, name: 'Karthi', grade: 'G6', salary: 43000 },
  { position: 13, name: 'Mari', grade: 'G6', salary: 35000 },
  { position: 14, name: 'Sethu', grade: 'G6', salary: 48000 },
  { position: 15, name: 'Vicky', grade: 'G6', salary: 60000 },
  { position: 16, name: 'Ajith', grade: 'G8', salary: 48000 },
  { position: 17, name: 'Tamil', grade: 'G8', salary: 45000 },
  { position: 18, name: 'Sai', grade: 'G8', salary: 35000 },
  { position: 19, name: 'Anbu', grade: 'G8', salary: 80000 },
  { position: 20, name: 'Aravind', grade: 'G8', salary: 45000 },
];