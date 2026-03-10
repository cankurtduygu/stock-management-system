import { DevTool } from '@hookform/devtools';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { firmSchema } from '../lib/schemas';
import useStockCall from '../hooks/useStockCall';
import { useEffect } from 'react';

const emptyFirmForm = {
  name: '',
  phone: '',
  address: '',
  image: '',
};

export function FirmModal({ open, onOpenChange, selectedFirm }) {
  const isEditMode = Boolean(selectedFirm);

  const form = useForm({
    resolver: zodResolver(firmSchema),
    defaultValues: emptyFirmForm,
  });
  // console.log("useForm'un Tüm Yetenekleri:", form);

  const { isSubmitting } = form.formState;

  const { getStockData, createStockData, updateStockData } = useStockCall();

  async function onSubmit(formData) {
    // const isSuccess = await createStockData("firms", formData);
    // if (isSuccess) {
    //   form.reset();
    //   onOpenChange(false);
    // }

    const isSuccess = isEditMode
      ? await updateStockData("firms", selectedFirm._id, formData)
      : await createStockData("firms", formData);

    if (isSuccess) {
      form.reset();
      onOpenChange(false);
    }
  }

    useEffect(() => {
    if (!open) return;
    if (isEditMode) {
      form.reset({
        name: selectedFirm.name ?? "",
        phone: selectedFirm.phone ?? "",
        address: selectedFirm.address ?? "",
        image: selectedFirm.image ?? "",
      });
    } else {
      form.reset(emptyFirmForm);
    }
  }, [selectedFirm, form, isEditMode, open]);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button>Create New Firm</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Firm' : 'Create New Firm'}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? 'Update the selected firm information.'
                : 'Create a new firm by filling the form below.'}
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
                      <FieldLabel htmlFor="name">Firm Name</FieldLabel>
                      <Input
                        {...field}
                        id="name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter firm name"
                        autoComplete="off"
                        //   disabled={isSubmitting}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="phone">Firm Phone Number</FieldLabel>
                      <Input
                        {...field}
                        id="phone"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter firm phone"
                        autoComplete="off"
                        //   disabled={isSubmitting}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="address"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="address">Firm Address</FieldLabel>
                      <Input
                        {...field}
                        id="address"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter firm address"
                        autoComplete="off"
                        //   disabled={isSubmitting}
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
                      <FieldLabel htmlFor="image">Firm Image</FieldLabel>
                      <Input
                        {...field}
                        id="image"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter firm image"
                        autoComplete="off"
                        //   disabled={isSubmitting}
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
                    ? 'Updating Firm...'
                    : 'Creating Firm...'
                  : isEditMode
                    ? 'Update Firm'
                    : 'Create Firm'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <DevTool control={form.control} />{' '}
      {/* Ekranın köşesine küçük bir panel gelir */}
    </>
  );
}
