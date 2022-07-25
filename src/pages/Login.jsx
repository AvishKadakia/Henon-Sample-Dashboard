import React from 'react';
import { Google } from '../components';

export default function Login() {


    return (
        <div className="relative grid place-items-center h-screen  overflow-hidden">
            <div className=" w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
                    Sign in
                </h1>

                <div className="flex mt-4 gap-x-2 align-middle justify-center">

                    <Google />

                </div>


            </div>
        </div >
    );
}