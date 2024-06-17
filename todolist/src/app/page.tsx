"use client";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { DialogFooter } from "@/components/ui/dialog";
import Todo from "@/components/Todo";
import { useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";

interface Todo {
  content: string;
  preCondition: string;
  acceptanceCriteria: string;
  date: string;
  id: number;
}

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();

  const [todos, setTodos] = useState<Todo[]>([]);

  const [taskInputValue, setTaskInputValue] = useState<string>("");
  const [preVal, setPreVal] = useState<string>("");
  const [acceptVal, setAcceptVal] = useState<string>("");

  const handleSubmit = () => {
    if (!taskInputValue) return;
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        content: taskInputValue,
        preCondition: preVal,
        acceptanceCriteria: acceptVal,
        date: new Date().toLocaleDateString(),
        id: Math.random(),
      },
    ]);
    setTaskInputValue("");
    setPreVal("");
    setAcceptVal("");
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleTaskInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTaskInputValue(event.target.value);
  };
  const handlePreValInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPreVal(event.target.value);
  };
  const handleAcceptValInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAcceptVal(event.target.value);
  };

  const taskInputRef = useRef<HTMLInputElement>(null);
  const preInputRef = useRef<HTMLInputElement>(null);
  const acceptInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <Navbar />

      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-4 right-4 w-[60px] h-[60px] rounded-[60px]">
            +{" "}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Insert task</DialogTitle>
            <DialogDescription>
              Make changes to your prrofile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Task
              </Label>
              <Input
                ref={taskInputRef}
                id="name"
                value={taskInputValue}
                onChange={handleTaskInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Precondition
              </Label>
              <Input
                ref={preInputRef}
                id="username"
                value={preVal}
                className="col-span-3"
                onChange={handlePreValInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Acceptance criteria
              </Label>
              <Input
                ref={acceptInputRef}
                id="username"
                value={acceptVal}
                className="col-span-3"
                onChange={handleAcceptValInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button onClick={handleSubmit} type="submit">
                Insert
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="w-[100%] grow  flex flex-col items-center py-2 gap-y-4">
        {todos.map((todo, index) => (
          <Todo
            content={todo.content}
            preCondition={todo.preCondition}
            acceptanceCriteria={todo.acceptanceCriteria}
            date={todo.date}
            id={todo.id}
            key={todo.id}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}
