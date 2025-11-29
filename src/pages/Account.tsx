import { PAGES } from "@/constants/pages.constants";

import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import UpdateUserDataForm from "@/features/auth/UpdateUserDataForm";
import UpdatePasswordForm from "@/features/auth/UpdatePasswordForm";

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
                <UpdatePasswordForm />
            </Row>
        </>
    );
}
