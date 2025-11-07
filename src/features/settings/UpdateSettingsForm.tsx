import { useSettings } from "./useSettings";
import { useEditSetting } from "./useEditSettings";

import { PAGES } from "@/constants/pages.constants";

import Spinner from "@/ui/Spinner";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";

export default function UpdateSettingsForm() {
    const { isPending, settings } = useSettings();
    const { isEditing, updateSetting } = useEditSetting();

    if (isPending) return <Spinner />;
    if (!settings) return null;

    const { maxBookingLength, maxGuestsPerBooking, minBookingLength } = settings;

    function handleUpdate(
        e: React.FocusEvent<HTMLInputElement>,
        field: keyof NonNullable<typeof settings>
    ) {
        const { value } = e.target;
        const number = parseInt(value);

        if (isNaN(number)) return;

        updateSetting({
            [field]: number
        });
    }

    return (
        <Form>
            <FormRow label={PAGES.SETTINGS.MAX_BOOKING_LENGTH}>
                <Input
                    type="number"
                    id="maxBookingLength"
                    name="maxBookingLength"
                    defaultValue={maxBookingLength ?? undefined}
                    onBlur={(e) => handleUpdate(e, "maxBookingLength")}
                    disabled={isEditing}
                />
            </FormRow>

            <FormRow label={PAGES.SETTINGS.MAX_GUESTS_PER_BOOKING}>
                <Input
                    type="number"
                    id="maxGuestsPerBooking"
                    name="maxGuestsPerBooking"
                    defaultValue={maxGuestsPerBooking ?? undefined}
                    onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
                    disabled={isEditing}
                />
            </FormRow>

            <FormRow label={PAGES.SETTINGS.MIN_BOOKING_LENGTH}>
                <Input
                    type="number"
                    id="minBookingLength"
                    name="minBookingLength"
                    defaultValue={minBookingLength ?? undefined}
                    onBlur={(e) => handleUpdate(e, "minBookingLength")}
                    disabled={isEditing}
                />
            </FormRow>
        </Form>
    );
}
