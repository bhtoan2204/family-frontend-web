import React from 'react'
import { expenditureByDateData, expenditureType } from '../const/data'

import { colors } from '../color/color'
import { useTheme } from 'next-themes'
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useModal } from '@/hooks/use-modal-store'
import { ExpenditureType, FinanceExpenditureDate } from '@/types/finance-expenditure'
import { GetExpenditureByDate, GetExpensediture, GetExpenseditures } from '@/actions/finance-actions'
import { Mosaic } from 'react-loading-indicators'
import { Member } from '@/types/member'
const FinanceExpenditureDateData = ({ date, familyId, token, familyMembers }: { date: string, familyId: string, token: string, familyMembers: Member[] }) => {
    // const { data } = expenditureByDateData;
    const [expenditureTypes, setExpenditureTypes] = React.useState<ExpenditureType[]>([])
    const [selectedExpenditure, setSelectedExpenditure] = React.useState<number | null>(null)
    const [expenditureDateData, setExpenditureDateData] = React.useState<FinanceExpenditureDate[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState<any>(null)
    const [reload, setReload] = React.useState<boolean>(false)
    const { theme } = useTheme();
    const { onOpen } = useModal();

    const filteredExpenditure = selectedExpenditure == null || expenditureDateData.length == 0 ? expenditureDateData : expenditureDateData.filter((item) => item.id_expense_type === selectedExpenditure)

    React.useEffect(() => {
        console.log(date)
        const fetchDateData = async () => {
            setIsLoading(true)
            try {
                const response = await GetExpenditureByDate(token, familyId, date)
                const expenditureResponse = await GetExpenseditures(token, familyId)
                console.log("data nef", response)
                setExpenditureDateData(response)
                setExpenditureTypes(expenditureResponse)
                setIsLoading(false)
            } catch (error) {
                setError(error)
                setIsLoading(false)
            }
        }
        fetchDateData()

    }, [date, familyId, token, reload])



    return (
        isLoading ? <>
            <div className='flex flex-1  mt-16'>
                <Mosaic color={theme == 'dark' ? '#fff' : '#000'} size="small" text="Loading" textColor="" />
            </div>
        </> : <div className="py-4 space-y-4">

            <ScrollArea className="overflow-x-auto py-2 mb-4">
                <div className="flex space-x-4 ">
                    <button
                        onClick={() => {
                            onOpen("createExpenditure", {
                                createExpenditure: {
                                    id_family: parseInt(familyId),
                                    token: token,
                                    setReload: setReload,
                                    familyMembers: familyMembers,
                                    expenseTypes: expenditureTypes

                                }
                            });
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition bg-gray-700 dark:bg-white text-gray-200 dark:text-gray-700 w-auto h-10 clear-both whitespace-nowrap hover:opacity-65`}
                    >
                        Add expenditure
                    </button>
                    <button
                        onClick={() => {
                            onOpen('createExpenditureType', {
                                createExpenditureType: {
                                    id_family: parseInt(familyId),
                                    token: token,
                                    setExpenditureTypes: setExpenditureTypes,
                                }
                            })

                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 w-auto h-10 clear-both whitespace-nowrap hover:opacity-65`}
                    >
                        Add expenditure type
                    </button>

                    {expenditureTypes.map((type, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (selectedExpenditure === index + 1) {
                                    setSelectedExpenditure(null)
                                } else {
                                    setSelectedExpenditure(index + 1)
                                }
                            }}
                            className={`px-4 py-2 rounded-lg w-auto clear-both  text-sm font-semibold transition whitespace-nowrap hover:opacity-65 ${selectedExpenditure === index + 1
                                ? 'bg-black dark:bg-white text-white dark:text-black'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 '
                                }`}
                        >
                            {type.category}
                        </button>
                    ))}
                </div>
                <div className='py-2'></div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {
                filteredExpenditure.length === 0 ? <>
                    <div className="flex flex-1 justify-center items-center h-64">
                        <p className="text-lg text-gray-500 dark:text-gray-400">No expenditure data available</p>
                    </div>

                </> : <>
                    {filteredExpenditure.map((item, index) => {
                        const color = colors[item.id_expense_type];
                        return (
                            <React.Fragment key={index}>
                                <ContextMenu>
                                    <ContextMenuTrigger className="py-4">
                                        <div
                                            // className={`p-4 rounded-lg shadow-md mb-4 `}
                                            className={'p-4 rounded-lg  shadow-md mb-4 '}
                                            style={{
                                                backgroundColor: theme === 'dark' ? color.darkModeBackgroundColor : color.backgroundColor,
                                                color: color.textColor
                                            }}

                                        >
                                            <div className="flex justify-between">
                                                <div className="font-bold">{item.expense_category}</div>
                                                <div className='font-bold'>${item.expense_amount}</div>
                                            </div>
                                            <div>{item.description}</div>
                                            <div className="text-xs opacity-75">{item.name}</div>
                                        </div>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent className="w-64 bg-white dark:bg-gray-800 dark:text-gray-300 rounded-lg shadow-md">
                                        <ContextMenuItem
                                            inset
                                            onClick={() => console.log("Delete clicked")}
                                            className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <p className='text-rose-500'>Delete</p>
                                            <ContextMenuShortcut>Ctrl + D</ContextMenuShortcut>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            inset
                                            onClick={() => console.log("Update clicked")}
                                            className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Update
                                            <ContextMenuShortcut>Ctrl + U</ContextMenuShortcut>
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            </React.Fragment>
                        );
                    })}
                </>
            }
        </div>
    )
}

export default FinanceExpenditureDateData