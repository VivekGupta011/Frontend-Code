import React, { useState, useEffect } from "react";
import WindowModal from "./WindowModal";
import { useRouter } from "next/navigation"; // Changed from next/navigation
import { formatDate } from "../../../utils/DateFormatter";
import DeleteIcon from "../../../utils/DeleteIcon";
import EditIcon from "../../../utils/EditIcon";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteMutationWindow from "../_hooks/DeleteWindowElement";

const ChildContainer = ({ name, number, index, windowElement }) => {
  const [isModalOpen, setIsModalOpen] = useState([false, false, false]);
  const [windowIndex, setWindowIndex] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const successHandler = () => {
    queryClient.invalidateQueries({
      queryKey: ["Single window Details"],
    });
    toast.error("Window deleted successfully!");
  };

  useEffect(() => {
    setWindowIndex(index);
    const user = localStorage.getItem("user");
    if (!user) {
      // If user is not logged in, redirect to login route
      router.push("/login");
    }
  }, []);

  const errorHandler = () => {
    toast.success("Window deletion failed!");
  };

  const deleteUserMutation = useDeleteMutationWindow(
    successHandler,
    errorHandler
  );

  const handleDeleteConfirm = (id) => {
    deleteUserMutation.mutate(id);
  };

  const handleOpenModal = (index) => {
    const updatedModalState = [...isModalOpen];
    updatedModalState[index] = true;
    setIsModalOpen(updatedModalState);
  };

  const handleCloseModal = () => {
    setIsModalOpen([false, false, false]);
  };

  const handleConfirmDelete = () => {
    handleCloseModal();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <div className="child-container overflow-auto max-h-[calc(100vh-100px)] border-t border-r border-gray-300">
        <div className="sm:flex sm:flex-wrap gap-4">
          <button
            onClick={() => handleOpenModal(index)}
            className="font-bold p-5"
          >
            <a
              href="#"
              className="group relative inline-block focus:outline-none focus:ring"
            >
              <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
              <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                Add new Card
              </span>
            </a>
          </button>

          

          <div className="w-full sm:w-1/3 lg:w-full mb-4">
            {windowElement?.length > 0 ? (
              windowElement.map((singleElement, idx) => (
                <div
                  key={singleElement._id}
                  className="relative block overflow-hidden m-4 rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
                >
                  <div className="sm:flex sm:justify-between sm:gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        {singleElement.title || "Untitled"}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-gray-600">
                        By {singleElement.email || "Unknown"}
                      </p>
                    </div>
                    <div className="hidden sm:block sm:shrink-3">
                      <img
                        alt=""
                        src={`https://picsum.photos/200/300?grayscale=${Math.ceil(
                          Math.random() * 10
                        )}`}
                        className="size-20 rounded-lg object-cover shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-pretty text-xl text-gray-500">
                      {singleElement.description || "No description available"}
                    </p>
                  </div>
                  <dl className="mt-6 flex gap-4 sm:gap-6">
                    <div className="flex flex-col-reverse">
                      <dt className="text-sm font-medium text-gray-600">
                        Published
                      </dt>
                      <dd className="text-xs text-gray-500">
                        {singleElement.createdAt
                          ? formatDate(singleElement.createdAt)
                          : "Unknown date"}
                      </dd>
                    </div>
                    <div className="flex flex-col-reverse">
                      <dt className="text-sm font-medium text-gray-600">
                        Reading time
                      </dt>
                      <dd className="text-xs text-gray-500">3 minutes</dd>
                    </div>
                  </dl>
                  <div className="flex justify-start my-4 space-x-6">
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        handleDeleteConfirm(singleElement?._id);
                      }}
                    >
                      {" "}
                      <DeleteIcon />{" "}
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        router.push("/window/update/" + singleElement?._id);
                      }}
                    >
                      {" "}
                      <EditIcon />{" "}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                {/* Render static data for two cards */}
                 <p><strong>Please note:</strong> Adding new data will overwrite the existing dummy data.</p>
                <div className="relative block overflow-hidden m-4 rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
                  <div className="sm:flex sm:justify-between sm:gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        Static Card 1
                      </h3>
                      <p className="mt-1 text-sm font-medium text-gray-600">
                        By Unknown
                      </p>
                    </div>
                    <div className="hidden sm:block sm:shrink-3">
                      <img
                        alt=""
                        src={`https://picsum.photos/200/300?grayscale=${Math.ceil(
                          Math.random() * 10
                        )}`}
                        className="size-20 rounded-lg object-cover shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-pretty text-xl text-gray-500">
                      Static description for card 1
                    </p>
                  </div>
                  <dl className="mt-6 flex gap-4 sm:gap-6">
                    <div className="flex flex-col-reverse">
                      <dt className="text-sm font-medium text-gray-600">
                        Published
                      </dt>
                      <dd className="text-xs text-gray-500">Unknown date</dd>
                    </div>
                    <div className="flex flex-col-reverse">
                      <dt className="text-sm font-medium text-gray-600">
                        Reading time
                      </dt>
                      <dd className="text-xs text-gray-500">3 minutes</dd>
                    </div>
                  </dl>
                  <div className="flex justify-start my-4 space-x-6">
                    <div className="cursor-pointer">
                      <DeleteIcon />
                    </div>
                    <div className="cursor-pointer">
                      <EditIcon />
                    </div>
                  </div>
                </div>

                <div className="relative block overflow-hidden m-4 rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
                  <div className="sm:flex sm:justify-between sm:gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        Static Card 2
                      </h3>
                      <p className="mt-1 text-sm font-medium text-gray-600">
                        By Unknown
                      </p>
                    </div>
                    <div className="hidden sm:block sm:shrink-3">
                      <img
                        alt=""
                        src={`https://picsum.photos/200/300?grayscale=${Math.ceil(
                          Math.random() * 10
                        )}`}
                        className="size-20 rounded-lg object-cover shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-pretty text-xl text-gray-500">
                      Static description for card 2
                    </p>
                  </div>
                  <dl className="mt-6 flex gap-4 sm:gap-6">
                    <div className="flex flex-col-reverse">
                      <dt className="text-sm font-medium text-gray-600">
                        Published
                      </dt>
                      <dd className="text-xs text-gray-500">Unknown date</dd>
                    </div>
                    <div className="flex flex-col-reverse">
                      <dt className="text-sm font-medium text-gray-600">
                        Reading time
                      </dt>
                      <dd className="text-xs text-gray-500">3 minutes</dd>
                    </div>
                  </dl>
                  <div className="flex justify-start my-4 space-x-6">
                    <div className="cursor-pointer">
                      <DeleteIcon />
                    </div>
                    <div className="cursor-pointer">
                      <EditIcon />
                    </div>
                  </div>
                </div>
              </>
            )}

            {isModalOpen.map(
              (isOpen, modalIndex) =>
                isOpen && (
                  <WindowModal
                    key={modalIndex}
                    index={windowIndex}
                    onCancel={handleCloseModal}
                    onConfirm={handleConfirmDelete}
                    modaltitle="Card Information"
                    modalbody=""
                    modalbutton="Save"
                  />
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChildContainer;
