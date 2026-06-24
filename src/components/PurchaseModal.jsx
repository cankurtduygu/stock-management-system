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
import { purchaseSchema } from "../lib/schemas";
import useStockCall from "../hooks/useStockCall";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectBrands,
  selectFirms,
  selectProducts,
} from "../features/stockSlice";

const emptyPurchaseForm = {
  firmId: "",
  brandId: "",
  productId: "",
  quantity: "",
  price: "",
};

export function PurchaseModal({ open, onOpenChange, selectedPurchase }) {
  const { createStockData, updateStockData, getStockResources } =
    useStockCall();
  const firms = useSelector(selectFirms);
  const brands = useSelector(selectBrands);
  const products = useSelector(selectProducts);
  const isEditMode = Boolean(selectedPurchase);

  const selecFieldConfigs = [
    {
      name: "firmId",
      id: "firm",
      label: "Firm",
      placeholder: "Select Firm",
      options: firms,
    },
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
    resolver: zodResolver(purchaseSchema),
    defaultValues: emptyPurchaseForm,
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(formData) {
    const isSuccess = isEditMode
      ? await updateStockData("purchases", selectedPurchase._id, formData)
      : await createStockData("purchases", formData);

    if (isSuccess) {
      form.reset();
      onOpenChange(false);
    }
  }

  useEffect(() => {
    if (!open) return;

    if (isEditMode) {
      form.reset({
        firmId: selectedPurchase.firmId ?? "",
        brandId: selectedPurchase.brandId ?? "",
        productId: selectedPurchase.productId ?? "",
        quantity: selectedPurchase.quantity ?? "",
        price: selectedPurchase.price ?? "",
      });
      return;
    }
    form.reset(emptyPurchaseForm);
  }, [selectedPurchase, form, isEditMode, open]);

  useEffect(() => {
    const requiredResources = ["firms", "brands", "products"];

    if (!open) return;

    // getStockData("firms");
    // getStockData("brands");
    // getStockData("products");
    // getProFirBrand();
    getStockResources(requiredResources);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Purchase" : "Create New Purchase"}
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
              {/* <Controller
                name="firmId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="firm">Firm</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="firm"
                        aria-invalid={fieldState.invalid}
                        className="min-w-30"
                      >
                        <SelectValue placeholder="Select firm" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectItem value="auto">Select Firm</SelectItem>
                        <SelectSeparator />
                        {firms.map((firm) => (
                          <SelectItem key={firm._id} value={firm._id}>
                            {firm.name}
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
              <Controller
                name="brandId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="brand">Brand</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="brand"
                        aria-invalid={fieldState.invalid}
                        className="min-w-30"
                      >
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectItem value="auto">Select Brand</SelectItem>
                        <SelectSeparator />
                        {brands.map((brand) => (
                          <SelectItem key={brand._id} value={brand._id}>
                            {brand.name}
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
              <Controller
                name="productId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="product">Product</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="product"
                        aria-invalid={fieldState.invalid}
                        className="min-w-30"
                      >
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectItem value="auto">Select Product</SelectItem>
                        <SelectSeparator />
                        {products.map((product) => (
                          <SelectItem key={product._id} value={product._id}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              /> */}

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
                  ? "Updating Purchase..."
                  : "Creating Purchase..."
                : isEditMode
                  ? "Update Purchase"
                  : "Create Purchase"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
