import { cookies } from "next/headers";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { EmptyMemories } from "@/components/EmptyMemories";
import { api } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Edit } from "lucide-react";

dayjs.locale(ptBR);

interface Memory {
  id: string;
  coverUrl: string;
  content: string;
  createdAt: string;
}

export default async function Home() {
  const isAuthenticated = cookies().has("token");

  if (!isAuthenticated) {
    return <EmptyMemories />;
  }

  const token = cookies().get("token")?.value;

  const response = await api.get("/memories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const memories: Memory[] = response.data;

  if (!memories.length) {
    return <EmptyMemories />;
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        const createdAt = dayjs(memory.createdAt).format("D[ de ]MMMM[, ]YYYY");

        return (
          <div key={memory.id} className="space-y-4">
            <time className="flex items-center gap-2 text-sm text-gray-100 -ml-8 before:h-px before:w-5 before:bg-gray-50">
              {createdAt}
            </time>

            <Image
              src={memory.coverUrl}
              alt=""
              width={592}
              height={280}
              className="w-full aspect-video object-cover rounded-lg"
            />

            <p className="text-lg leading-relaxed text-gray-100">
              {memory.content}
            </p>

            <div className="flex items-center justify-between">
              <Link
                className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
                href={{ pathname: "/memories/new", query: { id: memory.id } }}
              >
                Editar memória <Edit className="w-4 h-4" />
              </Link>
              <Link
                className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
                href={`/memories/${memory.id}`}
              >
                Ler mais <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
