export const mockVouchers = {
  result: [
    {
      id: 1,
      voucherName: "Giảm 50% Trà sữa",
      image: null,
      price: 100,
      rate: 2,
      numberOfItems: 100,
      numberOfItemsAvailable: 50,
      state: true,
      brandId: 1
    },
    {
      id: 2,
      voucherName: "Giảm 30% Cà phê",
      image: null,
      price: 80,
      rate: 1.5,
      numberOfItems: 200,
      numberOfItemsAvailable: 150,
      state: true,
      brandId: 1
    },
    {
      id: 3,
      voucherName: "Mua 1 tặng 1",
      image: null,
      price: 150,
      rate: 3,
      numberOfItems: 50,
      numberOfItemsAvailable: 20,
      state: false,
      brandId: 1
    }
  ],
  currentPage: 1,
  pageSize: 10,
  pageCount: 1,
  rowCount: 3,
  totalCount: 3
}; 