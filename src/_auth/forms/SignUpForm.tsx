import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { SignUpValidation } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/shared/Loader"
import { Link } from "react-router-dom"
import { createUserAccount } from "@/lib/appwrite/api"
import { useToast } from "@/components/ui/use-toast"


const SignUpForm = () => {

  // Toast
  const { toast } = useToast()

  // Loading sign
  const isLoading = false;

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    const newUser = await createUserAccount(values);
    
    if(!newUser){
      return toast({title: "Sign up failed. Please try again."});
    }

    // const session = await signInAccount()

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
              {isLoading ?(
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