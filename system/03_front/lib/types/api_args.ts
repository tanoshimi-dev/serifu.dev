import { Customer } from '@/lib/types/customer';
import { TMenteinfo } from '@/lib/types/t_menteinfo';
import { MShiten } from '@/lib/types/m_shiten';
import { ComponentArgsTCustomersTable } from '@/lib/types/component_args';

export interface ApiArgsUserLogin {
  email?:    string | null;
  password?: string | null;
}

export interface ApiArgsUserEmailVerify {
  url?:    string | null;
}

export interface ApiArgsPasswordReset {
  email?:    string | null;
}


export interface ApiArgsUserRegister{
  name?:     string | null;
  email?:    string | null;
  password?: string | null;
}


export interface ApiArgsCustomer {
  mu_usercode?: string | null;
}
export interface ApiArgsCustomerWithMaintenance {
  mu_usercode?: string | null;
  tm_recnum?:   string | null;
}

export interface ApiArgsCustomerUpsert {
  customer_new_flag:    boolean;
  maintenance_new_flag: boolean;
  customer?:            Customer;
  maintenance?:         TMenteinfo;
  input_pdf_file?:      File | null,
}

export interface ApiArgsCustomersUpdateToPermanent {
  target_ids:    string[] | null;
}

export interface ApiArgsCustomerHistories {
  customer_search_type?:   string | null;
  mu_usercode?:            string | null;
}

export interface ApiArgsAccount {
  userid?:   string | null;
  password?: string | null;
}

export interface ApiArgsTemporaryListUpdateStatus {
  updateList?:    string[];
}


export interface ApiArgsGetCustomers extends ComponentArgsTCustomersTable {}

export interface ApiArgsMShitenUpsert extends MShiten {}
