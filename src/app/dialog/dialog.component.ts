import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['Neuf', '2e main', 'Réconditionné'];

  productForm!: FormGroup;
  actionBtn: string = 'Enregistrer';
  constructor(
    private formeBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialofRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit() {
    this.productForm = this.formeBuilder.group({
      nom: ['', Validators.required],
      categorie: ['', Validators.required],
      etat: ['', Validators.required],
      prix: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Mettre à jour';
      this.productForm.controls['nom'].setValue(this.editData.nom);
      this.productForm.controls['categorie'].setValue(this.editData.categorie);
      this.productForm.controls['etat'].setValue(this.editData.etat);
      this.productForm.controls['prix'].setValue(this.editData.prix);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
      // this.productForm.controls['action'].setValue(this.editData.action);
    }
  }

  addProduct() {
   if(!this.editData){
     if (this.productForm.valid) {
       this.api.postProduct(this.productForm.value).subscribe({
         next: (res) => {
           alert('Produit ajouté avec succès');
           this.productForm.reset();
           this.dialofRef.close();
         },
       });
     }
   } else {
      this.updateProduct()
   }
  }

  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert('Produit mis à jour avec succès');
        this.productForm.reset();
        this.dialofRef.close('update');
      },
      error:(err)=>{
        alert('La modification a rencontrée une erreur');
      }
    })
  }

}
