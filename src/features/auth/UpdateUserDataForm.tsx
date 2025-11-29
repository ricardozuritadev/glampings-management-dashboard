import { useState } from "react";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

import { PAGES } from "@/constants/pages.constants";

import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";

function UpdateUserDataForm() {
    const { user } = useUser();

    const email = user?.email ?? "";
    const currentFullName = user?.user_metadata?.fullName ?? "";

    const { updateUser, isUpdating } = useUpdateUser();

    const [fullName, setFullName] = useState(currentFullName);
    const [avatar, setAvatar] = useState<File | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!fullName) {
            return;
        }

        updateUser(
            {
                fullName,
                avatar: avatar || undefined
            },
            {
                onSuccess: () => {
                    setAvatar(null);
                    e.currentTarget.reset();
                }
            }
        );
    }

    function handleCancel() {
        setFullName(currentFullName);
        setAvatar(null);
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
                <Button
                    type="reset"
                    variation="secondary"
                    disabled={isUpdating}
                    onClick={handleCancel}
                >
                    {PAGES.ACCOUNT.CANCEL}
                </Button>
                <Button disabled={isUpdating}>
                    {PAGES.ACCOUNT.UPDATE_ACCOUNT}
                </Button>
            </FormRow>
        </Form>
    );
}

export default UpdateUserDataForm;
