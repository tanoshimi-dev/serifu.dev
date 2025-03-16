import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
// import { apiUrl, apiUrlSuffix } from '../../../env'
const url = process.env.NEXT_PUBLIC_API_URL??'';
const suffix = process.env.NEXT_PUBLIC_API_URL_SUFFIX??'';
const apiUrl = url + suffix;

interface Links {
  label?: string;
  seq?: string;
}

interface ProductsState {
  selectedStatus: string;
  selectedProduct: Product;
  status: string;
  products: Product[];
  serverError: boolean | undefined;

  // selectedProductImages: string[];
  // selectedMakerLinks: Links[];
  // selectedProductLinks: Links[];
  // selectedMaterialLinks: Links[];
  // previousFilter: {};
  // appliedFilter: {};

}

interface Product {
  pid: number;
  pname: string;
  jancode?: string;
}


// interface SearchCondition {
//   // pid?: number;
//   // pname?: string;
//   // jancode?: string;
//   category?: string;
//   sortAsc?: boolean;
//   page?: number;
// }


interface SearchFilter {
  page: number;
  maker?: string | null;
  type?: string | null;
  characters: Array<string>;
  dataAscending?: boolean;
}

const initialState: ProductsState = {
  selectedStatus: "",
  selectedProduct: {} as Product,
  status: 'idle',
  products: [],
  serverError: undefined,

  // selectedProductImages: [],
  // selectedMakerLinks: [],
  // selectedProductLinks: [],
  // selectedMaterialLinks: [],
  // previousFilter: {} as SearchFilter,
  // appliedFilter: {} as SearchFilter,

};


