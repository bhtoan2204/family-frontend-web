import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


const FormSchema = z.object({
    expenditureDate: z.date({
        required_error: "A date is required.",
    }),
})

const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))

const FinanceExpenditureCalenderPicker = ({ date, setDate }: { date: string, setDate: React.Dispatch<React.SetStateAction<string>> }) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            expenditureDate: new Date(date) || new Date(),
        }
    })
    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        setDate(data.expenditureDate.toISOString().split("T")[0])
        console.log(data)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="expenditureDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col ">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal dark:bg-[#313338] dark:border-gray-600",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={(date) => {
                                            field.onChange(date);
                                            console.log("date is: ", date);
                                            setDate(date!.toISOString().split("T")[0])
                                        }}

                                        // disabled={(date) =>
                                        //     date < yesterday
                                        // }
                                        initialFocus
                                        className='dark:bg-[#313338] dark:border-gray-600'

                                    />
                                </PopoverContent>
                            </Popover>

                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

export default FinanceExpenditureCalenderPicker