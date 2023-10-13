import React, { useEffect, useCallback } from 'react'
import { Input, RTE } from './index'
import { useForm } from 'react-hook-form'
import services from '../Appwrite/Database'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const EditPost = () => {
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    const { register, handleSubmit, control, getValues, setValue, watch, } = useForm()
    // console.log(watch())
    const Submit = async (data) => {
        console.log(data)
        if (data) {
            const file = await services.uploadFile(data.image[0])
            console.log(file)
            if (file) {
                const fileId = file.$id
                data.featureImage = fileId
               const DB = await services.createPost({ ...data, userId: userData.$id })
               console.log(DB.$id)
               if (DB) navigate(`/post/${DB.$id}`)
            }
        }
    }
    //Difficut Code
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);
    return (
        <>
            <form onSubmit={handleSubmit(Submit)}>
                <div className=' flex justify-between p-4'>
                    <div>
                        <Input
                            {...register("title", { required: true })}
                            lable="Title: "
                            type='text'
                            placeholder="Enter Title...."
                            className=" rounded-lg p-2 w-96 my-3"
                        />
                        <Input
                            {...register("slug", { required: true })}
                            lable="Slug: "
                            type='text'
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                            }}
                            className=" rounded-lg p-2 w-96 my-3"
                        />
                    </div>
                    <div>
                        <Input
                            {...register("image", { required: true })}
                            lable='Upload Image'
                            type='file'
                            className='rounded-lg p-2 w-96 my-3'
                        />
                        <button className='rounded-lg p-2 w-96 my-3 bg-blue-800'>Submite</button>
                    </div>
                </div>
            </form>
            <RTE control={control} />

        </>
    )
}

export default EditPost