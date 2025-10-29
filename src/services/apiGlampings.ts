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

export async function createGlamping(
    newGlamping: Omit<Glamping, "image"> & { image: File | string | null }
) {
    const imageName =
        typeof newGlamping.image === "object" && newGlamping.image
            ? `${Math.random()}-${newGlamping.image.name}`.replaceAll("/", "")
            : typeof newGlamping.image === "string" && newGlamping.image
              ? `${Math.random()}-${newGlamping.image}`.replaceAll("/", "")
              : null;

    const imagePath = imageName
        ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/glamping-images/${imageName}`
        : null;

    const row = {
        ...newGlamping,
        image: imagePath
    } satisfies Glamping;

    const { data, error } = await supabase.from("glampings").insert([row]).select();

    if (error) {
        console.error(error.message);
        throw new Error("Error al crear el glamping");
    }

    if (imageName && newGlamping.image instanceof File) {
        const { error: storageError } = await supabase.storage
            .from("glamping-images")
            .upload(imageName, newGlamping.image);

        if (storageError) {
            console.error(storageError.message);
            const insertedId = Array.isArray(data) && data.length > 0 ? data[0].id : undefined;
            if (insertedId !== undefined) {
                await supabase.from("glampings").delete().eq("id", insertedId);
                throw new Error("Error al subir la imagen");
            }
        }
    }

    return data;
}
