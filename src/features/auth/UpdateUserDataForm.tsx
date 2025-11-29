import { useState } from "react";
import { useUser } from "./useUser";

import { PAGES } from "@/constants/pages.constants";

import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";

function UpdateUserDataForm() {
    // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
    const { user } = useUser();

    const email = user?.email ?? "";
    const currentFullName = user?.user_metadata?.fullName ?? "";

    const [fullName, setFullName] = useState(currentFullName);
    const [avatar, setAvatar] = useState<File | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label="Dirección email">
                <Input value={email} disabled />
            </FormRow>
            <FormRow label="Nombre completo">
                <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    id="fullName"
                />
            </FormRow>
            <FormRow label="Avatar">
                <FileInput
                    id="avatar"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
                />
            </FormRow>
            <FormRow>
                <Button type="reset" variation="secondary">
                    {PAGES.ACCOUNT.CANCEL}
                </Button>
                <Button>{PAGES.ACCOUNT.UPDATE_ACCOUNT}</Button>
            </FormRow>
        </Form>
    );
}

export default UpdateUserDataForm;
