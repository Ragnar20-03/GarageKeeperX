

export interface IBookService {
  service: "car-wash" | "wheel-alignment" | "painting" | "garage",
  cname: string,
  carno: string,
  date: Date,
  address: string,
  email: string,
  phone: string
}