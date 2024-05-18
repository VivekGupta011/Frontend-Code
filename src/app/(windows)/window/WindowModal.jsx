"use client";
import { useState } from "react";
import CloseIcon from "../../../utils/CloseIcon";
import { useRouter } from 'next/navigation';
import useCreateWindowElement from "../_hooks/addWindowElement";
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const WindowModal = ({ key,index,onCancel, onConfirm, modaltitle, modalbutton }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [randomImage, setRandomImage] = useState(getRandomImage());

  function getRandomImage() {
    return "https://placekitten.com/200/300"; // Example placeholder image URL
  }

  const router = useRouter();
  const queryClient = useQueryClient();
  const successHandler = () => {
    toast.success('Window Element added!');
    queryClient.invalidateQueries({
      queryKey: ['Single window Details']
    });
  };

  const errorHandler = (error) => {
    toast.error('Window Element deleted!');
  };


  // module mutation
  const CreateWindowElement = useCreateWindowElement(successHandler,errorHandler);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { name, description, email, randomImage,index:index+1 };
    console.log(formData); // Log the form data

    const payload={
        title:name,
        description,
        email,
        windowNumber:index+1

    }
    CreateWindowElement.mutateAsync(payload);
    onConfirm(formData);
  };

  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="important-width rounded-lg bg-[#FBFBFB] md:w-auto">
        <div className="p-5">
          <div className="flex justify-between">
            <div>
              <p className="py-3 text-[20px] font-bold">{modaltitle}</p>
            </div>
            <div onClick={onCancel} className="flex items-center">
              <CloseIcon />
            </div>
          </div>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="font-bold py-6 flex items-center">
              <div className="w-1/3">
                <h1 className="font-bold text-[18px]">Description:</h1>
              </div>
              <div className="w-2/3">
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>
            <div className="font-small py-6 flex items-center">
              <div className="w-1/3">
                <h2 className="font-bold text-[18px]">Name:</h2>
              </div>
              <div className="w-2/3">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>
            <div className="font-small py-6 flex items-center">
              <div className="w-1/3">
                <h2 className="font-bold text-[18px]">Email:</h2>
              </div>
              <div className="w-2/3">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>

            <hr />
            <div className="flex justify-between py-3">
              <div>
                <button
                  className="text-grey rounded border border-black bg-transparent px-4 py-2 font-medium"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  className="rounded border border-[#E84480] bg-[#E84480] px-4 py-2 font-bold text-white"
                  type="submit"
                >
                  {modalbutton}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WindowModal;
