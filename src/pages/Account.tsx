import { ACCOUNT_PAGES } from "@/constants/pages/account.constants";

import Row from "@/ui/Row";
import Heading from "@/ui/Heading";

export default function Account() {
    return (
        <>
            <Heading as="h1">{ACCOUNT_PAGES.UPDATE_ACCOUNT}</Heading>

            <Row>
                <Heading as="h3">{ACCOUNT_PAGES.UPDATE_DATA}</Heading>
                <p>Formulario para actualizar los datos del usuario</p>
            </Row>

            <Row>
                <Heading as="h3">{ACCOUNT_PAGES.UPDATE_PASSWORD}</Heading>
                <p>Formulario para actualizar la contraseña</p>
            </Row>
        </>
    );
}
