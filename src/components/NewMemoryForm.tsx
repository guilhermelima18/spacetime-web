"use client";

import { FormEvent, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Camera } from "lucide-react";
import Cookie from "js-cookie";
import { MediaPicker } from "./MediaPicker";
import { api } from "@/lib/api";

export function NewMemoryForm() {
  const token = Cookie.get("token");

  const router = useRouter();
  const searchParams = useSearchParams();

  const memoryId = searchParams.get("id");

  const getMemory = useCallback(async () => {
    try {
      await api.get(`/memories/${memoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw new Error("Unauthorized");
    }
  }, [memoryId, token]);

  useEffect(() => {
    if (memoryId && token) {
      getMemory();
    }
  }, [memoryId, token, getMemory]);

  async function onCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let coverUrl = "";

    const formData = new FormData(event.currentTarget);

    const fileToUpload = formData.get("coverUrl");

    if (fileToUpload) {
      const uploadFormData = new FormData();

      uploadFormData.set("file", fileToUpload);

      const uploadResponse = await api.post("/upload", uploadFormData);

      coverUrl = uploadResponse.data.fileUrl;
    }

    const content = formData.get("content");
    const isPublic = formData.get("isPublic");

    await api.post(
      "/memories",
      {
        coverUrl,
        content,
        isPublic,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    router.push("/");
  }

  return (
    <form className="flex flex-1 flex-col gap-2" onSubmit={onCreateMemory}>
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
          />
          Tornar memória pública
        </label>
      </div>

      <MediaPicker />

      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />

      <button
        className="self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
        type="submit"
      >
        Salvar
      </button>
    </form>
  );
}
