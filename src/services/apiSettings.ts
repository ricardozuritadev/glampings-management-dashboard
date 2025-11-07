import supabase from "./supabase";

import { PAGES } from "@/constants/pages.constants";
import type { TablesUpdate } from "@/types/database.types";

export async function getSettings() {
    const { data, error } = await supabase.from("settings").select("*").single();

    if (error) {
        console.error(error.message);
        throw new Error(PAGES.SETTINGS.TOASTS.ERROR_GET);
    }

    return data;
}

export async function updateSettings(settings: TablesUpdate<"settings">) {
    const { data, error } = await supabase.from("settings").update(settings).eq("id", 1).single();

    if (error) {
        console.error(error.message);
        throw new Error(PAGES.SETTINGS.TOASTS.ERROR_UPDATE);
    }

    return data;
}
