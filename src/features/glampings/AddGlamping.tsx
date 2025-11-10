import { useState } from "react";

import { PAGES } from "@/constants/pages.constants";

import Button from "@/ui/Button";
import CreateOrEditGlampingForm from "./CreateOrEditGlampingForm";
import Modal from "@/ui/Modal";

export default function AddGlamping() {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    return (
        <div>
            <Button onClick={() => setIsOpenModal((isOpen) => !isOpen)}>
                {PAGES.GLAMPINGS.ADD_GLAMPING}
            </Button>
            {isOpenModal && (
                <Modal onClose={() => setIsOpenModal(false)}>
                    <CreateOrEditGlampingForm
                        glamping={null}
                        onCloseModal={() => setIsOpenModal(false)}
                    />
                </Modal>
            )}
        </div>
    );
}
