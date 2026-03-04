import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldError,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../lib/shemas";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "@/features/authSlice";

export function SignUpForm({ className, ...props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
    },
  });

  const { isSubmitting } = form.formState;
  // console.log(isSubmitting);

  async function onSubmit(userCredentials) {
    try {
      const { data } = await axios.post(
        "https://11510.fullstack.clarusway.com/users",
        userCredentials,
      );
      // console.log(data);

      dispatch(updateUserInfo(data));

      toast.success("Login Successfull!", {
        description: `Welcome back, ${data.data.username}`,
      });

      navigate("/stock");
    } catch (error) {
      // console.log("error:", error);
      toast.error("Login Faild", {
        description:
          error.response?.data?.message ||
          error?.message ||
          "Please check your credentials",
      });
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 md:p-8 order-2"
          >
            <FieldGroup className="gap-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Smart Stock System</h1>
                <p className="text-muted-foreground text-balance">
                  Sign up for a new account
                </p>
              </div>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      id="username"
                      placeholder="Your username"
                      aria-invalid={fieldState.invalid}
                      disabled={isSubmitting}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="flex gap-3 flex-col md:flex-row">
                <Controller
                  name="firstName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                      <Input
                        {...field}
                        type="text"
                        id="firstName"
                        placeholder="Your first name"
                        aria-invalid={fieldState.invalid}
                        disabled={isSubmitting}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="lastName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                      <Input
                        {...field}
                        type="text"
                        id="lastName"
                        placeholder="Your last name"
                        aria-invalid={fieldState.invalid}
                        disabled={isSubmitting}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      id="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="m@example.com"
                      disabled={isSubmitting}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="password"
                      disabled={isSubmitting}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>

                    <Input
                      {...field}
                      type="password"
                      id="confirmPassword"
                      disabled={isSubmitting}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Signing up.." : "Sign Up"}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <FieldDescription className="text-center">
                Already have an account{" "}
                <Link
                  to="/sign-in"
                  className="underline underline-offset-2 hover:text-primary"
                >
                  Sign in
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block order-1">
            <img
              src="https://picsum.photos/800/800"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
