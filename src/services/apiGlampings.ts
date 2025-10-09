import supabase from "./supabase";

export async function getGlampings() {
    const { data, error } = await supabase.from("glampings").select("*");

    if (error) {
        console.error(error.message);
        throw new Error("Failed to fetch glampings");
    }

    return data;
}
