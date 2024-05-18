'use client';
import { useParams } from 'next/navigation';
import UpdateForm from "../../updateForm";

const EventType = () => {
  const params = useParams();
  console.log(params?.id);
  return (
    <>
      <UpdateForm elementId={params?.id}/>
    </>
  );
};

export default EventType;
