import { PAGES } from "@/constants/pages.constants";

import Heading from "@/ui/Heading";
import SignupForm from "@/features/auth/SignupForm";

export default function Users() {
    return (
        <>
            <Heading as="h1">{PAGES.USERS.HEADER}</Heading>
            <SignupForm />
        </>
    );
}
