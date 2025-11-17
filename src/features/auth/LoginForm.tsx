import { useState, type FormEvent } from "react";
import { useLogin } from "./useLogin";

import { PAGES } from "@/constants/pages.constants";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import Input from "@/ui/Input";
import FormRowVertical from "@/ui/FormRowVertical";
import SpinnerMini from "@/ui/SpinnerMini";

function LoginForm() {
    const [email, setEmail] = useState("ricardo@email.com");
    const [password, setPassword] = useState("Qwerty!23456");
    const { login, isLoggingIn } = useLogin();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!email || !password) {
            return;
        }

        login({ email, password });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label={PAGES.LOGIN.FORM.EMAIL}>
                <Input
                    type="email"
                    id="email"
                    // This makes this form better for password managers
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoggingIn}
                />
            </FormRowVertical>
            <FormRowVertical label={PAGES.LOGIN.FORM.PASSWORD}>
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoggingIn}
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button size="large" disabled={isLoggingIn}>
                    {isLoggingIn ? <SpinnerMini /> : PAGES.LOGIN.FORM.LOGIN}
                </Button>
            </FormRowVertical>
        </Form>
    );
}

export default LoginForm;
