import supabase from "./supabase";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

type Signup = {
    fullName: string;
    email: string;
    password: string;
};

type Login = {
    email: string;
    password: string;
};

// Create a service role client for admin operations (bypasses RLS and email confirmation)
function getServiceRoleClient() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

    if (!serviceRoleKey) {
        return null;
    }

    return createClient<Database>(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}

export async function signup({ fullName, email, password }: Signup) {
    // Use service role client for admin user creation (bypasses email confirmation)
    const serviceRoleClient = getServiceRoleClient();

    if (serviceRoleClient) {
        // Admin user creation - bypasses email confirmation
        const { data, error } = await serviceRoleClient.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // Auto-confirm email for admin-created users
            user_metadata: {
                fullName,
                avatar: ""
            }
        });

        if (error) {
            throw new Error(error.message);
        }

        // Normalize return value to match auth.signUp structure
        return {
            user: data.user,
            session: null // Admin-created users don't get a session automatically
        };
    } else {
        // Fallback to regular signup if service role key is not available
        const { data, error } = await supabase.auth.signUp({
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
    avatar?: File;
}) {
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

    const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);

    if (storageError) {
        throw new Error(storageError.message);
    }

    const { data: userData, error: userError } = await supabase.auth.updateUser(
        {
            data: {
                avatar: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`
            }
        }
    );

    if (userError) {
        throw new Error(userError.message);
    }

    return userData;
}