export const getProducts = createAsyncThunk(
  "products/get", 
  async (params: SearchFilter, thankApi) => {

    let queryParams = `?`
    // if (params !== undefined) {
    //   Object.keys(params).forEach((key, i) => {
    //     queryParams += `${key}=${params[key]}`
    //     if (i < Object.keys(params).length - 1) {
    //       queryParams += `&`
    //     }
    //   });
    // }
    
    queryParams += `&page=${params.page}`

    // if (params.makers.length > 0) {
    //   queryParams += `&makers=${params.makers.join(',')}`
    // }
    if (params.maker) {
      queryParams += `&maker=${params.maker}`
    }

    // if (params.types.length > 0) {
    //   queryParams += `&types=${params.types.join(',')}`
    // }
    if (params.type) {
      queryParams += `&type=${params.type}`
    }

    if (params.characters.length > 0) {
      queryParams += `&characters=${params.characters.join(',')}`
    }
    
    console.log('★API★ getProducts url', `${apiUrl}api/products${queryParams}`);
    
    queryParams += `&sort_direction=${params.dataAscending ? 'asc' : 'desc'}`

    const res = await fetch(`${apiUrl}api/products${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        //'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    
    });

    const data = await res.json(); // Extract JSON data from the response
    console.log('★API★ getProducts ', data);
    return data;
  }

);


export const selectProduct: any = createAsyncThunk(
  "products/select", 
  async (id:number, thankApi) => {

    //console.log('★API★ selectProduct url', `${apiUrl}api/product/${id}`);
    if (!id) return 
    try {
      const response = await fetch(`${apiUrl}api/product/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${localStorage.getItem('token')}`
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        //console.error('💀　HTTP error', response.status);
        return;
      }
      // console.log(response);
      const data = await response.json(); // Extract JSON data from the response
      //console.log('★API★ selectProduct ', data);
      return data;

    } catch (error) {
      //console.error('★API★ getNews error', error);
      //return error;
    } 
    
  }

);



export const uploadProducts = createAsyncThunk(
  "products/upload", 
  async (productsFile, thunkApi) => {
    const formData = new FormData();
    formData.append('products_file', productsFile as any);

    const res = await fetch(`${apiUrl}api/products/upload`, {
      method: 'POST',
      credentials: "include",
      body: formData
    });
    const data = await res.json();
    return data;

  }
);

export const deleteProducts = createAsyncThunk(
  "products/delete", 
  async (targetIds, thunkApi) => {
    const formData = new FormData();
    formData.append('ids', targetIds as any);

    console.log('★API★ delete targetIds', targetIds);

    const res = await fetch(`${apiUrl}api/products/delete`, {
      method: 'POST',
      credentials: "include",
      body: formData
    });
    const data = await res.json();
    return data;

  }
);

// export const updateUser: any = createAsyncThunk("user/update", async (params: any) => {

//   //console.log('★API★ select update url', `${apiUrl}api/users/update`, params);
  
//   // let xsrfToken = document.cookie.split('; ').find(row => row.startsWith("XSRF-TOKEN"));
//   let xsrfToken = document.cookie.split('; ').find(row => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN??''));
//   if (xsrfToken) {
//       xsrfToken = xsrfToken.split('=')[1]
//   }

//   //console.log('★API★ token', decodeURIComponent(xsrfToken ?? ''));

//   const res = await fetch(`${apiUrl}api/user/update`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-XSRF-TOKEN': decodeURIComponent(xsrfToken ?? ''),
//       // 'X-XSRF-TOKEN': xsrfToken ?? '',
//       'Accept': 'application/json'  
//       //'Authorization': `Bearer ${localStorage.getItem('token')}`
//     },
//     credentials: "include",
//     body: JSON.stringify({
//       id: params.id,
//       name: params.name,
//     }),
    
//   });
//   const data = await res.json(); // Extract JSON data from the response
//   //console.log('★API★ updateUser ', data);
//   return data;

// });


const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getProducts.pending, (state, action) => {
        state.status = 'pending'
        state.selectedStatus = ''
        state.products = []
        // state.selectedProductImages= []
        // state.previousFilter = {} as SearchFilter
        // state.appliedFilter = {} as SearchFilter
        //console.log('pending', state, action, getProducts)
        state.serverError = undefined
      });
      builder.addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'success'
        // console.log('args', action.meta.arg, state, action.payload.data, getProducts)
        // console.log('payload', action.meta.arg, state, action.payload.data, getProducts)
        // state.previousFilter = action.meta.arg
        state.products = action.payload
      });
      builder.addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed'
      }); 
      
      // selectProduct
      builder.addCase(selectProduct.pending, (state, action) => {
        state.status = ''
        state.selectedStatus = 'pending'
        state.selectedProduct = {} as Product
        // state.selectedProductImages= []
        // state.selectedMakerLinks = []
        // state.selectedProductLinks = []
        // state.selectedMaterialLinks = []
        // state.appliedFilter = {} as SearchFilter

      });
      builder.addCase(selectProduct.fulfilled, (state, action) => {
        state.selectedStatus = 'success'
        // console.log('payload', action.payload)
        if(action.payload?.data){
          state.selectedProduct = action.payload.data.product
          // state.selectedProductImages = action.payload.data.imageNames
          // state.selectedMakerLinks = action.payload.data.makerLinks
          // state.selectedProductLinks = action.payload.data.productLinks
          // state.selectedMaterialLinks = action.payload.data.materialLinks
          // state.appliedFilter = state.previousFilter
        }

      });
      builder.addCase(selectProduct.rejected, (state, action) => {
        state.selectedStatus = 'failed'
      });

      // uploadProducts
      builder.addCase(uploadProducts.pending, (state, action) => {
        state.status = 'pending'
        state.products = []
        state.serverError = false
      });
      builder.addCase(uploadProducts.fulfilled, (state, action) => {
        state.status = 'success'
          console.log('★API★ uploadProducts', action.payload);

        if(action.payload?.data){
          state.products = action.payload.data
          state.serverError = action.payload.serverError
        }
      });
      builder.addCase(uploadProducts.rejected, (state, action) => {
        state.status = 'failed'
      });

      // deleteProducts
      builder.addCase(deleteProducts.pending, (state, action) => {
        state.status = 'pending'
        state.products = []
        state.serverError = false
      });
      builder.addCase(deleteProducts.fulfilled, (state, action) => {
        state.status = 'success'
          console.log('★API★ deleteProducts', action.payload);

        if(action.payload?.data){
          state.products = action.payload.data
          state.serverError = action.payload.serverError
        }
      });
      builder.addCase(deleteProducts.rejected, (state, action) => {
        state.status = 'failed'
      });

    }

})

export const status = (state: any) => state.products.status;
export const productsData = (state: any) => state.products.products;
export const serverError = (state: any) => state.products.serverError;

export const selectedStatus = (state: any) => state.products.selectedStatus;
export const selectedProduct = (state: any) => state.products.selectedProduct;
export const selectedProductImages = (state: any) => state.products.selectedProductImages;
// export const selectedMakerLinks = (state: any) => state.products.selectedMakerLinks;
// export const selectedProductLinks = (state: any) => state.products.selectedProductLinks;
// export const selectedMaterialLinks = (state: any) => state.products.selectedMaterialLinks;

export const appliedFilter = (state: any) => state.products.appliedFilter;

//export const { addPosts, addPost, updatePost, deletePost } = usersSlice.actions;
export default productsSlice.reducer;