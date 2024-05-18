"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import useGetSingleElementFunc from "../_hooks/getSingleElement";

export default function UpdateForm({ elementId }) {
  const router = useRouter();
  const { data: singleElementData, isLoading, refetch } = useGetSingleElementFunc(elementId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const [error, setError] = useState("");

  useEffect(() => {
    if (singleElementData) {
      setValue("title", singleElementData.title);
      setValue("description", singleElementData.description);
      setValue("email", singleElementData.email);
      setValue("windowNumber", singleElementData.windowNumber);
    }
  }, [singleElementData, setValue]);

  const updateMessage = () => toast.success("Update successful!.");

  const onSubmit = async (values) => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage

    console.log("values::");
    console.log(values);
    try {
      const response = await fetch(`http://localhost:5000/window/${elementId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Include the token in the headers
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        updateMessage();
        console.log("Updated values:", values);
        router.push("/window");
      } else {
        toast.error("Update failed!.");
        setError("Failed to update the element.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Update Window Element
        </h1>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-800"
            >
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                errors.title ? "border-red-500" : ""
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">Title is required</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-800"
            >
              Description
            </label>
            <input
              type="text"
              {...register("description", { required: true })}
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">Description is required</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">Email is required</p>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor="windowNumber"
              className="block text-sm font-semibold text-gray-800"
            >
              Window Number
            </label>
            <input
              type="number"
              {...register("windowNumber", {
                required: "Window Number is required",
                min: {
                  value: 1,
                  message: "Window Number must be between 1 and 3"
                },
                max: {
                  value: 3,
                  message: "Window Number must be between 1 and 3"
                }
              })}
              className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                errors.windowNumber ? "border-red-500" : ""
              }`}
            />
            {errors.windowNumber && (
              <p className="mt-1 text-xs text-red-500">{errors.windowNumber.message}</p>
            )}
          </div>
          {error && <p className="text-red-500">{error}</p>}{" "}
          <div className="mt-2">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
