import { useForm, type FieldValues } from "react-hook-form";
import { useEditGlamping } from "./useEditGlamping";
import { useCreateGlamping } from "./useCreateGlamping";

import { PAGES } from "@/constants/pages.constants";
import type { Glamping } from "@/types/features/glamping.types";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FileInput from "@/ui/FileInput";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import FormRow from "@/ui/FormRow";

type CreateOrEditGlampingFormProps = {
    glamping: Glamping | null;
    onClose?: () => void;
};

function CreateOrEditGlampingForm({ glamping = null, onClose }: CreateOrEditGlampingFormProps) {
    const { id: editId, ...editValues } = glamping ?? ({} as Partial<Glamping>);
    const isEditSession = Boolean(editId && glamping);

    const { register, handleSubmit, reset, formState } = useForm({
        defaultValues: isEditSession
            ? {
                  name: editValues.name ?? "",
                  maxCapacity: editValues.maxCapacity ?? 4,
                  weekdayPrice: editValues.weekdayPrice ?? 0,
                  fridayPrice: editValues.fridayPrice ?? 0,
                  saturdayPrice: editValues.saturdayPrice ?? 0,
                  description: editValues.description ?? "",
                  image: editValues.image ?? ""
              }
            : {
                  name: "",
                  maxCapacity: 4,
                  weekdayPrice: 0,
                  fridayPrice: 0,
                  saturdayPrice: 0,
                  description: "",
                  image: ""
              }
    });

    const { errors } = formState;

    const { createGlamping, isCreating } = useCreateGlamping();

    const { editGlamping, isEditing } = useEditGlamping();

    const isWorking = isCreating || isEditing;

    function onSubmit(data: FieldValues) {
        // Handle image: if it's a FileList (new file), get the first file
        // If it's a string (existing URL), keep it
        // If it's empty/undefined, use null
        let image: File | string | null = null;

        if (data.image) {
            if (typeof data.image === "string") {
                // Existing image URL
                image = data.image;
            } else if (data.image instanceof FileList && data.image.length > 0) {
                // New file selected
                image = data.image[0];
            } else if (Array.isArray(data.image) && data.image.length > 0) {
                // Handle array case (react-hook-form sometimes returns arrays)
                image = data.image[0];
            }
        }

        // If editing and no new image was selected, keep the existing image
        if (isEditSession && !image && editValues.image) {
            image = editValues.image;
        }

        const glampingData = {
            ...data,
            image
        };

        if (isEditSession && editId) {
            editGlamping(
                {
                    glamping: glampingData as Omit<Glamping, "image"> & {
                        image: File | string | null;
                    },
                    id: editId
                },
                {
                    onSuccess: () => {
                        onClose?.();
                    }
                }
            );
        } else {
            createGlamping(
                {
                    glamping: glampingData as Omit<Glamping, "image"> & {
                        image: File | string | null;
                    }
                },
                {
                    onSuccess: () => {
                        reset();
                        onClose?.();
                    }
                }
            );
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label={PAGES.GLAMPINGS.FORM.NAME} errors={errors}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register("name", { required: PAGES.GLAMPINGS.FORM.VALIDATIONS.REQUIRED })}
                />
            </FormRow>

            <FormRow label={PAGES.GLAMPINGS.FORM.CAPACITY} errors={errors}>
                <Input
                    type="number"
                    id="maxCapacity"
                    defaultValue={4}
                    disabled={isWorking}
                    {...register("maxCapacity", {
                        required: PAGES.GLAMPINGS.FORM.VALIDATIONS.REQUIRED,
                        min: {
                            value: 1,
                            message: PAGES.GLAMPINGS.FORM.VALIDATIONS.MIN.replace("{min}", "1")
                        }
                    })}
                />
            </FormRow>

            <FormRow label={PAGES.GLAMPINGS.FORM.WEEKDAY_PRICE} errors={errors}>
                <Input
                    type="number"
                    id="weekdayPrice"
                    disabled={isWorking}
                    {...register("weekdayPrice", {
                        required: PAGES.GLAMPINGS.FORM.VALIDATIONS.REQUIRED,
                        min: {
                            value: 0,
                            message: PAGES.GLAMPINGS.FORM.VALIDATIONS.MIN.replace("{min}", "0")
                        }
                    })}
                />
            </FormRow>

            <FormRow label={PAGES.GLAMPINGS.FORM.FRIDAY_PRICE} errors={errors}>
                <Input
                    type="number"
                    id="fridayPrice"
                    disabled={isWorking}
                    {...register("fridayPrice", {
                        required: PAGES.GLAMPINGS.FORM.VALIDATIONS.REQUIRED,
                        min: {
                            value: 0,
                            message: PAGES.GLAMPINGS.FORM.VALIDATIONS.MIN.replace("{min}", "0")
                        }
                    })}
                />
            </FormRow>

            <FormRow label={PAGES.GLAMPINGS.FORM.SATURDAY_PRICE} errors={errors}>
                <Input
                    type="number"
                    id="saturdayPrice"
                    disabled={isWorking}
                    {...register("saturdayPrice", {
                        required: PAGES.GLAMPINGS.FORM.VALIDATIONS.REQUIRED,
                        min: {
                            value: 0,
                            message: PAGES.GLAMPINGS.FORM.VALIDATIONS.MIN.replace("{min}", "0")
                        }
                    })}
                />
            </FormRow>

            <FormRow label={PAGES.GLAMPINGS.FORM.DESCRIPTION} errors={errors}>
                <Textarea
                    id="description"
                    defaultValue=""
                    disabled={isWorking}
                    {...register("description", {
                        required: PAGES.GLAMPINGS.FORM.VALIDATIONS.REQUIRED
                    })}
                />
            </FormRow>

            <FormRow label={PAGES.GLAMPINGS.FORM.IMAGE} errors={errors}>
                <FileInput
                    id="image"
                    accept="image/*"
                    type="file"
                    disabled={isWorking}
                    {...register("image", {
                        required: isEditSession ? false : PAGES.GLAMPINGS.FORM.VALIDATIONS.REQUIRED
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    variation="secondary"
                    type="button"
                    onClick={() => {
                        reset();
                        onClose?.();
                    }}
                >
                    {PAGES.GLAMPINGS.FORM.CANCEL}
                </Button>

                <Button disabled={isWorking}>
                    {isEditSession ? PAGES.GLAMPINGS.FORM.EDIT : PAGES.GLAMPINGS.ADD_GLAMPING}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateOrEditGlampingForm;
