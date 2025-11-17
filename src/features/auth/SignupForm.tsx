import { useForm } from "react-hook-form";

import { PAGES } from "@/constants/pages.constants";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";

type SignupFormData = {
    fullName: string;
    email: string;
    password: string;
    passwordConfirm: string;
};

function SignupForm() {
    const { register, handleSubmit, formState, getValues } =
        useForm<SignupFormData>();
    const { errors } = formState;

    function onSubmit(data: SignupFormData) {
        console.log("data", data);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label={PAGES.SIGNUP.FORM.FULL_NAME} errors={errors}>
                <Input
                    type="text"
                    id="fullName"
                    {...register("fullName", {
                        required: PAGES.SIGNUP.FORM.VALIDATIONS.REQUIRED
                    })}
                />
            </FormRow>

            <FormRow label={PAGES.SIGNUP.FORM.EMAIL} errors={errors}>
                <Input
                    type="email"
                    id="email"
                    {...register("email", {
                        required: PAGES.SIGNUP.FORM.VALIDATIONS.REQUIRED,
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: PAGES.SIGNUP.FORM.VALIDATIONS.EMAIL
                        }
                    })}
                />
            </FormRow>

            <FormRow label={PAGES.SIGNUP.FORM.PASSWORD} errors={errors}>
                <Input
                    type="password"
                    id="password"
                    {...register("password", {
                        required: PAGES.SIGNUP.FORM.VALIDATIONS.REQUIRED,
                        minLength: {
                            value: 8,
                            message: PAGES.SIGNUP.FORM.VALIDATIONS.MIN.replace(
                                "{min}",
                                "8"
                            )
                        }
                    })}
                />
            </FormRow>

            <FormRow label={PAGES.SIGNUP.FORM.PASSWORD_CONFIRM} errors={errors}>
                <Input
                    type="password"
                    id="passwordConfirm"
                    {...register("passwordConfirm", {
                        required: PAGES.SIGNUP.FORM.VALIDATIONS.REQUIRED,
                        validate: (value) =>
                            value === getValues().password ||
                            PAGES.SIGNUP.FORM.VALIDATIONS.PASSWORD_MATCH
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button>{PAGES.SIGNUP.FORM.CREATE_USER}</Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;
