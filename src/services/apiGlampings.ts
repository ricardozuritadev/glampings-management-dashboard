import type { Glamping } from "@/types/features/glamping.types";
import supabase from "./supabase";

export async function getGlampings() {
    const { data, error } = await supabase.from("glampings").select("*");

    if (error) {
        console.error(error.message);
        throw new Error("Error al obtener los glampings");
    }

    return data;
}

export async function deleteGlamping(id: number) {
    const { error } = await supabase.from("glampings").delete().eq("id", id);

    if (error) {
        console.error(error.message);
        throw new Error("Error al eliminar el glamping");
    }
}

export async function createGlamping(newGlamping: Glamping) {
    const { data, error } = await supabase.from("glampings").insert([newGlamping]).select();

    if (error) {
        console.error(error.message);
        throw new Error("Error al crear el glamping");
    }

    return data;
}
