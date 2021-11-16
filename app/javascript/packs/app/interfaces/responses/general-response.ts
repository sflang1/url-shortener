export interface GeneralResponse<T> {
  success: boolean
  data: T
  message: string[]
}