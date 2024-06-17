import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface ITodo {
  content: string;
  preCondition: string;
  acceptanceCriteria: string;
  date: string;
  deleteTodo: (id: number) => void;
  id: number;
}

const Todo: React.FC<ITodo> = ({
  content,
  preCondition,
  acceptanceCriteria,
  date,
  deleteTodo,
  id,
}) => {
  return (
    <Card className="w-[350px]">
      <CardHeader className="pb-1">
        <CardTitle>{content}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent className="py-3">
        <div className="flex flex-col gap-4">
          {preCondition.trim() && (
            <div>
              <p className="text-slate-500 text-sm">Precondition</p>

              <p className=" text-md">{preCondition}</p>
            </div>
          )}

          {acceptanceCriteria.trim() && (
            <div>
              <p className="text-slate-500 text-sm">acceptance criteria</p>

              <p className=" text-md">{acceptanceCriteria}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="w-full" onClick={() => deleteTodo(id)}>
          Complete
        </Button>
      </CardFooter>
    </Card>
  );
};
export default Todo;
