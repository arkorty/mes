import { Component } from '@angular/core';
import { CommonService } from '../../services/common/common.service';
import Notiflix from 'notiflix';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ICategory, ISubCategory, ISubSubCategory } from '../../Models/Interface/ICategoryList';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  isUpdate: boolean = false;
  productId: any;
  productObj: any = {
    name: '',
    description: '',
    parentId: null,
    picture: '',
  };
  productList: any[] = [];
  productForm!: FormGroup;
  dummyCategories: any = [
    {
      _id: '1',
      parentId: '',
      description: 'Fruits',
      imageUrl: '',
      name: 'Fruits',
      subCategories: [
        {
          _id: '1-1',
          parentId: '1',
          description: 'Citrus Fruits',
          imageUrl: '',
          name: 'Citrus',
          subSubCategories: [
            {
              _id: '1-1-1',
              parentId: '1-1',
              description: 'Oranges',
              imageUrl: '',
              name: 'Orange',
            },
            {
              _id: '1-1-2',
              parentId: '1-1',
              description: 'Lemons',
              imageUrl: '',
              name: 'Lemon',
            },
          ],
        },
        {
          _id: '1-2',
          parentId: '1',
          description: 'Berries',
          imageUrl: '',
          name: 'Berries',
          subSubCategories: [
            {
              _id: '1-2-1',
              parentId: '1-2',
              description: 'Strawberries',
              imageUrl: '',
              name: 'Strawberry',
            },
            {
              _id: '1-2-2',
              parentId: '1-2',
              description: 'Blueberries',
              imageUrl: '',
              name: 'Blueberry',
            },
          ],
        },
      ],
    },
    {
      _id: '2',
      parentId: '',
      description: 'Vegetables',
      imageUrl: '',
      name: 'Vegetables',
      subCategories: [
        {
          _id: '2-1',
          parentId: '2',
          description: 'Leafy Vegetables',
          imageUrl: '',
          name: 'Leafy',
          subSubCategories: [
            {
              _id: '2-1-1',
              parentId: '2-1',
              description: 'Spinach',
              imageUrl: '',
              name: 'Spinach',
            },
            {
              _id: '2-1-2',
              parentId: '2-1',
              description: 'Lettuce',
              imageUrl: '',
              name: 'Lettuce',
            },
          ],
        },
      ],
    },
  ];
  selectedCategory: ICategory | null = null;
  selectedSubCategory: ISubCategory | null = null;
  categoryList: ICategory[] = [];
  constructor(
    private router: Router,
    private common: CommonService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.productId = params['id'];
      if (this.productId != '0') {
        this.isUpdate = true;
        this.GetProductDetails(this.productId);
      } else {
        //console.log(this.specialisationId);
      }
    });

    this.productForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      slug: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      subCategoryId: new FormControl(''),
      subSubCategoryId: new FormControl(''),
      description: new FormControl('', [Validators.required]),
      shortDescription: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
      ]),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      salePrice: new FormControl(0, [Validators.min(0)]),
      coverImage: new FormControl('', [Validators.required]),
      otherImages: this.fb.array([]),
      variations: this.fb.array([]),
    });
  }

  ngOnInit() {}

  //--------- form getters -----------------
  get otherImages() {
    return this.productForm.get('otherImages') as FormArray;
  }


  async GetProductDetails(id: any) {
    Notiflix.Loading.circle();
    try {
      let response = (await this.common.GetProductDetails(id)).data;
      Notiflix.Loading.remove();
      if (response) {
        this.productObj = response.data;
      }
    } catch (error: any) {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure(error.response.data.message);
    }
  }

  async GetCategories() {
    try {
      Notiflix.Loading.circle();
      let response = (await this.common.GetCategories()).data;
      if (response) {
        this.categoryList = response.data;
      }
    } catch (error: any) {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure(error.response.data.message);
    }
  }

  // ----------images start -----------------
  AddOtherImage() {
    this.otherImages.push(new FormControl(''));
  }

  RemoveOtherImage(index: number) {
    this.otherImages.removeAt(index);
  }
//-----------images end -------------------
  async OnFormSubmit() {
    try {
      if (this.productForm.valid) {
        Notiflix.Loading.circle();
        let response = (await this.common.UpsertProduct(this.productForm.value)).data;
        debugger;
        Notiflix.Notify.success(response.message);
        Notiflix.Loading.remove();
        this.router.navigate(['/categories']);
        
      } else {
        Notiflix.Notify.failure('Please fill all the required fields');
      }
     
    } catch (error: any) {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure(error.response.data.message);
    }
  }

  OnFileChange(event: Event, fieldName: string, index?: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (fieldName === 'coverImage') {
          this.productForm.patchValue({
            coverImage: reader.result // Store the image data or URL for cover image
          });
        } else if (fieldName === 'otherImages' && index !== undefined) {
          this.otherImages.at(index).patchValue({
            imageUrl: reader.result // Store the image data or URL for additional images
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }

//catgeories start--------------------------
  OnCategoryChange(event: any) {
    const categoryId = event.target.value;
    this.selectedCategory = this.dummyCategories.filter((item: any) => item._id == categoryId)[0];
    this.productForm.patchValue({categoryId:categoryId, subCategoryId: '', subSubCategoryId: '' });
    this.selectedSubCategory = null; // Reset selected subcategory
  }

  OnSubCategoryChange(event:any) {
    const subCategoryId = event.target.value;
    this.selectedSubCategory =this.selectedCategory?.subCategories.filter((sub:any)=>sub._id === subCategoryId)[0] || null
    this.productForm.patchValue({subCategoryId:subCategoryId, subSubCategoryId: '' });
  }

  OnSubSubCategoryChange(event:any){
    const subSubCategoryId = event.target.value;
    this.productForm.patchValue({subSubCategoryId:subSubCategoryId });
    console.log(this.productForm.value)
  }
//-categories end ----------------------------------------------------

//variations start ---------------------
AddVariation() {
  const variationGroup = this.fb.group({
    size: ['', Validators.required],
    color: ['', Validators.required],
    gender: ['', Validators.required],
    weight: [null, Validators.required],
    height: [null, Validators.required],
    width: [null, Validators.required],
    breadth: [null, Validators.required],
    quantity: [null, Validators.required],
    price: [null, Validators.required],
    image: [null] // Optional image field for variations
  });
  this.productForm.value.variations.push(variationGroup);
}








//variations end ----------











}
