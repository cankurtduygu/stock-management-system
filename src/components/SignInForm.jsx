import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '../lib/shemas';
import { Link, useNavigate } from 'react-router-dom';
import { da } from 'zod/locales';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../features/authSlice';

export default function SignInForm({ className, ...props }) {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isSubmitting } = form.formState;
  // console.log(isSubmitting);

  async function onSubmit(userCredentials) {
    console.log(userCredentials);
    try{
      const { data } = await axios.post('https://11121.fullstack.clarusway.com/auth/login',userCredentials);
      console.log(data);

      dispatch(updateUserInfo(data)); // authSlice'daki updateUserInfo reducer'ini dispatch ederek kullanici bilgilerini ve token'ini store'a kaydediyoruz. Bu sayede diger componentlerde useSelector hook'u ile auth slice'indaki currentUser veya token bilgisine erisebiliriz.

      navigate('/stock'); // login islemi basarili olduktan sonra kullaniciyi stock sayfasina yonlendiriyoruz.


      toast.success("Login Successful", {
        description:`Welcome back, ${data.user.username}!`,
      });

    }catch (error) {
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
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Acme Inc account
                </p>
              </div>
              {/* <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field> */}

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
                      // disabled={isSubmitting}
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
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Link
                        to="#"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      {...field}
                      type="password"
                      id="password"
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
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="#">Sign up</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
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
