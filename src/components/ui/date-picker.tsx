"use client";

import * as React from "react";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectSingleEventHandler } from "react-day-picker";

interface DatePickerProps {
  value?: Date;
  onChange?: SelectSingleEventHandler;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start bg-zinc-200 text-left font-normal text-black hover:bg-zinc-100/50 hover:text-black dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-900/50 dark:hover:text-white",
            !value && "text-black dark:text-white",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            new Date(value).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          ) : (
            <span>Selecione a Data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto bg-zinc-200 p-0 text-black dark:bg-zinc-900 dark:text-white">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
}
