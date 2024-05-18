import React from "react";
import { formatDate } from "../../../utils/DateFormatter";
import DeleteIcon from "../../../utils/DeleteIcon";
import EditIcon from "../../../utils/EditIcon";
const UserElement = ({ windowElement }) => {
  return (
    <div className="child-container overflow-auto max-h-[calc(100vh-100px)] border-t border-r border-gray-300">
      <div className="sm:flex sm:flex-wrap gap-4">
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
      </div>
    </div>
  );
};

export default UserElement;
