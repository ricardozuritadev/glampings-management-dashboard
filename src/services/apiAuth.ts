import supabase from "./supabase";

type Login = {
    email: string;
    password: string;
};

export async function login({ email, password }: Login) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
