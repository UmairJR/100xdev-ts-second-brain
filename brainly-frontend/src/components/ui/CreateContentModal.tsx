import React, { useRef, useState } from "react";
import CrossIcon from "../../icons/CrossIcon";
import Button from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BackendURL } from "../../config";
import useContent from "../../hooks/useContent";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}
enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter"
}
const CreateContentModal = (
  props: CreateContentModalProps
): React.ReactElement => {
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();
  const [type, setType] = useState<ContentType>(ContentType.Youtube);
  

  const addContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    console.log(title, link, type);
    try {
      const res = await axios.post(`${BackendURL}/content`, {
        title,
        link,
        type,
      },{
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      alert("Content added successfully");
      props.onClose();
    } catch (error) {
      alert("Error occured while adding content - " + error);
    }
  };

  return (
    <>
      {props.open && (
        <div className="h-screen w-screen bg-gray-700/50 fixed top-0 left-0 flex justify-center items-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white p-4 opacity-100 rounded">
              <div className="flex justify-end">
                <div onClick={props.onClose} className="cursor-pointer">
                  <CrossIcon size="large" onClick={props.onClose} />
                </div>
              </div>
              <div>
                <Input ref={titleRef} placeholder="Title" onChange={() => {}} />
                <Input ref={linkRef} placeholder="Link" onChange={() => {}} />
              </div>
              <div className="flex justify-center gap-4 p-4">
                <Button variant={type === ContentType.Youtube ? "primary" : "secondary"} size="small" text="Youtube" onClick={() => {
                setType(ContentType.Youtube);
                }} />
                <Button variant={type === ContentType.Twitter ? "primary" : "secondary"} size="small" text="Twitter" onClick={() => {
                setType(ContentType.Twitter);
                }} />
              </div>
              <div className="flex justify-center">
                <Button
                  variant="secondary"
                  size="medium"
                  text="Submit"
                  onClick={() => {
                    addContent();
                  }}
                />
              </div>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateContentModal;
