import { PAGES } from "@/constants/pages.constants";

import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import UpdateUserDataForm from "@/features/auth/UpdateUserDataForm";

export default function Account() {
    return (
        <>
            <Heading as="h1">{PAGES.ACCOUNT.HEADER}</Heading>

            <Row type="vertical">
                <Heading as="h3">{PAGES.ACCOUNT.UPDATE_DATA}</Heading>
                <UpdateUserDataForm />
            </Row>

            <Row type="vertical">
                <Heading as="h3">{PAGES.ACCOUNT.UPDATE_PASSWORD}</Heading>
                <p>Formulario para actualizar la contraseña</p>
            </Row>
        </>
    );
}
