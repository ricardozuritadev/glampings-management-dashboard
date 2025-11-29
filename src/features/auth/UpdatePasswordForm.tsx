import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";

import { PAGES } from "@/constants/pages.constants";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

type FormData = {
    password: string;
    passwordConfirm: string;
};

function UpdatePasswordForm() {
    const { register, handleSubmit, formState, getValues, reset } =
        useForm<FormData>();
    const { errors } = formState;

    const { updateUser, isUpdating } = useUpdateUser();

    function onSubmit({ password }: FormData) {
        updateUser({ password }, { onSuccess: () => reset() });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label={PAGES.ACCOUNT.PASSWORD} errors={errors}>
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    disabled={isUpdating}
                    {...register("password", {
                        required: PAGES.ACCOUNT.PASSWORD_VALIDATIONS.REQUIRED,
                        minLength: {
                            value: 8,
                            message:
                                PAGES.ACCOUNT.PASSWORD_VALIDATIONS.MIN.replace(
                                    "{min}",
                                    "8"
                                )
                        }
                    })}
                />
            </FormRow>

            <FormRow label={PAGES.ACCOUNT.PASSWORD_CONFIRM} errors={errors}>
                <Input
                    type="password"
                    autoComplete="new-password"
                    id="passwordConfirm"
                    disabled={isUpdating}
                    {...register("passwordConfirm", {
                        required: PAGES.ACCOUNT.PASSWORD_VALIDATIONS.REQUIRED,
                        validate: (value) =>
                            getValues().password === value ||
                            PAGES.ACCOUNT.PASSWORD_VALIDATIONS.MATCH
                    })}
                />
            </FormRow>
            <FormRow>
                <Button
                    onClick={() => reset()}
                    type="reset"
                    variation="secondary"
                >
                    {PAGES.ACCOUNT.CANCEL}
                </Button>
                <Button disabled={isUpdating}>
                    {PAGES.ACCOUNT.UPDATE_PASSWORD}
                </Button>
            </FormRow>
        </Form>
    );
}

export default UpdatePasswordForm;
