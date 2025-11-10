import { PAGES } from "@/constants/pages.constants";

import Button from "@/ui/Button";
import CreateOrEditGlampingForm from "./CreateOrEditGlampingForm";
import { Modal } from "@/ui/Modal";

export default function AddGlamping() {
    return (
        <Modal>
            <Modal.Trigger opens={PAGES.GLAMPINGS.MODALS.GLAMPING_FORM}>
                <Button>{PAGES.GLAMPINGS.ADD_GLAMPING}</Button>
            </Modal.Trigger>

            <Modal.Content name={PAGES.GLAMPINGS.MODALS.GLAMPING_FORM}>
                <CreateOrEditGlampingForm glamping={null} />
            </Modal.Content>
        </Modal>
    );
}
