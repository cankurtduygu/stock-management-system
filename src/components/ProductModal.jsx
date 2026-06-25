import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { productSchema } from "../lib/schemas";
import useStockCall from "../hooks/useStockCall";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectBrands, selectCategories } from "../features/stockSlice";

const emptyProductForm = {
  brandId: "",
  categoryId: "",
  quantity: "0",
  name: "",
};

export function ProductModal({ open, onOpenChange, selectedProduct }) {
  const { createStockData, updateStockData, getStockResources } =
    useStockCall();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const isEditMode = Boolean(selectedProduct);

  const selecFieldConfigs = [
    {
      name: "brandId",
      id: "brand",
      label: "Brand",
      placeholder: "Select Brand",
      options: brands,
    },
    {
      name: "categoryId",
      id: "category",
      label: "Category",
      placeholder: "Select Category",
      options: categories,
    },
  ];

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: emptyProductForm,
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(formData) {
    const isSuccess = isEditMode
      ? await updateStockData("products", selectedProduct._id, formData)
      : await createStockData("products", formData);

    if (isSuccess) {
      form.reset();
      onOpenChange(false);
    }
  }

  useEffect(() => {
    if (!open) return;

    if (isEditMode) {
      form.reset({
        brandId: selectedProduct.brandId ?? "",
        categoryId: selectedProduct.categoryId ?? "",
        quantity: selectedProduct.quantity ?? "",
        name: selectedProduct.name ?? "",
      });
      return;
    }
    form.reset(emptyProductForm);
  }, [selectedProduct, form, isEditMode, open]);

  useEffect(() => {
    const requiredResources = ["brands", "categories"];
    if (!open) return;

    // getCatBrand();
    getStockResources(requiredResources);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Product" : "Create New Product"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the selected purchase information."
              : "Create a new purchase by filling the form below."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
            <FieldGroup>
              {/* {JSON.stringify(form.formState.errors)} */}
              {selecFieldConfigs.map(
                ({ name, id, label, placeholder, options }) => (
                  <Controller
                    name={name}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={id}>{label}</FieldLabel>
                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id={id}
                            aria-invalid={fieldState.invalid}
                            className="min-w-30"
                          >
                            <SelectValue placeholder={placeholder} />
                          </SelectTrigger>
                          <SelectContent position="item-aligned">
                            <SelectItem value="auto">Select {label}</SelectItem>
                            <SelectSeparator />
                            {options.map((option) => (
                              <SelectItem key={option._id} value={option._id}>
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                ),
              )}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      type="text"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter name"
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
                name="quantity"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                    <Input
                      {...field}
                      id="quantity"
                      type="number"
                      min="0"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter quantity"
                      autoComplete="off"
                      disabled={isSubmitting}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div />
            </FieldGroup>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button type="submit">
              {isSubmitting
                ? isEditMode
                  ? "Updating Product..."
                  : "Creating Product..."
                : isEditMode
                  ? "Update Product"
                  : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
