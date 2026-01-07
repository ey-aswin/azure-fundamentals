//  Get the List Data

export const getTodoData =async (page:number=0) => {
  const resp =await fetch("https://dummyjson.com/products?limit=10&skip="+page*10);
  const respData = await resp.json();
  // return resp.json();
  return respData.products;
};

export const getUnlimitedTodoData =async (page:number=0) => {
  const resp =await fetch("https://dummyjson.com/products?limit=100000&skip="+page*10);
  const respData = await resp.json();
  // return resp.json();
  return respData.products;
};

