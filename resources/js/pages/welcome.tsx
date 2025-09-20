import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { useForm , Head, Link, usePage } from '@inertiajs/react';
import { useState } from "react";
import { motion } from "framer-motion";


import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { request } from '@/routes/password';
import { Form } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}



export default function Welcome({ status, canResetPassword }: LoginProps) {
    const { auth } = usePage<SharedData>().props;
    const [activeForm, setActiveForm] = useState<"login" | "register" | "trace" | null>(null);
    const loginForm = useForm({ user_name: "", password: "" });
    const registerForm = useForm({ name: "", user_name: "", email: "", password: "" });
    const traceForm = useForm({ national_id: "" });


    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row lg:min-h-[500px] lg:max-h-[500px]">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                              {!activeForm && (
                        <div className="flex flex-col gap-4 animate-fade-in">
                            <p className="text-lg font-medium text-center md:text-left">
                                Welcome to the Institute of Graduate Studies & Research Portal
                            </p>
                            <div className="h-full justify-end mt-10 flex flex-col gap-4">

                                <p className="text-center md:text-left">
                                    Please choose an option to proceed:
                                </p>

                                <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                                    <button
                                        onClick={() => setActiveForm("login")}
                                        className="inline-block rounded-sm border border-black bg-[#1b1b18] px-5 py-1.5 text-sm leading-normal text-white hover:border-black hover:bg-black dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:border-white dark:hover:bg-white"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => setActiveForm("register")}
                                        className="inline-block rounded-sm border border-black bg-[#1b1b18] px-5 py-1.5 text-sm leading-normal text-white hover:border-black hover:bg-black dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:border-white dark:hover:bg-white"
                                    >
                                        Register
                                    </button>
                                    <button
                                        onClick={() => setActiveForm("trace")}
                                        className="inline-block rounded-sm border border-black bg-[#1b1b18] px-5 py-1.5 text-sm leading-normal text-white hover:border-black hover:bg-black dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:border-white dark:hover:bg-white"
                                    >
                                        Trace
                                    </button>
                                </div>

                            </div>

                        </div>

                    )}

                    {activeForm === "login" && (


           <Form
    {...AuthenticatedSessionController.store.form()}
    resetOnSuccess={['password']}
    className="flex flex-col gap-6"
>
    {({ processing, errors }) => (
        <>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="user_name">Username</Label>
                    <Input
                        id="user_name"
                        type="text"
                        name="user_name"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="username"
                        placeholder="Enter your username"
                    />
                    <InputError message={errors.user_name} />
                </div>

                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        {canResetPassword && (
                            <TextLink
                                href={request()}
                                className="ml-auto text-sm"
                                tabIndex={5}
                            >
                                Forgot password?
                            </TextLink>
                        )}
                    </div>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        required
                        tabIndex={2}
                        autoComplete="current-password"
                        placeholder="Password"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="flex items-center space-x-3">
                    <Checkbox
                        id="remember"
                        name="remember"
                        tabIndex={3}
                    />
                    <Label htmlFor="remember">Remember me</Label>
                </div>

                <Button
                    type="submit"
                    className="mt-4 w-full"
                    tabIndex={4}
                    disabled={processing}
                    data-test="login-button"
                >
                    {processing && (
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                    )}
                    Log in
                </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
                Don't remember your password ?{' '}
                <TextLink
                        href={request()}
                        className="ml-auto text-sm"
                        tabIndex={5}
                    >
                        Reset
                </TextLink>

            </div>

            <button
                type="button"
                onClick={() => setActiveForm(null)}
                className="mt-2 w-full text-sm text-gray-500"
            >
                Back
            </button>
        </>
    )}
</Form>



                    )}

                    {activeForm === "register" && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                registerForm.post(route("register"));
                            }}
                            className="animate-slide-down"
                        >
                            <h2 className="mb-4 text-lg font-semibold">Register</h2>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={registerForm.data.name}
                                onChange={(e) => registerForm.setData("name", e.target.value)}
                                className="mb-3 w-full rounded border px-3 py-2"
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                value={registerForm.data.user_name}
                                onChange={(e) => registerForm.setData("user_name", e.target.value)}
                                className="mb-3 w-full rounded border px-3 py-2"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={registerForm.data.email}
                                onChange={(e) => registerForm.setData("email", e.target.value)}
                                className="mb-3 w-full rounded border px-3 py-2"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={registerForm.data.password}
                                onChange={(e) => registerForm.setData("password", e.target.value)}
                                className="mb-3 w-full rounded border px-3 py-2"
                            />
                            <button
                                type="submit"
                                className="w-full rounded bg-green-600 px-4 py-2 text-white"
                            >
                                Register
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveForm(null)}
                                className="mt-2 w-full text-sm text-gray-500"
                            >
                                Back
                            </button>
                        </form>
                    )}

                    {activeForm === "trace" && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                traceForm.post(route("trace"));
                            }}
                            className="animate-slide-down"
                        >
                            <h2 className="mb-4 text-lg font-semibold">Trace Request</h2>
                            <input
                                type="text"
                                placeholder="Enter National ID"
                                value={traceForm.data.national_id}
                                onChange={(e) => traceForm.setData("national_id", e.target.value)}
                                className="mb-3 w-full rounded border px-3 py-2"
                            />
                            <button
                                type="submit"
                                className="w-full rounded bg-orange-600 px-4 py-2 text-white"
                            >
                                Trace
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveForm(null)}
                                className="mt-2 w-full text-sm text-gray-500"
                            >
                                Back
                            </button>
                        </form>
                    )}


                        </div>
                        <div className="relative flex flex-col items-center justify-start -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg bg-[#ffffff] lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg dark:bg-[#ffffff]">
                            <motion.div
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="relative flex flex-col items-center justify-center -mb-px aspect-[335/376] h-full w-full shrink-0
                                        overflow-hidden rounded-t-lg bg-[#ffffff] lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px]
                                        lg:rounded-t-none lg:rounded-r-lg dark:bg-[#ffffff]"
                            >

                                <motion.img
                                    src="/au-logo.svg"
                                    alt="Welcome"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                                    className="max-h-72 object-contain m-4 p-6 lg:mb-0 lg:max-w-full bg-white rounded-lg"
                                />

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                    className="text-center text-xl font-semibold text-gray-800"
                                >
                                    Institute of Graduate Studies & Research
                                </motion.p>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9, duration: 0.8 }}
                                    className="text-center mt-4 text-xl font-semibold text-gray-800"
                                >
                                    معهد الدراسات العليا والبحوث
                                </motion.p>
                                 <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2, duration: 0.8 }}
                                    className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-xs sm:text-sm md:text-base font-semibold text-gray-600"
                                >
                                    Developed by Mina Hawarei
                                </motion.p>
                            </motion.div>

                            <div className="absolute inset-0 rounded-t-lg shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-t-none lg:rounded-r-lg dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]" />
                        </div>


                    </main>

                </div>

                <div className="hidden h-14.5 lg:block"></div>

            </div>
           <p className="text-center text-sm text-gray-700 dark:text-gray-200">
                Copyright © 2025 Mina Hawarei
            </p>
        </>
    );
}
