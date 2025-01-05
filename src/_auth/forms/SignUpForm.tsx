import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { SignUpValidation } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"



const SignUpForm = () => {

  // Navigate
  const navigate = useNavigate();

  // Toast
  const { toast } = useToast()

  // AuthContext
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // Hooks
  const { mutateAsync: createUserAccount, isPending: isCreatingUser } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

 
/*************  ✨ Codeium Command ⭐  *************/
/**
 * Handles the submission of the sign-up form.
 * 
 * @param values - The form values validated against the SignUpValidation schema, 
 *                 containing user information such as name, username, email, and password.
 * 
 * This function creates a new user account with the provided values. 
 * If successful, it attempts to sign in the user. 
 * If both account creation and sign-in are successful, it checks the authentication status.
 * On successful authentication, the form is reset and the user is navigated to the home page.
 * Displays a toast notification for any failure during the process.
 */

/******  a34ea67c-3ea5-499d-a5d2-3148508ec5ca  *******/
  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    const newUser = await createUserAccount(values);
    
    if(!newUser){
      return toast({title: "Sign up failed. Please try again."});
    };

    const session = await signInAccount({
      email: values.email,
      password: values.password
    });

    if(!session){
      return toast({title: "Sign in failed. Please try again."})
    };

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn){
      form.reset();
      navigate('/');
    } else {
      return toast({title: "Sign in failed. Please try again."})
    }
  
  }

  return (
    <Form {...form}>

      <div className="sm:w-420 flex-center">
        <img src="/assets/images/logo.svg" alt="logo" className="w-9 h-auto mr-2"/>
        <h1 className="h2-bold md:h1-bold">Blackout</h1>
      </div>
      <div className="sm:w-420 flex-center flex-col">
        <h2 className="h3-bold md:h3-bold mt-2">Create a new account</h2>
        <p className="small-medium md:base-regular mt-1">Connect with new people on Blackout.</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your name" className="text-dark-1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your username" className="text-dark-1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your e-mail" className="text-dark-1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" className="text-dark-1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="border border-white">
              {isCreatingUser ?(
                <div className="flex-center gap-2">
                  <Loader /> Loading...
                </div>
              ): "Submit"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-1">
            Already have an account?
            <Link to='/sign-in' className="text-primary base-semibold ml-1">Log in</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignUpForm