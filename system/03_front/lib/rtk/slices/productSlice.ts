import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
// import { apiUrl, apiUrlSuffix } from '../../../env'
const url = process.env.NEXT_PUBLIC_API_URL??'';
const suffix = process.env.NEXT_PUBLIC_API_URL_SUFFIX??'';
const apiUrl = url + suffix;


interface ProductState {
  status: string;
  product: Product;
  serverError: boolean | undefined;
}

interface Product {
  id: number;
  pid: string | null;
  brand_id: number | null;
  name: string | null;
  product_code: string | null;
  color: string | null;
  item_code: string | null;
  size: string | null;
  material: string | null;
  sales_price: number | null;
  size_detail: string | null;
  stock: number | null;
  discount_rate: number | null;
  url: string | null;
}

const initialState: ProductState = {
  status: 'idle',
  product: {} as Product,
  serverError: undefined,
};



export const selectProduct: any = createAsyncThunk(
  "product/select", 
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

export const upsertProduct: any = createAsyncThunk(
  "product/upsert", 
  async (params: any) => {

  console.log('★API★ update product url', `${apiUrl}api/product/update`, params);

  const formData = new FormData();

  if (params?.id){
    formData.append('id', params?.id);
  }
  formData.append('pid', params?.pid);
  formData.append('brand_id', params?.brand_id);
  formData.append('name_kr', params?.name_kr);
  formData.append('name_en', params?.name_en);
  formData.append('product_code', params?.product_code);
  formData.append('item_code', params?.item_code);

  if (params?.product_file){
    formData.append('product_file', params?.product_file);
  }

  let xsrfToken = document.cookie.split('; ').find(row => row.startsWith(process.env.NEXT_PUBLIC_XSRF_TOKEN??''));
  // console.log('★API★ xsrfToken', xsrfToken);

  if (xsrfToken) {
      xsrfToken = xsrfToken.split('=')[1]
  }
  const res = await fetch(`${apiUrl}api/product/upsert`, {
    method: 'POST',
    // headers: {
    //   'X-XSRF-TOKEN': decodeURIComponent(xsrfToken ?? ''),
    // },
    credentials: "include",
    body: formData
    
  });
  const data = await res.json(); // Extract JSON data from the response
  // console.log('★API★ upsertNews ', data);
  return data;

});


const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      
      // selectProduct
      builder.addCase(selectProduct.pending, (state, action) => {
        state.status = ''
        state.product = {} as Product
        state.serverError = undefined

      });
      builder.addCase(selectProduct.fulfilled, (state, action) => {
        state.status = 'success'
        console.log('payload', action.payload.data)
        if(action.payload?.data){
          state.product = action.payload.data
        }

      });
      builder.addCase(selectProduct.rejected, (state, action) => {
        state.status = 'failed'
      });

      // updateProduct
      builder.addCase(upsertProduct.pending, (state, action) => {
        state.status = 'pending'
        state.product = {} as Product
        state.serverError = false
      });
      builder.addCase(upsertProduct.fulfilled, (state, action) => {
        state.status = 'success'
          console.log('★API★ updateProudct', action.payload);

        if(action.payload?.data){
          state.product = action.payload.data
          state.serverError = action.payload.serverError
        }
      });
      builder.addCase(upsertProduct.rejected, (state, action) => {
        state.status = 'failed'
      });

    }

})

export const status = (state: any) => state.product.status;
export const data = (state: any) => state.product.product;
export const serverError = (state: any) => state.product.serverError;

//export const { addPosts, addPost, updatePost, deletePost } = usersSlice.actions;
export default productSlice.reducer;