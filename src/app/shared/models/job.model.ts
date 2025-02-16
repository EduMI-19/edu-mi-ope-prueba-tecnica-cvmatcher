export interface Job {
  job_id: number;
  title: string;
  company: string;
  company_image?: string;
  url: string;
  description: string;
  posted_date: string;
  expiration_date: string;
  location: string;
  salary_min?: number;
  salary_max?: number;
  currency_type: string;
  years_experience: number;
  work_modality_id?: number;
}