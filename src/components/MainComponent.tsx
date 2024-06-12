'use client';

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react"
import { findText } from "@/action/find-text"
import ResultBox, { ResultProps } from "./ResultBox";


const formSchema = z.object({
  text: z.string().min(3),
})

const MainComponent = ({ }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
    criteriaMode: "all",
    shouldFocusError: true,
    mode: "onBlur",
  })

  const [result, setResult] = useState<ResultProps>({
    result: {
      "message": [],
      "time": 0
    }
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    const res = findText(data.text).then((res) => {
      setResult(res);
      });
  }

  return (
    <div className="flex flex-col gap-20 w-full justify-center items-center">
      <h1 className="text-5xl text-white font-bold">Alkitab Finder</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 min-w-[50%]">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xl text-white font-semibold">Input Text</FormLabel>
                <FormControl>
                  <Input placeholder="Input Text..." {...field} className="text-white"/>
                </FormControl>
                <FormMessage className=" text-red-500 "/>
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-white w-full hover:bg-black hover:text-white">Find</Button>
        </form>
      </Form>
      <ResultBox result={result}/>
    </div>
  )
}

export default MainComponent