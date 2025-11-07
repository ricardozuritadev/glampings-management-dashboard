import { PAGES } from "@/constants/pages.constants";
import UpdateSettingsForm from "@/features/settings/UpdateSettingsForm";

import Heading from "@/ui/Heading";
import Row from "@/ui/Row";

export default function Settings() {
    return (
        <>
            <Row>
                <Heading as="h1">{PAGES.GLAMPINGS.HEADER}</Heading>
                <p>Filtrar / ordenar</p>
            </Row>

            <Row type="vertical">
                <UpdateSettingsForm />
            </Row>
        </>
    );
}
