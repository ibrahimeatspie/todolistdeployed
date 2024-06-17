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
import { redirect } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { DialogFooter } from "@/components/ui/dialog";
import Todo from "@/components/Todo";
import { useUser } from "@clerk/clerk-react";
import { Task } from "@prisma/client";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

const fetchTasks = async () => {
  const response = await fetch("/api/tasks");
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch tasks: ${errorText}`);
  }
  let data = response.json();
  return data;
};

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { refetch, data, error, isLoading, isFetching } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const [taskInputValue, setTaskInputValue] = useState<string>("");
  const [preVal, setPreVal] = useState<string>("");
  const [acceptVal, setAcceptVal] = useState<string>("");

  const handleSubmit = async () => {
    if (!taskInputValue) return;
    let id: string = crypto.randomUUID();
    let date: Date = new Date();

    const taskData: Task = {
      content: taskInputValue,
      preCondition: preVal,
      acceptanceCriteria: acceptVal,
      date,
      id,
      userId: user!.id,
    };

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        const newTask = await response.json();
        console.log("Task created:", newTask);
        refetch();

        // Reset form or handle success (e.g., redirect or display a message)
      } else {
        const errorText = await response.text();
        console.error("Failed to create task:", errorText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setTaskInputValue("");
      setPreVal("");
      setAcceptVal("");
    }
  };

  const deleteTodo = async (id: string) => {
    const taskData = { id };
    try {
      const response = await fetch("/api/deleteTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        const newTask = await response.json();
        console.log("Task deleted:", newTask);

        refetch();
        // Reset form or handle success (e.g., redirect or display a message)
      } else {
        const errorText = await response.text();
        console.error("Failed to delete task:", errorText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
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

  //   useEffect(() => {
  //     const fetchTasks = async () => {
  //       try {
  //         const response = await fetch("/api/tasks");
  //         if (response.ok) {
  //           const tasks = await response.json();
  //           setTodos(tasks);
  //         } else {
  //           const errorText = await response.text();
  //           console.error("Failed to fetch tasks:", errorText);
  //         }
  //       } catch (error) {
  //         console.error("An error occurred:", error);
  //       }
  //     };
  //     fetchTasks();
  //   }, []);
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <Navbar />
      <SignedIn>
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
                Make changes to your profile here. Click save when you are done.
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
        <div className="w-[100%] grow  flex flex-col justify-center items-center py-2 gap-y-4">
          {(isLoading || isFetching) && <h1>Loading tasks</h1>}
          {error && <h1>{error.message}</h1>}
          {data ? (
            data.length > 0 ? (
              data.map((todo: Task) => (
                <Todo
                  content={todo.content}
                  preCondition={todo.preCondition!}
                  acceptanceCriteria={todo.acceptanceCriteria!}
                  date={todo.date.toLocaleString()}
                  id={todo.id}
                  key={todo.id}
                  deleteTodo={deleteTodo}
                />
              ))
            ) : (
              <h1>You have 0 tasks remaining</h1>
            )
          ) : null}
        </div>
      </SignedIn>
    </div>
  );
}
