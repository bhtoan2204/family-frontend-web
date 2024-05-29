"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { useModal } from "@/hooks/use-modal-store";
import { ExpenditureSchema } from "@/schemas";
import { CalendarEventSchema } from "@/schemas/calendar-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarIcon } from "lucide-react";
import { IncomeSchema } from "@/schemas/income-schema";
import { CreateIncome } from "@/actions/finance-actions";


const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))

const CreateIncomeModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const members = data.createIncome?.familyMembers;
    const incomeSouces = data.createIncome?.incomeTypes;
    const isModalOpen = isOpen && type === "createIncome";
    const form = useForm({
        resolver: zodResolver(IncomeSchema),
        defaultValues: {
            id_created_by: "",
            id_income_source: "",
            amount: "100",
            income_date: new Date(),
            description: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof IncomeSchema>) => {
        console.log(values);
        const body = {
            id_family: data.createIncome?.id_family,
            id_created_by: values.id_created_by,
            id_income_source: parseInt(values.id_income_source),
            amount: parseFloat(values.amount),
            income_date: format(values.income_date, "yyyy-MM-dd"),
            description: values.description,
        }
        await CreateIncome(data.createIncome?.token!, body)
        data.createIncome?.setReload(true);
        onClose();
    };

    const handleClose = () => {
        form.reset();
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white dark:text-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold text-zinc-500">
                        Add Income
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Fill in the details to add income
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <FormField
                                control={form.control}
                                name="id_created_by"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Created By
                                        </FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0">
                                                    <SelectValue placeholder="Select creator" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        members && members.map((item, index) => {
                                                            return <SelectItem value={item.id_user} key={index}>{item.firstname} {item.lastname}</SelectItem>
                                                        })
                                                    }
                                                    <SelectItem value="Other">Other</SelectItem>

                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="id_income_source"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Income Source
                                        </FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value.toString()}>
                                                <SelectTrigger className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0">
                                                    <SelectValue placeholder="Select income source" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        incomeSouces && incomeSouces.map((item, index) => {
                                                            return <SelectItem value={item.id_income_source.toString()} key={index}>{item.category}</SelectItem>
                                                        })
                                                    }
                                                    <SelectItem value="1">Type 1</SelectItem>
                                                    <SelectItem value="2">Type 2</SelectItem>
                                                    {/* Add more expense types here */}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Amount
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                type="number"
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Enter amount"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="income_date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col ">
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Pick date</FormLabel>
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

                                                    }}

                                                    disabled={(date) =>
                                                        date < yesterday
                                                    }
                                                    initialFocus
                                                    className='dark:bg-[#313338] dark:border-gray-600'

                                                />
                                            </PopoverContent>
                                        </Popover>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Description
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Enter description"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="px-6 py-4 bg-gray-100">
                            <Button type="submit" variant="primary" disabled={isLoading}>
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateIncomeModal;
