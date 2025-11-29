import supabase from "./supabase";

type Signup = {
    fullName: string;
    email: string;
    password: string;
};

type Login = {
    email: string;
    password: string;
};

export async function signup({ fullName, email, password }: Signup) {
    let { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: ""
            }
        }
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

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

export async function getCurrentUser() {
    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (!session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error(error.message);
    }

    return null;
}

export async function upadteCurrentUser({
    password,
    fullName,
    avatar
}: {
    password?: string;
    fullName?: string;
    avatar?: string;
}) {
    // Build the update object properly to handle both password and user metadata
    const updateData: {
        password?: string;
        data?: { fullName?: string };
    } = {};

    if (password) updateData.password = password;
    if (fullName) updateData.data = { fullName };

    const { data, error } = await supabase.auth.updateUser(updateData);

    if (error) {
        throw new Error(error.message);
    }

    if (!avatar) return data;

    const fileName = `avatar-${data.user.id}-${Math.random()}`;

    return data;
}
