import toast from "react-hot-toast";
import { useForm, type FieldValues } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PAGES } from "@/constants/pages.constants";
import { createGlamping } from "@/services/apiGlampings";
import type { Glamping } from "@/types/features/glamping.types";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FileInput from "@/ui/FileInput";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import FormRow from "@/ui/FormRow";

function CreateGlampingForm() {
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;
    const queryClient = useQueryClient();

    const { mutate, isPending: isCreating } = useMutation({
        mutationFn: createGlamping,
        onSuccess: () => {
            toast.success("Glamping creado correctamente");
            queryClient.invalidateQueries({ queryKey: ["glampings"] });
            reset();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    function onSubmit(data: FieldValues) {
        mutate({ ...data, image: data.image[0] } as Glamping);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label={PAGES.GLAMPINGS.FORM.NAME} errors={errors}>
                <Input
                    type="text"
                    id="name"
                    disabled={isCreating}
                    {...register("name", { required: "Este campo es requerido" })}
                />
            </FormRow>

            <FormRow label={PAGES.GLAMPINGS.FORM.CAPACITY} errors={errors}>
                <Input
                    type="number"
                    id="maxCapacity"
                    defaultValue={4}
                    disabled={isCreating}
                    {...register("maxCapacity", {
                        required: "Este campo es requerido",
                        min: {
                            value: 1,
                            message: "El valor mínimo es 1"
                        }
                    })}
                />
            </FormRow>

            <FormRow label={PAGES.GLAMPINGS.FORM.WEEKDAY_PRICE} errors={errors}>
                <Input
                    type="number"
                    id="weekdayPrice"
                    disabled={isCreating}
                    {...register("weekdayPrice", {
                        required: "Este campo es requerido",
                        min: {
                            value: 0,
                            message: "El valor mínimo es 0"
                        }
                    })}
                />
            </FormRow>

            <FormRow label={PAGES.GLAMPINGS.FORM.FRIDAY_PRICE} errors={errors}>
                <Input
                    type="number"
                    id="fridayPrice"
                    disabled={isCreating}
                    {...register("fridayPrice", {
                        required: "Este campo es requerido",
                        min: {
                            value: 0,
                            message: "El valor mínimo es 0"
                        }
                    })}
                />
            </FormRow>

            <FormRow label={PAGES.GLAMPINGS.FORM.SATURDAY_PRICE} errors={errors}>
                <Input
                    type="number"
                    id="saturdayPrice"
                    disabled={isCreating}
                    {...register("saturdayPrice", {
                        required: "Este campo es requerido",
                        min: {
                            value: 0,
                            message: "El valor mínimo es 0"
                        }
                    })}
                />
            </FormRow>

            <FormRow label={PAGES.GLAMPINGS.FORM.DESCRIPTION} errors={errors}>
                <Textarea
                    id="description"
                    defaultValue=""
                    disabled={isCreating}
                    {...register("description", { required: "Este campo es requerido" })}
                />
            </FormRow>

            <FormRow label={PAGES.GLAMPINGS.FORM.IMAGE} errors={errors}>
                <FileInput
                    id="image"
                    accept="image/*"
                    type="file"
                    disabled={isCreating}
                    {...register("image", { required: "Este campo es requerido" })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    {PAGES.GLAMPINGS.FORM.CANCEL}
                </Button>

                <Button disabled={isCreating}>{PAGES.GLAMPINGS.ADD_GLAMPING}</Button>
            </FormRow>
        </Form>
    );
}

export default CreateGlampingForm;
