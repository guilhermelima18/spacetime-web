"use client";

import { ChangeEvent, useState } from "react";

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null);

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const preview = URL.createObjectURL(files[0]);

    setPreview(preview);
  }

  return (
    <>
      <input
        type="file"
        name="coverUrl"
        id="media"
        className="invisible h-0 w-0"
        onChange={onFileSelected}
        accept="image/*"
      />
      {preview && (
        // eslint-disable-next-line
        <img
          src={preview}
          alt=""
          className="w-full aspect-video rounded-lg object-cover"
        />
      )}
    </>
  );
}
