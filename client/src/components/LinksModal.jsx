import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

const LinksModal = ({ isOpen, onClose, links }) => {
  const [editedLinks, setEditedLinks] = useState({
    youtube: links?.youtube || "",
    facebook: links?.facebook || "",
    instagram: links?.instagram || "",
    twitter: links?.twitter || "",
    other: links?.other || "",
  });

  const linkTypes = ["youtube", "facebook", "instagram", "twitter", "other"];

  const handleInputChange = (name, value) => {
    setEditedLinks((prevLinks) => ({
      ...prevLinks,
      [name]: value,
    }));
  };

  const saveLinks = () => {
    links.youtube = editedLinks.youtube;
    links.facebook = editedLinks.facebook;
    links.instagram = editedLinks.instagram;
    links.twitter = editedLinks.twitter;
    links.other = editedLinks.other;

    onClose();
  };

  const close = () => {
    setEditedLinks(links);

    onClose();
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto  ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={onClose}
          ></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-[90%] max-w-md">
          <div className="bg-[#3c3e57] px-4 pt-5 pb-4 ">
            <div className="mt-3 sm:mt-0 sm:ml-4 text-left">
              <h3 className="text-lg leading-6 font-medium mb-4 text-white mx-2">
                Add Links
              </h3>

              {linkTypes.map((type) => (
                <div className="mb-4" key={type}>
                  <Input
                    label={`${type} :`}
                    value={editedLinks[type]}
                    placeholder={`Enter your ${type} url`}
                    onChange={(e) => handleInputChange(type, e.target.value)}
                  />
                </div>
              ))}

              <div className="flex justify-end">
                <Button
                  onClick={close}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                >
                  Close
                </Button>
                <Button
                  onClick={saveLinks}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save Links
                </Button>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinksModal;
