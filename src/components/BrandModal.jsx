import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { brandSchema } from "../lib/schemas";
import useStockCall from "../hooks/useStockCall";
import { useEffect } from "react";

const emptyBrandForm = {
  name: "",
  phone: "",
  address: "",
  image: "",
};

export function BrandModal({ open, onOpenChange, selectedBrand }) {
  const { createStockData, updateStockData } = useStockCall();
  const isEditMode = Boolean(selectedBrand);

  const form = useForm({
    resolver: zodResolver(brandSchema),
    defaultValues: emptyBrandForm,
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(formData) {
    // const isSuccess = await createStockData("brands", formData);
    // if (isSuccess) {
    //   form.reset();
    //   onOpenChange(false);
    // }

    const isSuccess = isEditMode
      ? await updateStockData("brands", selectedBrand._id, formData)
      : await createStockData("brands", formData);

    if (isSuccess) {
      form.reset();
      onOpenChange(false);
    }
  }

  useEffect(() => {
    if (!open) return;
    if (isEditMode) {
      form.reset({
        name: selectedBrand.name ?? "",
        phone: selectedBrand.phone ?? "",
        address: selectedBrand.address ?? "",
        image: selectedBrand.image ?? "",
      });
    } else {
      form.reset(emptyBrandForm);
    }
  }, [selectedBrand, form, isEditMode, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Create New Brand</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Brand" : "Create New Brand"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the selected brand information."
              : "Create a new brand by filling the form below."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Brand Name</FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter brand name"
                      autoComplete="off"
                      disabled={isSubmitting}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="image">Brand Image</FieldLabel>
                    <Input
                      {...field}
                      id="image"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter brand image"
                      autoComplete="off"
                      disabled={isSubmitting}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button type="submit">
              {isSubmitting
                ? isEditMode
                  ? "Updating Brand..."
                  : "Creating Brand..."
                : isEditMode
                  ? "Update Brand"
                  : "Create Brand"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
