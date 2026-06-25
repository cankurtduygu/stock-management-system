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
import { saleSchema } from "../lib/schemas";
import useStockCall from "../hooks/useStockCall";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectBrands, selectProducts } from "../features/stockSlice";

const emptySaleForm = {
  brandId: "",
  productId: "",
  quantity: "",
  price: "",
};

export function SaleModal({ open, onOpenChange, selectedSale }) {
  const { createStockData, updateStockData, getStockResources } =
    useStockCall();
  const brands = useSelector(selectBrands);
  const products = useSelector(selectProducts);
  const isEditMode = Boolean(selectedSale);

  const selecFieldConfigs = [
    {
      name: "brandId",
      id: "brand",
      label: "Brand",
      placeholder: "Select Brand",
      options: brands,
    },
    {
      name: "productId",
      id: "product",
      label: "Product",
      placeholder: "Select Product",
      options: products,
    },
  ];

  const form = useForm({
    resolver: zodResolver(saleSchema),
    defaultValues: emptySaleForm,
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(formData) {
    const isSuccess = isEditMode
      ? await updateStockData("sales", selectedSale._id, formData)
      : await createStockData("sales", formData);

    if (isSuccess) {
      form.reset();
      onOpenChange(false);
    }
  }

  useEffect(() => {
    if (!open) return;

    if (isEditMode) {
      form.reset({
        brandId: selectedSale.brandId ?? "",
        productId: selectedSale.productId ?? "",
        quantity: selectedSale.quantity ?? "",
        price: selectedSale.price ?? "",
      });
      return;
    }
    form.reset(emptySaleForm);
  }, [selectedSale, form, isEditMode, open]);

  useEffect(() => {
    const requiredResources = ["brands", "products"];

    if (!open) return;

    // getProBrand();
    getStockResources(requiredResources);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Sale" : "Create New Sale"}
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
                name="quantity"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                    <Input
                      {...field}
                      id="quantity"
                      type="number"
                      min="1"
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
              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="price">Price</FieldLabel>
                    <Input
                      {...field}
                      id="price"
                      type="number"
                      min="1"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter unit price"
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
                  ? "Updating Sale..."
                  : "Creating Sale..."
                : isEditMode
                  ? "Update Sale"
                  : "Create Sale"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
