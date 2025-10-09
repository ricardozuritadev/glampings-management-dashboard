import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import { PAGES } from "@/constants/pages.constants";

export default function Account() {
    return (
        <>
            <Heading as="h1">{PAGES.ACCOUNT.HEADER}</Heading>

            <Row>
                <Heading as="h3">{PAGES.ACCOUNT.UPDATE_DATA}</Heading>
                <p>Formulario para actualizar los datos del usuario</p>
            </Row>

            <Row>
                <Heading as="h3">{PAGES.ACCOUNT.UPDATE_PASSWORD}</Heading>
                <p>Formulario para actualizar la contraseña</p>
            </Row>
        </>
    );
}
