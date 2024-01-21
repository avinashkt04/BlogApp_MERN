import React from "react";
import { Input, Select, Button, RTE, Spinner } from "./index";
import { useForm } from "react-hook-form";

function PostForm({ error, loading, postAction, defaultValues }) {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      title: defaultValues?.title || "",
      content: defaultValues?.content || "",
    },
  });
  return (
    <div className="flex justify-center">
      <div className="flex justify-center items-center flex-col w-[90%] max-w-3xl py-2">
        {error && (
          <div className="flex py-1 px-2 mt-2 justify-center items-center bg-red-600 w-full border border-gray-300 rounded-md">
            <p>{error}</p>
          </div>
        )}

        <div className="flex flex-col items-center justify-center py-4 px-3 rounded-xl bg-[#3c3e57] w-full my-2">
          <form
            className="w-full max-w-2xl m-2 px-2 space-y-3"
            onSubmit={handleSubmit(postAction)}
          >
            <Input
              label="Title : "
              placeholder="Enter blog title"
              {...register("title")}
            />

            <Input
              label="Featured Image : "
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("featuredImage")}
            />

            {defaultValues?.status && (
              <Select
                label="Status"
                options={["active", "inactive"]}
                {...register("status", { value: defaultValues.status })}
              />
            )}

            <RTE label="Content :" name="content" control={control} />

            <div>
              <Button
                className="w-[calc(100%-1rem)] ml-2 bg-blue-500 mt-4 hover:transform-gpu hover:scale-[1.01] hover:bg-blue-600 active:bg-blue-700"
                type="submit"
              >
                {loading ? (
                  <Spinner width="5" />
                ) : defaultValues ? (
                  "Edit Post"
                ) : (
                  "Create Post"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
