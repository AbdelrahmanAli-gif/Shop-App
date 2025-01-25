import supabase from "./supabase";

export async function getUser(email, password) {
    const { data, error } = await supabase
        .from('Users')
        .select("*")
        .eq('email', email);
    if (data.length !== 0 && data[0].password === password) return data[0];
    if (error) {
        throw new Error("Invalid email or password");
    }
    return false;
}

export async function getUserById(id) {
    const { data, error } = await supabase
        .from('Users')
        .select("*")
        .eq('id', id);
    if (error) {
        throw new Error("Invalid user id");
    }
    return data[0];
}

export async function addUser(email, password) {
    const { data, error } = await supabase
        .from('Users')
        .insert([
            { email, password },
        ])
        .select()
    if (error) {
        throw new Error("An error occurred while creating your account");
    }
    return data;
}

export async function getAllUsers() {
    const { data, error } = await supabase
        .from('Users')
        .select('*')
    if (error) {
        throw new Error("An error occurred while getting users info");
    }
    return data;
}

export async function getAllOrders() {
    let { data, error } = await supabase
        .from('Users')
        .select('id, orders')
    if (error) {
        throw new Error("An error occurred while getting orders info");
    }
    return data;
}
