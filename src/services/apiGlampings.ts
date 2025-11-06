import supabase from "./supabase";

import { PAGES } from "@/constants/pages.constants";
import type { Glamping } from "@/types/features/glamping.types";

export async function getGlampings() {
    const { data, error } = await supabase.from("glampings").select("*");

    if (error) {
        console.error(error.message);
        throw new Error(PAGES.GLAMPINGS.TOASTS.ERROR_GET);
    }

    return data;
}

export async function deleteGlamping(id: number) {
    const { error } = await supabase.from("glampings").delete().eq("id", id);

    if (error) {
        console.error(error.message);
        throw new Error(PAGES.GLAMPINGS.TOASTS.ERROR_DELETE);
    }
}

export async function createOrEditGlamping(
    newGlamping: Omit<Glamping, "image"> & { image: File | string | null },
    id?: number
) {
    const hasImagePath =
        typeof newGlamping?.image === "string" &&
        newGlamping.image.startsWith(import.meta.env.VITE_SUPABASE_URL);

    const imageName =
        typeof newGlamping.image === "object" && newGlamping.image
            ? `${Math.random()}-${newGlamping.image.name}`.replaceAll("/", "")
            : typeof newGlamping.image === "string" && newGlamping.image && !hasImagePath
              ? `${Math.random()}-${newGlamping.image}`.replaceAll("/", "")
              : null;

    const imagePath = hasImagePath
        ? newGlamping.image
        : imageName
          ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/glamping-images/${imageName}`
          : null;

    const row = {
        ...newGlamping,
        image: imagePath as string | null
    } satisfies Glamping;

    let data;
    let error;

    // Create new glamping
    if (!id) {
        const result = await supabase.from("glampings").insert([row]).select().single();
        data = result.data;
        error = result.error;
    } else {
        // Edit glamping
        const result = await supabase
            .from("glampings")
            .update({ ...row })
            .eq("id", id)
            .select()
            .single();
        data = result.data;
        error = result.error;
    }

    if (error) {
        console.error(error.message);
        throw new Error(id ? PAGES.GLAMPINGS.TOASTS.ERROR_UPDATE : PAGES.GLAMPINGS.TOASTS.ERROR);
    }

    // Upload image if it's a new file
    if (imageName && newGlamping.image instanceof File) {
        const { error: storageError } = await supabase.storage
            .from("glamping-images")
            .upload(imageName, newGlamping.image);

        if (storageError) {
            console.error(storageError.message);
            // If it was a create operation, delete the created row
            if (!id && data) {
                await supabase.from("glampings").delete().eq("id", data.id);
            }
            throw new Error(PAGES.GLAMPINGS.TOASTS.ERROR_UPLOAD_IMAGE);
        }
    }

    return data;
}
