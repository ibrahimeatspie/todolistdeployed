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
}

const Todo: React.FC<ITodo> = ({
  content,
  preCondition,
  acceptanceCriteria,
  date,
}) => {
  return (
    <Card className="w-[350px]">
      <CardHeader className="pb-1">
        <CardTitle>{content}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent className="py-3">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-slate-500 text-sm">Precondition</p>

            <p className=" text-md">{preCondition}</p>
          </div>
          <div>
            <p className="text-slate-500 text-sm">acceptance criteria</p>

            <p className=" text-md">{acceptanceCriteria}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="w-full">Complete</Button>
      </CardFooter>
    </Card>
  );
};
export default Todo;
