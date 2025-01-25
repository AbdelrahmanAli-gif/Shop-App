import supabase from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase.from("Products").select("*");
  if (error) {
    throw new Error("Products could not be loaded");
  }
  return data;
}

export async function getSingleProduct(id) {
  const { data, error } = await supabase
    .from("Products")
    .select("*")
    .eq("id", id);
  if (error) {
    throw new Error("Product could not be loaded");
  }
  return data[0];
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('Categories')
    .select('*')
  if (error) {
    throw new Error("Categories could not be loaded");
  }
  return data;
}

export async function updateCart(id, newCart) {
  console.log(JSON.parse(newCart), 'api')
  const { data, error } = await supabase
    .from("Users")
    .update({ 'cart': newCart })
    .eq("id", id)
    .select();
  console.log(data, 'data');
  if (error) {
    throw new Error("A problem has occurred while updating your cart");
  }
  return data;
}

export async function updateOrders(id, newOrders) {
  const { data, error } = await supabase
    .from("Users")
    .update({ 'orders': newOrders })
    .eq("id", id)
    .select();
  if (error) {
    throw new Error("A problem has occurred while updating your cart");
  }
  return data;
}

export async function insertProduct(product) {
  const { name, price, description, images, category } = product
  const { data, error } = await supabase
    .from('Products')
    .insert([
      { name, price, description, images, category },
    ])
    .select()
  if (error) {
    throw new Error("A problem has occurred while updating your cart");
  }
  return data;
}