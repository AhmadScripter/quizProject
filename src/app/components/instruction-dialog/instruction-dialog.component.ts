import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-instruction-dialog',
  imports: [],
  templateUrl: './instruction-dialog.component.html',
  styleUrl: './instruction-dialog.component.css'
})
export class InstructionDialogComponent {
  constructor(private dialogRef: MatDialogRef<InstructionDialogComponent>){}
  onUnderstandClick(){
    this.dialogRef.close();
  }
}
