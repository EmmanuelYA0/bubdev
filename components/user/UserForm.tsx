'use client';

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import Loading from '@/app/loading';
import { PenBox } from 'lucide-react';


const UserFormSchema = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string(),
});

const UserForm = () => {

    const [userInfo, setUserInfo] = useState<User>({});
    const { data: session } = useSession();
    const UserUsername = session?.user?.username;
    const [isLoading, setIsLoading] = useState(true);
    const [formInitialized, setFormInitialized] = useState(false);

    const form = useForm<z.infer<typeof UserFormSchema>>({
        resolver: zodResolver(UserFormSchema),
        defaultValues: {}, // Initialiser avec des valeurs par défaut vides
    });



    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await fetch(`/api/user/${UserUsername}`)
                if (response.ok) {
                    const data = await response.json();
                    console.log('data.user:', data.user);
                    setUserInfo(data.user);
                    console.log('userInfo:', userInfo);
                    console.log('session value', session?.user.username)
                    form.reset({
                        ...data.user,
                        name: data.user.name,
                        username: data.user.username,
                        email: data.user.email,
                    });
                    setFormInitialized(true);
                    
                } else {
                    console.error('Erreur lors de la récupération des informations utilisateur');
                }
            } catch (err) {
                console.error(err)
            } finally {
                if (userInfo !== null) {
                    setIsLoading(false);
                }
            }
        }
        getUserInfo();
    }, [UserUsername, session, form])



    const onSubmit = async (values: z.infer<typeof UserFormSchema>) => {
        try {
            const response = await fetch(`/api/user/${UserUsername}`, {
                method: 'POST',
                body: JSON.stringify({ values }),
            })

            if (response.ok) {

                toast.success("Mise a jour reussie");
                window.location.reload()
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Quelque chose n'a pas fonctionné ! Veuillez réessayer.");
        }

    };

    if (isLoading) {
        return <Loading />;
    } else if (!formInitialized && session) {
        return <Loading />;
    } else if (!formInitialized && !session) {
        return <p className=' flex items-center justify-center text-3xl text-red-500 h-screen'>Vous devez être authentifié pour accéder à cette page !! </p>
    }
    else {
        return (
            <div className='flex flex-col top-28 w-[850px] mb-[200px] mx-auto space-y-5 text-gray-700 bg-white rounded-md border px-20 py-20 border-slate-50 shadow-sm'>
                <h1 className='text-2xl font-bold -mt-5 mb-12 ml-5'>Mon Profil</h1>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className=" mb-5">
                                    <FormLabel className="text-lg mb-3 ">Nom d'utilisateur</FormLabel>
                                    <FormControl>
                                        <Input placeholder="votre Nom d'utlisateur" className='max-w-64 my-3' {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="mb-5">
                                    <FormLabel className="text-lg mb-3">Nom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Votre Nom"  className='max-w-72 my-3' {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="mb-5">
                                    <FormLabel className="text-lg mb-3">Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Votre Email"  className='max-w-80 my-3' {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button type='submit' className='absolute right-0 w-32 bg-pourpre text-white hover:bg-redhot mt-6 '>
                            <PenBox />
                            Modifier
                        </Button>
                    </form>
                </Form>

            </div>
        )
    }
}
export default UserForm